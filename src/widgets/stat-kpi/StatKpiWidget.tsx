import { Widget } from '@/shared/ui/Widget'
import { useSummaryStats } from '@/entities/analytics'
import type { SummaryStats } from '@/entities/analytics'

type StatKey = 'bounceRate' | 'conversionRate' | 'avgSessionSec'

interface StatKpiConfig {
  statKey:         StatKey
  label:           string
  lowerIsBetter?:  boolean
}

function formatStat(key: StatKey, stats: SummaryStats): string {
  switch (key) {
    case 'bounceRate':     return `${stats.bounceRate.toFixed(1)}%`
    case 'conversionRate': return `${stats.conversionRate.toFixed(1)}%`
    case 'avgSessionSec': {
      const m = Math.floor(stats.avgSessionSec / 60)
      const s = stats.avgSessionSec % 60
      return `${m}m ${s}s`
    }
  }
}

interface StatKpiWidgetProps {
  config: StatKpiConfig
}

export function StatKpiWidget({ config }: StatKpiWidgetProps) {
  const { data, isPending, isError } = useSummaryStats()

  if (isPending) return <Widget><Widget.Loading /></Widget>
  if (isError)   return <Widget><Widget.Error /></Widget>

  const value = formatStat(config.statKey, data)

  return (
    <Widget>
      <Widget.Header>
        <span>{config.label}</span>
      </Widget.Header>
      <Widget.Body>
        <p className="kpi-value">{value}</p>
        {config.statKey === 'bounceRate' && (
          <p className="kpi-trend" style={{
            color: data.vsLastPeriod.bounceRate <= 0
              ? 'var(--color-text-success)'
              : 'var(--color-text-danger)',
          }}>
            {data.vsLastPeriod.bounceRate <= 0 ? '' : '+'}
            {data.vsLastPeriod.bounceRate.toFixed(1)}% vs last period
          </p>
        )}
      </Widget.Body>
    </Widget>
  )
}