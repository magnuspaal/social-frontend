export default function ProfileSvg({size, color}: {size?: number, color?: string}) {
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
        d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm1-3a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3H5Zm7 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm4 2a3.985 3.985 0 0 1-.995 2.64C16.857 13.512 18 15.174 18 17a1 1 0 1 1-2 0c0-1.324-1.295-3-4-3s-4 1.676-4 3a1 1 0 1 1-2 0c0-1.826 1.143-3.488 2.995-4.36A4 4 0 1 1 16 10Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
