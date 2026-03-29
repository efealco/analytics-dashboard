import { Providers } from '@/app/providers'
import { WidgetRenderer } from '@/widgets'
import { DateRangeFilter } from '@/features/date-range-filter/DateRangeFilter'
import type { WidgetDefinition } from '@/entities/dashboard'

const mockWidgets: WidgetDefinition[] = [
  {
    type: 'kpi',
    config: {
      metricId: '123e4567-e89b-12d3-a456-426614174000',
      label: 'Revenue', unit: '$', showTrend: true,
    },
  },
  {
    type: 'kpi',
    config: {
      metricId: '223e4567-e89b-12d3-a456-426614174001',
      label: 'Active Users', unit: '', showTrend: true,
    },
  },
  {
    type: 'line',
    config: {
      metricIds: [
        '123e4567-e89b-12d3-a456-426614174000',
        '223e4567-e89b-12d3-a456-426614174001',
      ],
      title: 'Revenue & Users over time',
      showLegend: true,
      curved: true,
    },
  },
]

function DashboardContent() {
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
      }}>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 500 }}>
          Dashboard
        </h1>
        <DateRangeFilter />
      </div>

      <main style={{
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      }}>
        {mockWidgets.map((def, i) => (
          <WidgetRenderer key={i} definition={def} />
        ))}
      </main>
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