export default function ChatSvg({size, color}: {size?: number, color?: string}) {
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
        d="m23.8 18.37.001.003c.33.43.488 1.859-1.775 1.605a10.718 10.718 0 0 1-2.717-.63 10.337 10.337 0 0 1-1.95-.996 8.959 8.959 0 0 1-2.848.634A7.489 7.489 0 0 1 8.5 22a7.495 7.495 0 0 1-2.32-.366c-.44.255-.94.504-1.492.713-1.12.424-2.049.583-2.717.63-.5.037-.853.011-1.027-.009-.382-.044-.724-.262-.872-.628a1 1 0 0 1 .124-.967c.252-.345.484-.706.704-1.072.428-.714.848-1.484.954-2.322a7.5 7.5 0 0 1 3.437-10.26 9 9 0 1 1 16.848 6.126c-.19 1.724.677 3.175 1.66 4.525ZM7 10a7 7 0 1 1 13.272 3.112 1 1 0 0 0-.095.307c-.219 1.575.15 3.011.905 4.39a8.597 8.597 0 0 1-3.03-1.405 1 1 0 0 0-1.02-.092A7 7 0 0 1 7 10Zm-1.996.254a9.004 9.004 0 0 0 6.963 8.516A5.477 5.477 0 0 1 8.5 20c-.73 0-1.423-.141-2.057-.397a1 1 0 0 0-.916.086c-.439.283-.96.565-1.548.788a8.87 8.87 0 0 1-1.065.331c.333-.607.67-1.33.824-2.01.077-.337.12-.664.138-.971a1 1 0 0 0-.134-.565A5.47 5.47 0 0 1 3 14.5c0-1.71.78-3.237 2.004-4.246Z"
        clipRule="evenodd"
      />
    </svg>
  )
}
