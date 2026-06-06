interface SunGlintOverlayProps {
  periodic?: boolean;
}

export default function SunGlintOverlay({ periodic = true }: SunGlintOverlayProps) {
  return (
    <div
      className={`sun-glint-effect absolute inset-0 overflow-hidden pointer-events-none rounded-[inherit] ${
        periodic ? 'animate-sunGlint' : ''
      }`}
    />
  );
}
