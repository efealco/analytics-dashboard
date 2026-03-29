import type { MetricSeries } from '@/entities/metric'

const today = new Date()
const months = Array.from({ length: 6 }, (_, i) => {
  const d = new Date(today)
  d.setMonth(d.getMonth() - (5 - i))
  return d.toISOString().split('T')[0]!
})

export const metricFixtures: MetricSeries[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Revenue',
    unit: '$',
    trend: 'up',
    changePercent: 12.5,
    points: months.map((date, i) => ({
      date,
      value: [1200, 1850, 1640, 2100, 2380, 2200][i]!,
      label: 'Revenue',
    })),
  },
  {
    id: '223e4567-e89b-12d3-a456-426614174001',
    name: 'Active Users',
    unit: '',
    trend: 'up',
    changePercent: 8.3,
    points: months.map((date, i) => ({
      date,
      value: [340, 410, 390, 520, 610, 580][i]!,
      label: 'Active Users',
    })),
  },
]