import { Providers } from '@/app/providers'
import { Sidebar } from '@/shared/ui/Sidebar'
import { DateRangeFilter } from '@/features/date-range-filter/DateRangeFilter'
import { WidgetRenderer } from '@/widgets'
import { SummaryHeader } from '@/widgets'
import { StatKpiWidget } from '@/widgets'
import { TrafficBarWidget } from '@/widgets'
import { ChannelsTableWidget } from '@/widgets'
import type { WidgetDefinition } from '@/entities/dashboard'

const metricWidgets: WidgetDefinition[] = [
  {
    type: 'kpi', config: {
      metricId: '123e4567-e89b-12d3-a456-426614174000',
      label: 'Revenue', unit: '$', showTrend: true
    }
  },
  {
    type: 'kpi', config: {
      metricId: '223e4567-e89b-12d3-a456-426614174001',
      label: 'Active Users', unit: '', showTrend: true
    }
  },
  {
    type: 'area', config: {
      metricIds: [
        '223e4567-e89b-12d3-a456-426614174003',
        '223e4567-e89b-12d3-a456-426614174002',
      ],
      title: 'Sales Over Time (All Stores)',
      showLegend: true, curved: true
    }
  },
  {
    type: 'line', config: {
      metricIds: [
        '123e4567-e89b-12d3-a456-426614174000',
        '223e4567-e89b-12d3-a456-426614174001',
      ],
      title: 'Revenue & Users over time',
      showLegend: true, curved: true
    }
  },
]

function DashboardContent() {
  return (
    <div style={{ maxWidth: 1320, margin: '0 auto' }}>

      <div className="page-header">
        <div>
          <h1 className="page-title">Overview</h1>
          <p className="page-subtitle">
            Track your key metrics and performance
          </p>
        </div>
        <DateRangeFilter />
      </div>

      <SummaryHeader />

      <div className="grid-3">
        {metricWidgets.map((def, i) => (
          <WidgetRenderer key={i} definition={def} />
        ))}
      </div>

      <div className="grid-3 grid-section">
        <StatKpiWidget config={{
          statKey: 'bounceRate',
          label: 'Bounce rate'
        }} />
        <StatKpiWidget config={{
          statKey: 'conversionRate',
          label: 'Conversion rate'
        }} />
        <StatKpiWidget config={{
          statKey: 'avgSessionSec',
          label: 'Avg session'
        }} />
        <TrafficBarWidget />
      </div>

      <div className="grid-section">
        <ChannelsTableWidget />
      </div>

    </div>
  )
}

export default function App() {
  return (
    <Providers>
      <div className="app-shell">
        <Sidebar />
        <main className="app-main">
          <DashboardContent />
        </main>
      </div>
    </Providers>
  )
}