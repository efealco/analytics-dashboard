export interface MetricPoint {
  date: string
  value: number
  label: string
}

export interface MetricSeries {
  id: string
  name: string
  unit: string
  points: MetricPoint[]
  trend: 'up' | 'down' | 'neutral'
  changePercent: number
}

export interface MetricsResponse {
  data: MetricSeries[]
  meta: {
    from: string | null
    to: string | null
    total: number
  }
}