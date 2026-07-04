/** Illustrative ROI payback chart — cumulative rental income crossing the investment cost.
 *  Uses `currentColor` for axes/labels so it inherits the surrounding text colour. */
export function RoiChart({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 184"
      className={className}
      fill="none"
      role="img"
      aria-label="Illustrative ROI: cumulative rental income crosses the investment cost at around 1.5 years, then keeps rising."
    >
      {/* axes */}
      <line x1="34" y1="150" x2="346" y2="150" stroke="currentColor" strokeOpacity="0.25" />
      <line x1="34" y1="18" x2="34" y2="150" stroke="currentColor" strokeOpacity="0.25" />

      {/* investment line */}
      <line x1="34" y1="74" x2="346" y2="74" stroke="#bcc59e" strokeOpacity="0.8" strokeDasharray="4 4" />
      <text x="40" y="68" fontSize="9.5" fill="#bcc59e">Your investment</text>

      {/* cumulative income */}
      <path d="M34 150 C 110 142, 165 120, 205 74 C 255 26, 320 20, 346 14 L346 150 Z" fill="#9c7a3c" fillOpacity="0.16" />
      <path d="M34 150 C 110 142, 165 120, 205 74 C 255 26, 320 20, 346 14" stroke="#9c7a3c" strokeWidth="2" />
      <text x="300" y="28" fontSize="9.5" fill="#c79a52">Rental income</text>

      {/* break-even */}
      <line x1="205" y1="74" x2="205" y2="150" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="3 3" />
      <circle cx="205" cy="74" r="4.5" fill="#faf8f1" />
      <text x="205" y="168" fontSize="9.5" fill="currentColor" fillOpacity="0.85" textAnchor="middle">~1.5 yrs · break-even</text>

      {/* x labels */}
      <text x="34" y="168" fontSize="9.5" fill="currentColor" fillOpacity="0.6" textAnchor="middle">Yr 0</text>
      <text x="346" y="168" fontSize="9.5" fill="currentColor" fillOpacity="0.6" textAnchor="end">Yr 3+</text>
    </svg>
  );
}
