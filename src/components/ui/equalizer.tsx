export default function Equalizer({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <rect
        fill="currentColor"
        className="transform scale-y-[-1] translate-y-6 animate-short-eq delay-0"
        x="4"
        y="4"
        width="3.7"
        height="8"
      />
      <rect
        fill="currentColor"
        className="transform scale-y-[-1] translate-y-6 animate-tall-eq delay-150"
        x="10.2"
        y="4"
        width="3.7"
        height="16"
      />
      <rect
        fill="currentColor"
        className="transform scale-y-[-1] translate-y-6 animate-short-eq delay-300"
        x="16.3"
        y="4"
        width="3.7"
        height="11"
      />
    </svg>
  );
}
