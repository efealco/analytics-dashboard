import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { Widget } from '@/shared/ui/Widget'
import { useTraffic } from '@/entities/analytics'
import { useDashboardStore } from '@/features/date-range-filter/useDashboardStore'
import { formatAxisDate } from '@/widgets/line-chart/utils'

const DIRECT_COLOR   = 'var(--chart-1)'
const INDIRECT_COLOR = 'var(--chart-2)'

export function TrafficBarWidget() {
  const dateRange = useDashboardStore(s => s.dateRange)
  const { data, isPending, isError } = useTraffic(dateRange)

  if (isPending) return <Widget><Widget.Loading variant="chart" /></Widget>
  if (isError)   return <Widget><Widget.Error /></Widget>
  if (data.data.length === 0) return (
    <Widget><Widget.Empty message="No traffic data for this period" /></Widget>
  )

  return (
    <Widget>
      <Widget.Header>
        <span>Direct vs Indirect traffic</span>
      </Widget.Header>
      <Widget.Body>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data.data} barGap={4}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border-tertiary, #e5e7eb)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickFormatter={l =>
                typeof l === 'string' ? formatAxisDate(l) : ''
              }
              tick={{ fontSize: 11 }}
            />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              labelFormatter={l =>
                typeof l === 'string' ? formatAxisDate(l) : ''
              }
              contentStyle={{ fontSize: 12 }}
            />
            <Legend />
            <Bar
              dataKey="direct"
              name="Direct"
              fill={DIRECT_COLOR}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="indirect"
              name="Indirect"
              fill={INDIRECT_COLOR}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Widget.Body>
    </Widget>
  )
}