import { useMemo } from 'react'
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts'
import { Widget } from '@/shared/ui/Widget'
import { useMetrics } from '@/entities/metric'
import { useDashboardStore } from '@/features/date-range-filter/useDashboardStore'
import type { LineChartConfig } from '@/entities/dashboard'
import { seriesToChartData, getSeriesColor, formatAxisDate } from './utils'

interface LineChartWidgetProps {
  config: LineChartConfig
}

export function LineChartWidget({ config }: LineChartWidgetProps) {
  const dateRange = useDashboardStore(s => s.dateRange)
  const { data, isPending, isError } = useMetrics(dateRange)

  const seriesList = useMemo(() => {
    if (!data) return []
    return data.data.filter(s => config.metricIds.includes(s.id))
  }, [data, config.metricIds])

  const chartData = useMemo(
    () => seriesToChartData(seriesList),
    [seriesList]
  )

  if (isPending) return <Widget><Widget.Loading variant="chart" /></Widget>
  if (isError)   return <Widget><Widget.Error /></Widget>
  if (seriesList.length === 0) return (
    <Widget><Widget.Empty message="No matching metrics found" /></Widget>
  )

  return (
    <Widget>
      <Widget.Header><span>{config.title}</span></Widget.Header>
      <Widget.Body>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border-tertiary, #e5e7eb)"
            />
            <XAxis
              dataKey="date"
              tickFormatter={label =>
                typeof label === 'string' ? formatAxisDate(label) : ''
              }
              tick={{ fontSize: 11 }}
            />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              labelFormatter={label =>
                typeof label === 'string' ? formatAxisDate(label) : ''
              }
              contentStyle={{ fontSize: 12 }}
            />
            {config.showLegend && <Legend />}
            {seriesList.map((series, i) => (
              <Line
                key={series.id}
                dataKey={series.name}
                stroke={getSeriesColor(i)}
                strokeWidth={2}
                dot={false}
                type={config.curved ? 'monotone' : 'linear'}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Widget.Body>
    </Widget>
  )
}