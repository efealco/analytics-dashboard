import { useSummaryStats } from '@/entities/analytics'

function formatDelta(v: number) {
  const sign  = v >= 0 ? '+' : ''
  const color = v >= 0
    ? 'var(--color-text-success)'
    : 'var(--color-text-danger)'
  return { label: `${sign}${v.toFixed(1)}%`, color }
}

function fmtSeconds(s: number) {
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}m ${r}s`
}

interface StatCardProps {
  label:  string
  value:  string
  delta?: number
}

function StatCard({ label, value, delta }: StatCardProps) {
  const d = delta !== undefined ? formatDelta(delta) : null
  return (
    <div style={{
      background: 'var(--color-background-secondary)',
      borderRadius: 'var(--border-radius-md)',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    }}>
      <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
        {label}
      </span>
      <span style={{ fontSize: '22px', fontWeight: 500 }}>
        {value}
      </span>
      {d && (
        <span style={{ fontSize: '12px', color: d.color }}>
          {d.label} vs last period
        </span>
      )}
    </div>
  )
}

export function SummaryHeader() {
  const { data, isPending, isError } = useSummaryStats()

  if (isPending) return <div style={{ height: 96 }} />
  if (isError)   return null

  const s = data
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: '12px',
      marginBottom: '1.5rem',
    }}>
      <StatCard
        label="Total visitors"
        value={s.totalVisitors.toLocaleString()}
        delta={s.vsLastPeriod.visitors}
      />
      <StatCard
        label="Total revenue"
        value={`$${s.totalRevenue.toLocaleString()}`}
        delta={s.vsLastPeriod.revenue}
      />
      <StatCard
        label="Total sales"
        value={s.totalSales.toLocaleString()}
        delta={s.vsLastPeriod.sales}
      />
      <StatCard
        label="Avg session"
        value={fmtSeconds(s.avgSessionSec)}
      />
      <StatCard
        label="Bounce rate"
        value={`${s.bounceRate.toFixed(1)}%`}
        delta={s.vsLastPeriod.bounceRate}
      />
      <StatCard
        label="Conversion"
        value={`${s.conversionRate.toFixed(1)}%`}
      />
    </div>
  )
}