export default function TransitionWrapper({children, key}: 
  {children: React.ReactNode, in?: boolean, onExited?: (node: HTMLElement) => void, key: number}) {
  return <div key={key}>{children}</div>
}