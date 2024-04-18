export default function RepostSvg({size, color}: {size?: number, color?: string}) {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size ?? 24}
    height={size ?? 24}
    className="icon flat-line"
    data-name="Flat Line"
    viewBox="0 0 24 24">
      <path
        d="m5.36 13.65-2.21 3.73A1.08 1.08 0 0 0 4.09 19H11"
        style={{
          fill: "none",
          stroke: color ?? "#000",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
        }}
      />
      <path
        d="m16 19 3.93.05a1.07 1.07 0 0 0 .92-1.62l-3.38-5.87M15.09 7.33 13 3.54a1.08 1.08 0 0 0-1.87 0l-3.46 6M9.3 17l1.7 2-2 2"
        data-name="primary"
        style={{
          fill: "none",
          stroke: color ?? "#000",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
        }}
      />
      <path
        d="m16.52 13.92.88-2.47 2.73.73M10.22 9.06l-2.58.47-.73-2.73"
        data-name="primary"
        style={{
          fill: "none",
          stroke: color ?? "#000",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
        }}
      />
    </svg>
  )
}