import { useSummaryStats } from '@/entities/analytics'
import { SummaryHeaderSkeleton } from '@/shared/ui/Skeleton'

function delta(v: number, lowerIsBetter = false) {
  const good = lowerIsBetter ? v <= 0 : v >= 0
  return {
    cls:   good ? 'badge badge-up' : 'badge badge-down',
    label: `${v >= 0 ? '+' : ''}${v.toFixed(1)}%`,
  }
}

interface StatCardProps {
  label: string; value: string; change?: number; lowerIsBetter?: boolean
}

function StatCard({ label, value, change, lowerIsBetter }: StatCardProps) {
  const d = change !== undefined ? delta(change, lowerIsBetter) : null
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)', padding: '1rem 1.125rem',
    }}>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500,
        marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.04em' }}>
        {label}
      </div>
      <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-.02em', marginBottom: 6 }}>
        {value}
      </div>
      {d && <span className={d.cls}>{d.label} vs last period</span>}
    </div>
  )
}

export function SummaryHeader() {
  const { data, isPending, isError } = useSummaryStats()
  if (isPending) return <SummaryHeaderSkeleton />
  if (isError)   return null
  const s = data
  return (
    <div className="grid-4" style={{ marginBottom: '1.75rem' }}>
      <StatCard label="Total visitors" value={s.totalVisitors.toLocaleString()} change={s.vsLastPeriod.visitors} />
      <StatCard label="Total revenue"  value={`$${s.totalRevenue.toLocaleString()}`} change={s.vsLastPeriod.revenue} />
      <StatCard label="Total sales"    value={s.totalSales.toLocaleString()} change={s.vsLastPeriod.sales} />
      <StatCard label="Avg session"    value={`${Math.floor(s.avgSessionSec/60)}m ${s.avgSessionSec%60}s`} />
      <StatCard label="Bounce rate"    value={`${s.bounceRate.toFixed(1)}%`} change={s.vsLastPeriod.bounceRate} lowerIsBetter />
      <StatCard label="Conversion"     value={`${s.conversionRate.toFixed(1)}%`} />
    </div>
  )
}