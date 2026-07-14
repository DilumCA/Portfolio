export function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent-600 border-t-transparent rounded-full animate-spin" aria-label="Loading" />
    </div>
  );
}
