import { ReactNode } from 'react'
import './Divider.css'

export function Divider({ children }: { children?: ReactNode }) {
  return <div className="divider">{children}</div>
}