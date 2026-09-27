// Decorative hero background matching the reference design's exact
// treatment (verified against its compiled CSS, not eyeballed): a subtle
// dot grid, 22px spacing, faded via a radial mask so it's visible near the
// top and fades out toward the edges/bottom. The reference applies this
// only to its hero section, not tiled across every section on the page —
// same restraint here, but on every page's hero for sitewide consistency
// (business owner request, 2026-09-27). Parent must be `relative
// overflow-hidden` for this to stay contained.
export function DotGridBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage: "radial-gradient(var(--color-border-strong) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        maskImage: "radial-gradient(ellipse at top, black 30%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at top, black 30%, transparent 75%)",
      }}
    />
  );
}
