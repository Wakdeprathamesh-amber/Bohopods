/**
 * Stylised topographic map of India's west coast (Nashik → Kodaikanal):
 * a muted-teal Arabian Sea, warm parchment land with Western-Ghats contours,
 * reference cities, and every Boho destination pinned geo-approximately.
 * Two-tone (cool water / warm land) for instant sea-vs-land legibility.
 */

const pins = [
  { name: "Nashik", x: 468, y: 62 },
  { name: "Igatpuri", x: 398, y: 96 },
  { name: "Karjat", x: 330, y: 176 },
  { name: "Khandala", x: 362, y: 206 },
  { name: "Lonavala", x: 344, y: 232 },
  { name: "Alibaug", x: 250, y: 216 },
  { name: "Panchgani", x: 398, y: 312 },
  { name: "Mahabaleshwar", x: 352, y: 330 },
  { name: "Goa", x: 300, y: 428 },
  { name: "Coorg", x: 420, y: 512 },
  { name: "Kodaikanal", x: 548, y: 566 },
] as const;

const cities = [
  { name: "Mumbai", x: 236, y: 118 },
  { name: "Pune", x: 424, y: 244 },
] as const;

// Labels that would collide with the sea sit to the LEFT of their pin.
const leftLabel = new Set(["Alibaug", "Mahabaleshwar", "Goa"]);

const coastline =
  "M250,0 C238,64 226,110 236,150 C246,190 244,220 250,262 C256,306 238,344 246,388 C252,430 256,470 250,512 C246,552 252,578 250,600";

export function IndiaWestMap({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 600"
      role="img"
      aria-label="Map of India's west coast showing Boho Pods destinations from Nashik down to Kodaikanal"
      className={className}
    >
      <defs>
        <linearGradient id="sea" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="255" y2="0">
          <stop offset="0" stopColor="#3f5f66" />
          <stop offset="1" stopColor="#688e94" />
        </linearGradient>
        <linearGradient id="land" gradientUnits="userSpaceOnUse" x1="250" y1="0" x2="900" y2="600">
          <stop offset="0" stopColor="#e9e0c9" />
          <stop offset="1" stopColor="#d8c9a4" />
        </linearGradient>
      </defs>

      {/* Land base */}
      <rect x="0" y="0" width="900" height="600" fill="url(#land)" />

      {/* Western-Ghats hillshade — a soft warmer band just inland of the coast */}
      <path
        d="M250,0 C300,80 300,200 320,320 C336,420 360,520 360,600 L470,600 C470,500 450,400 452,300 C454,200 470,90 470,0 Z"
        fill="#cbbb92"
        opacity="0.55"
      />

      {/* Arabian Sea */}
      <path d={`${coastline} L0,600 L0,0 Z`} fill="url(#sea)" />
      {/* Coastline */}
      <path d={coastline} fill="none" stroke="#2c4a50" strokeWidth="2.5" />
      {/* Sea swell lines */}
      <g fill="none" stroke="#cfe0e2" strokeWidth="1.3" opacity="0.4">
        <path d="M60,150 q16,-9 32,0 q16,9 32,0" />
        <path d="M96,300 q16,-9 32,0 q16,9 32,0" />
        <path d="M56,450 q16,-9 32,0 q16,9 32,0" />
        <path d="M120,536 q16,-9 32,0 q16,9 32,0" />
      </g>
      <text
        x="112"
        y="352"
        transform="rotate(-90 112 352)"
        fill="#e8f0f0"
        opacity="0.75"
        className="font-display"
        fontSize="15"
        letterSpacing="8"
      >
        ARABIAN SEA
      </text>

      {/* Western-Ghats contour lines on the land */}
      <g fill="none" stroke="#8a9a66" strokeWidth="1.4" opacity="0.5">
        <path d="M330,10 C318,90 336,160 316,230 C300,300 330,370 318,440 C310,500 336,552 330,598" />
        <path d="M372,20 C360,96 378,166 358,236 C342,306 372,376 360,446 C352,506 376,556 370,598" />
      </g>
      <g fill="none" stroke="#8a9a66" strokeWidth="1.2" opacity="0.28">
        <path d="M416,10 C404,90 422,170 402,244 C386,314 416,384 404,454 C396,514 420,560 414,598" />
        <path d="M466,18 C454,96 472,176 452,250 C436,320 466,390 454,460 C446,520 468,564 462,598" />
        <path d="M524,30 C512,106 530,186 510,260 C494,330 524,400 512,470 C504,528 526,568 520,598" />
        <path d="M596,44 C584,120 602,200 582,274 C566,344 596,414 584,484 C576,540 598,576 592,598" />
        <path d="M676,60 C664,136 682,216 662,290 C646,360 676,430 664,500 C656,552 676,584 670,598" />
        <path d="M760,80 C748,156 766,236 746,310 C730,380 760,450 748,520 C742,564 758,588 754,598" />
      </g>
      <text
        x="600"
        y="336"
        transform="rotate(-74 600 336)"
        fill="#5f6b3f"
        opacity="0.75"
        className="font-display"
        fontSize="14"
        letterSpacing="7"
      >
        WESTERN GHATS
      </text>

      {/* Compass */}
      <g stroke="#5b6b3d" fill="none" strokeWidth="1.6" opacity="0.7">
        <circle cx="838" cy="54" r="19" />
        <path d="M838,66 L838,42 M838,42 L832,50 M838,42 L844,50" />
      </g>
      <text x="838" y="94" textAnchor="middle" fill="#5b6b3d" opacity="0.8" className="font-display" fontSize="12">
        N
      </text>

      {/* Reference cities */}
      {cities.map((c) => (
        <g key={c.name}>
          <rect x={c.x - 4} y={c.y - 4} width="8" height="8" fill="none" strokeWidth="2" className="stroke-forest" />
          <text
            x={c.name === "Mumbai" ? c.x + 11 : c.x + 11}
            y={c.y + 4}
            fontSize="13"
            className="fill-forest/70 font-display"
            letterSpacing="0.5"
          >
            {c.name}
          </text>
        </g>
      ))}

      {/* Boho destinations */}
      {pins.map((p) => {
        const left = leftLabel.has(p.name);
        return (
          <g key={p.name}>
            <circle cx={p.x} cy={p.y} r="10" fill="#9c7a3c" opacity="0.18" />
            <circle cx={p.x} cy={p.y} r="4.5" fill="#9c7a3c" stroke="#faf8f1" strokeWidth="1.2" />
            <text
              x={left ? p.x - 13 : p.x + 13}
              y={p.y + 4.5}
              textAnchor={left ? "end" : "start"}
              fontSize="14"
              fontWeight="500"
              className="fill-ink"
            >
              {p.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
