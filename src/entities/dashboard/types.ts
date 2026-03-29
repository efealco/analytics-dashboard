// Widget-specific configs
export interface KpiConfig {
  metricId: string
  label: string
  unit: string
  showTrend: boolean
}

export interface LineChartConfig {
  metricIds: string[]
  title: string
  showLegend: boolean
  curved: boolean
}

export interface BarChartConfig {
  metricIds: string[]
  title: string
  stacked: boolean
}

export interface DataTableConfig {
  metricIds: string[]
  title: string
  pageSize: number
}

// Discriminated union — the heart of the widget system
export type WidgetDefinition =
  | { type: 'kpi';   config: KpiConfig }
  | { type: 'line';  config: LineChartConfig }
  | { type: 'bar';   config: BarChartConfig }
  | { type: 'table'; config: DataTableConfig }

export type WidgetType = WidgetDefinition['type']

// Layout position (for drag & drop later)
export interface WidgetLayout {
  id: string
  x: number
  y: number
  w: number
  h: number
}

// A widget instance in a dashboard
export interface DashboardWidget {
  id: string
  definition: WidgetDefinition
  layout: WidgetLayout
}

// The full dashboard document
export interface DashboardConfig {
  id: string
  title: string
  widgets: DashboardWidget[]
  createdAt: string
  updatedAt: string
}