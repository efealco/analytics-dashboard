import { Widget } from '@/shared/ui/Widget'
import { useMetrics } from '@/entities/metric'
import { useDashboardStore } from '@/features/date-range-filter/useDashboardStore'
import type { KpiConfig } from '@/entities/dashboard'

interface KpiWidgetProps { config: KpiConfig }

export function KpiWidget({ config }: KpiWidgetProps) {
  const dateRange = useDashboardStore(s => s.dateRange)
  const { data, isPending, isError } = useMetrics(dateRange)

  if (isPending) return <Widget><Widget.Loading /></Widget>
  if (isError)   return <Widget><Widget.Error /></Widget>

  const series = data.data.find(s => s.id === config.metricId)
  if (!series) return (
    <Widget><Widget.Empty message="Metric not found" /></Widget>
  )

  const latest   = series.points.at(-1)
  const isUp     = series.trend === 'up'
  const trendSign = isUp ? '+' : ''
  const trendCls  = isUp ? 'kpi-trend kpi-trend-up' : 'kpi-trend kpi-trend-down'

  return (
    <Widget>
      <Widget.Header>
        <span>{config.label}</span>
      </Widget.Header>
      <Widget.Body>
        <p className="kpi-value">
          {config.unit}{latest?.value.toLocaleString() ?? '—'}
        </p>
        {config.showTrend && (
          <span className={trendCls}>
            {trendSign}{series.changePercent.toFixed(1)}% vs last period
          </span>
        )}
      </Widget.Body>
    </Widget>
  )
}