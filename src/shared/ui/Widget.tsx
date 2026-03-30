import type { ReactNode } from 'react'
import { KpiSkeleton, ChartSkeleton } from './Skeleton'

function Header({ children }: { children: ReactNode }) {
  return <div className="widget-header">{children}</div>
}
function Body({ children }: { children: ReactNode }) {
  return <div className="widget-body">{children}</div>
}
function Empty({ message = 'No data available' }: { message?: string }) {
  return <div className="widget-empty">{message}</div>
}
function Loading({ variant = 'kpi' }: { variant?: 'kpi' | 'chart' }) {
  return variant === 'chart' ? <ChartSkeleton /> : <KpiSkeleton />
}
function Error({ message = 'Failed to load' }: { message?: string }) {
  return <div className="widget-error" style={{ color: 'var(--danger)' }}>{message}</div>
}
function Widget({ children }: { children: ReactNode }) {
  return <div className="widget">{children}</div>
}
Widget.Header  = Header
Widget.Body    = Body
Widget.Empty   = Empty
Widget.Loading = Loading
Widget.Error   = Error
export { Widget }