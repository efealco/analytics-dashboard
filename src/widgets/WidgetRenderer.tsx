import { KpiWidget } from './kpi-card/KpiWidget'
import { LineChartWidget } from './line-chart/LineChartWidget'
import { Widget } from '@/shared/ui/Widget'
import type { WidgetDefinition } from '@/entities/dashboard'

interface WidgetRendererProps {
  definition: WidgetDefinition
}

export function WidgetRenderer({ definition }: WidgetRendererProps) {
  switch (definition.type) {
    case 'kpi':
      return <KpiWidget config={definition.config} />

    case 'line':
      return <LineChartWidget config={definition.config} />

    case 'bar':
    case 'table':
      return (
        <Widget>
          <Widget.Empty
            message={`"${definition.type}" widget coming soon`}
          />
        </Widget>
      )

    default: {
      return null
    }
  }
}