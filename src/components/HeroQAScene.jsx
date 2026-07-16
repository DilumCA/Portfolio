import { useEffect, useRef } from 'react';

/**
 * Three.js QA test-network visualization.
 *
 * Outer icosahedron wireframe with sphere nodes at every vertex.
 * Each node represents a test case:
 *   - green  = PASS (default, gently pulsing)
 *   - amber  = RUNNING
 *   - red    = FAIL
 * Nodes cycle through a fail/recover sequence at random intervals
 * so the animation always looks live — exactly what a QA dashboard feels like.
 * An inner rotating sub-icosahedron + indigo core complete the look.
 */
export function HeroQAScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let dispose = () => {};

    import('three').then(({
      Scene, PerspectiveCamera, WebGLRenderer,
      IcosahedronGeometry, EdgesGeometry, LineSegments, LineBasicMaterial,
      SphereGeometry, Mesh, MeshBasicMaterial,
      Group, Vector3,
    }) => {
      const isDark = document.documentElement.classList.contains('dark');

      // ── Renderer ─────────────────────────────────────────────────────────
      const renderer = new WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      // ── Scene & Camera ────────────────────────────────────────────────────
      const scene  = new Scene();
      const camera = new PerspectiveCamera(38, mount.clientWidth / mount.clientHeight, 0.1, 100);
      camera.position.z = 6.5;

      const group = new Group();
      scene.add(group);

      // ── Outer wireframe shell ─────────────────────────────────────────────
      const outerGeo   = new IcosahedronGeometry(2.3, 1);
      const outerEdges = new EdgesGeometry(outerGeo);
      const outerMat   = new LineBasicMaterial({
        color: isDark ? 0x6366f1 : 0x818cf8,
        transparent: true,
        opacity: isDark ? 0.22 : 0.18,
      });
      group.add(new LineSegments(outerEdges, outerMat));

      // ── Deduplicate vertex positions → test-case nodes ────────────────────
      const posAttr = outerGeo.attributes.position;
      const seen    = new Map();
      for (let i = 0; i < posAttr.count; i++) {
        const x = +posAttr.getX(i).toFixed(3);
        const y = +posAttr.getY(i).toFixed(3);
        const z = +posAttr.getZ(i).toFixed(3);
        const key = `${x},${y},${z}`;
        if (!seen.has(key)) seen.set(key, new Vector3(x, y, z));
      }

      const nodeGeos = [];
      const nodeMats = [];
      const nodes    = [];

      seen.forEach((pos) => {
        const geo  = new SphereGeometry(0.075, 8, 8);
        const mat  = new MeshBasicMaterial({ color: 0x10b981 }); // emerald PASS
        const mesh = new Mesh(geo, mat);
        mesh.position.copy(pos);
        group.add(mesh);
        nodeGeos.push(geo);
        nodeMats.push(mat);
        nodes.push({
          mesh, mat,
          phase:     Math.random() * Math.PI * 2,
          state:     'pass',
          timer:     0,
          nextCycle: 4 + Math.random() * 10, // seconds until next fail cycle
        });
      });

      // ── Inner sub-shell (counter-rotates for depth) ───────────────────────
      const innerGroup  = new Group();
      const innerGeo    = new IcosahedronGeometry(1.15, 0);
      const innerEdges  = new EdgesGeometry(innerGeo);
      const innerMat    = new LineBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: isDark ? 0.3 : 0.22,
      });
      innerGroup.add(new LineSegments(innerEdges, innerMat));
      group.add(innerGroup);

      // ── Indigo core ───────────────────────────────────────────────────────
      const coreGeo = new SphereGeometry(0.3, 16, 16);
      const coreMat = new MeshBasicMaterial({
        color:       0x4f46e5,
        transparent: true,
        opacity:     0.9,
      });
      group.add(new Mesh(coreGeo, coreMat));

      // ── Resize handler ────────────────────────────────────────────────────
      const onResize = () => {
        const w = mount.clientWidth, h = mount.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize, { passive: true });

      // ── Animation loop ────────────────────────────────────────────────────
      let animId;
      let elapsed  = 0;
      let lastTime = performance.now();

      const animate = () => {
        animId = requestAnimationFrame(animate);

        const now = performance.now();
        const dt  = Math.min((now - lastTime) / 1000, 0.05); // cap at 50 ms
        lastTime  = now;
        elapsed  += dt;

        // Slow outer rotation + gentle X wobble
        group.rotation.y     += dt * 0.28;
        group.rotation.x      = Math.sin(elapsed * 0.15) * 0.16;
        // Inner shell counter-rotates
        innerGroup.rotation.y -= dt * 0.5;
        innerGroup.rotation.z  = Math.cos(elapsed * 0.2) * 0.1;

        // Update each test-case node
        nodes.forEach((node) => {
          node.nextCycle -= dt;

          // Trigger a new fail/recover cycle
          if (node.nextCycle <= 0 && node.state === 'pass') {
            node.state     = 'running';
            node.timer     = 0.45;
            node.nextCycle = 6 + Math.random() * 12;
          }

          if (node.state === 'running') {
            node.mat.color.setHex(0xf59e0b); // amber
            node.timer -= dt;
            if (node.timer <= 0) { node.state = 'fail'; node.timer = 0.9; }

          } else if (node.state === 'fail') {
            node.mat.color.setHex(0xef4444); // red
            node.timer -= dt;
            if (node.timer <= 0) { node.state = 'fixing'; node.timer = 0.45; }

          } else if (node.state === 'fixing') {
            node.mat.color.setHex(0xf59e0b); // amber (fixing)
            node.timer -= dt;
            if (node.timer <= 0) {
              node.state = 'pass';
              node.mat.color.setHex(0x10b981);
            }

          } else {
            // PASS — gentle size pulse
            const pulse = 0.82 + Math.sin(elapsed * 1.6 + node.phase) * 0.18;
            node.mesh.scale.setScalar(pulse);
          }
        });

        renderer.render(scene, camera);
      };
      animate();

      // ── Cleanup ───────────────────────────────────────────────────────────
      dispose = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', onResize);
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        outerGeo.dispose();   outerEdges.dispose();   outerMat.dispose();
        innerGeo.dispose();   innerEdges.dispose();   innerMat.dispose();
        coreGeo.dispose();    coreMat.dispose();
        nodeGeos.forEach(g => g.dispose());
        nodeMats.forEach(m => m.dispose());
        renderer.dispose();
      };
    });

    return () => dispose();
  }, []);

  return (
    <div ref={mountRef} className="w-full h-full" aria-hidden="true" />
  );
}
