import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 110;
const LINK_DISTANCE  = 13;
const MAX_LINE_VERTS = PARTICLE_COUNT * PARTICLE_COUNT * 6; // worst-case floats

export function HeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let dispose = () => {};

    import('three').then(({
      Scene, PerspectiveCamera, WebGLRenderer,
      BufferGeometry, BufferAttribute,
      Points, PointsMaterial,
      LineSegments, LineBasicMaterial,
    }) => {
      const isDark  = document.documentElement.classList.contains('dark');
      const accentP = isDark ? 0x818cf8 : 0x6366f1; // indigo-400 / indigo-500
      const accentL = isDark ? 0xa5b4fc : 0x6366f1; // indigo-300 / indigo-500

      // — Renderer ——————————————————————————————————————
      const renderer = new WebGLRenderer({ antialias: false, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      // — Scene & Camera ————————————————————————————————
      const scene  = new Scene();
      const camera = new PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 500);
      camera.position.z = 38;

      // — Particles —————————————————————————————————————
      const positions  = new Float32Array(PARTICLE_COUNT * 3);
      const velocities = new Float32Array(PARTICLE_COUNT * 3);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 72;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 48;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
        // small random drift velocity
        velocities[i * 3]     = (Math.random() - 0.5) * 0.018;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.018;
        velocities[i * 3 + 2] = 0;
      }

      const ptGeo = new BufferGeometry();
      ptGeo.setAttribute('position', new BufferAttribute(positions, 3));

      const ptMat = new PointsMaterial({
        color:       accentP,
        size:        isDark ? 0.38 : 0.3,
        transparent: true,
        opacity:     isDark ? 0.6 : 0.4,
        depthWrite:  false,
        sizeAttenuation: true,
      });

      scene.add(new Points(ptGeo, ptMat));

      // — Lines —————————————————————————————————————————
      const lineVerts = new Float32Array(MAX_LINE_VERTS);
      const lineGeo   = new BufferGeometry();
      lineGeo.setAttribute('position', new BufferAttribute(lineVerts, 3));

      const lineMat = new LineBasicMaterial({
        color:       accentL,
        transparent: true,
        opacity:     isDark ? 0.2 : 0.12,
        depthWrite:  false,
      });

      const lineSegments = new LineSegments(lineGeo, lineMat);
      scene.add(lineSegments);

      // — Mouse parallax ————————————————————————————————
      let mx = 0, my = 0;
      const onMouseMove = (e) => {
        mx =  (e.clientX / window.innerWidth  - 0.5);
        my = -(e.clientY / window.innerHeight - 0.5);
      };
      window.addEventListener('mousemove', onMouseMove, { passive: true });

      // — Resize ————————————————————————————————————————
      const onResize = () => {
        const w = mount.clientWidth, h = mount.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize, { passive: true });

      // — Animation loop ————————————————————————————————
      let animId;
      const animate = () => {
        animId = requestAnimationFrame(animate);

        const pos  = ptGeo.attributes.position.array;
        const lPos = lineGeo.attributes.position.array;

        // Drift particles & bounce off walls
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          pos[i * 3]     += velocities[i * 3];
          pos[i * 3 + 1] += velocities[i * 3 + 1];
          if (Math.abs(pos[i * 3])     > 36) velocities[i * 3]     *= -1;
          if (Math.abs(pos[i * 3 + 1]) > 24) velocities[i * 3 + 1] *= -1;
        }
        ptGeo.attributes.position.needsUpdate = true;

        // Build line-segment pairs
        let fi = 0; // float index into lPos
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          for (let j = i + 1; j < PARTICLE_COUNT; j++) {
            const dx   = pos[i * 3]     - pos[j * 3];
            const dy   = pos[i * 3 + 1] - pos[j * 3 + 1];
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < LINK_DISTANCE) {
              lPos[fi++] = pos[i * 3];     lPos[fi++] = pos[i * 3 + 1]; lPos[fi++] = pos[i * 3 + 2];
              lPos[fi++] = pos[j * 3];     lPos[fi++] = pos[j * 3 + 1]; lPos[fi++] = pos[j * 3 + 2];
            }
          }
        }
        lineGeo.setDrawRange(0, fi / 3); // fi floats / 3 = vertex count
        lineGeo.attributes.position.needsUpdate = true;

        // Smooth camera parallax
        camera.position.x += (mx * 5 - camera.position.x) * 0.025;
        camera.position.y += (my * 3 - camera.position.y) * 0.025;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };
      animate();

      // — Cleanup ———————————————————————————————————————
      dispose = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        ptGeo.dispose();
        ptMat.dispose();
        lineGeo.dispose();
        lineMat.dispose();
        renderer.dispose();
      };
    });

    return () => dispose();
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
