import type { ReactNode } from 'react'

function Header({ children }: { children: ReactNode }) {
  return (
    <div className="widget-header">
      {children}
    </div>
  )
}

function Body({ children }: { children: ReactNode }) {
  return (
    <div className="widget-body">
      {children}
    </div>
  )
}

function Empty({ message = 'No data available' }: { message?: string }) {
  return (
    <div className="widget-empty">
      <span>{message}</span>
    </div>
  )
}

function Loading() {
  return (
    <div className="widget-loading">
      <span className="widget-loading__bar" />
    </div>
  )
}

function Error({ message = 'Failed to load' }: { message?: string }) {
  return (
    <div className="widget-error">
      <span>{message}</span>
    </div>
  )
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