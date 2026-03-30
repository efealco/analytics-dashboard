interface SkeletonProps {
  width?:  string | number
  height?: string | number
  radius?: string | number
}

export function Skeleton({ width = '100%', height = 16, radius = 6 }: SkeletonProps) {
  return <div className="skeleton" style={{ width, height, borderRadius: radius }} />
}

export function KpiSkeleton() {
  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Skeleton width={80}  height={12} />
      <Skeleton width={120} height={28} />
      <Skeleton width={90}  height={12} />
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 180 }}>
        {[60,80,55,90,70,100,75,85,65,95,72,88].map((h, i) => (
          <Skeleton key={i} height={`${h}%`} width="100%" radius="4px 4px 0 0" />
        ))}
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div style={{ padding: '0 16px 16px' }}>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
          gap: 8, marginBottom: 10,
        }}>
          {Array.from({ length: 5 }).map((_, c) => (
            <Skeleton key={c} height={12} width={c === 0 ? '80%' : '60%'} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function SummaryHeaderSkeleton() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: '12px', marginBottom: '1.75rem',
    }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{
          background: '#fff', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '1rem',
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          <Skeleton width={70}  height={11} />
          <Skeleton width={100} height={24} />
          <Skeleton width={80}  height={11} />
        </div>
      ))}
    </div>
  )
}