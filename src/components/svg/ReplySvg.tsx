export default function ReplySvg({size, color}: {size?: number, color?: string}) {
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
        d="M6.17 18H4a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v3a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-2.046l-3.201 3.659a1 1 0 0 1-1.506 0L11.047 20H9a3.001 3.001 0 0 1-2.83-2ZM19 7V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h2v-6a3 3 0 0 1 3-3h10Zm-1.253 11.341L15 21.482l-2.747-3.14A1 1 0 0 0 11.5 18H9a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-2.5a1 1 0 0 0-.753.341Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
