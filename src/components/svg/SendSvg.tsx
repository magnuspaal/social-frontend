export default function SendSvg({size, color}: {size?: number, color?: string}) {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size ?? 24}
    height={size ?? 24}
    fill="none"
    viewBox="0 0 24 24">
      <path
        fill={color ?? "#000"}
        fillRule="evenodd"
        d="M3.394 2.205a1 1 0 0 1 1.074-.089l17 9a1 1 0 0 1 0 1.768l-17 9a1 1 0 0 1-1.444-1.1L4.976 12 3.024 3.217a1 1 0 0 1 .37-1.012ZM6.802 13l-1.356 6.103L16.974 13H6.802Zm10.172-2H6.802L5.446 4.897 16.974 11Z"
        clipRule="evenodd"
      />
    </svg>
  )

}
