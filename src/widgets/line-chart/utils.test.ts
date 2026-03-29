import { describe, it, expect } from 'vitest'
import { seriesToChartData, getSeriesColor, formatAxisDate } from './utils'
import type { MetricSeries } from '@/entities/metric'

const mockSeries: MetricSeries = {
  id: 'abc', name: 'Revenue', unit: '$',
  trend: 'up', changePercent: 10,
  points: [
    { date: '2024-01-01', value: 100, label: 'Revenue' },
    { date: '2024-02-01', value: 200, label: 'Revenue' },
  ],
}

describe('seriesToChartData', () => {
  it('returns empty array for empty input', () => {
    expect(seriesToChartData([])).toEqual([])
  })

  it('flattens a single series into date-keyed rows', () => {
    const result = seriesToChartData([mockSeries])
    expect(result).toEqual([
      { date: '2024-01-01', Revenue: 100 },
      { date: '2024-02-01', Revenue: 200 },
    ])
  })

  it('merges multiple series on the same date spine', () => {
    const second: MetricSeries = {
      ...mockSeries, id: 'def', name: 'Users',
      points: [
        { date: '2024-01-01', value: 50, label: 'Users' },
        { date: '2024-02-01', value: 75, label: 'Users' },
      ],
    }
    const result = seriesToChartData([mockSeries, second])
    expect(result).toEqual([
      { date: '2024-01-01', Revenue: 100, Users: 50 },
      { date: '2024-02-01', Revenue: 200, Users: 75 },
    ])
  })
})

describe('getSeriesColor', () => {
  it('returns a hex string', () => {
    expect(getSeriesColor(0)).toMatch(/^#[0-9a-fA-F]{6}$/)
  })

  it('wraps around when index exceeds palette length', () => {
    expect(getSeriesColor(0)).toBe(getSeriesColor(6))
  })
})

describe('formatAxisDate', () => {
  it('formats an ISO date string to short month + year', () => {
    const result = formatAxisDate('2024-01-01')
    expect(result).toMatch(/Jan.+24/)
  })
})