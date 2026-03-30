import { Providers }           from '@/app/providers'
import { DateRangeFilter }     from '@/features/date-range-filter/DateRangeFilter'
import { WidgetRenderer }      from '@/widgets'
import { SummaryHeader }       from '@/widgets'
import { StatKpiWidget }       from '@/widgets'
import { TrafficBarWidget }    from '@/widgets'
import { ChannelsTableWidget } from '@/widgets'
import type { WidgetDefinition } from '@/entities/dashboard'

const metricWidgets: WidgetDefinition[] = [
  {
    type: 'kpi',
    config: { metricId: '123e4567-e89b-12d3-a456-426614174000',
      label: 'Revenue', unit: '$', showTrend: true },
  },
  {
    type: 'kpi',
    config: { metricId: '223e4567-e89b-12d3-a456-426614174001',
      label: 'Active Users', unit: '', showTrend: true },
  },
  {
    type: 'line',
    config: {
      metricIds: [
        '123e4567-e89b-12d3-a456-426614174000',
        '223e4567-e89b-12d3-a456-426614174001',
      ],
      title: 'Revenue & Users over time',
      showLegend: true, curved: true,
    },
  },
]

const grid: React.CSSProperties = {
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
}

function DashboardContent() {
  return (
    <div style={{ padding: '2rem', maxWidth: 1400, margin: '0 auto' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 500 }}>
          Dashboard
        </h1>
        <DateRangeFilter />
      </div>

      <SummaryHeader />

      <div style={grid}>
        {metricWidgets.map((def, i) => (
          <WidgetRenderer key={i} definition={def} />
        ))}
      </div>

      <div style={{ ...grid, marginTop: '1rem' }}>
        <StatKpiWidget config={{ statKey: 'bounceRate',     label: 'Bounce rate' }} />
        <StatKpiWidget config={{ statKey: 'conversionRate', label: 'Conversion rate' }} />
        <StatKpiWidget config={{ statKey: 'avgSessionSec',  label: 'Avg session duration' }} />
        <TrafficBarWidget />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <ChannelsTableWidget />
      </div>

    </div>
  )
}

export default function App() {
  return (
    <Providers>
      <DashboardContent />
    </Providers>
  )
}