import type { MetricSeries } from '@/entities/metric'

/**
 * Recharts expects a flat array of objects where each key
 * is a series name and each value is the data point value.
 *
 * Input:  [{ name: 'Revenue', points: [{ date, value }] }]
 * Output: [{ date: '2024-01', Revenue: 1200, Users: 340 }]
 */
export function seriesToChartData(
  seriesList: MetricSeries[]
): Record<string, string | number>[] {
  if (seriesList.length === 0) return []

  const spine = seriesList[0]!.points

  return spine.map((point, i) => {
    const row: Record<string, string | number> = {
      date: point.date,
    }
    for (const series of seriesList) {
      const p = series.points[i]
      if (p !== undefined) {
        row[series.name] = p.value
      }
    }
    return row
  })
}

const PALETTE = [
  '#7F77DD', '#1D9E75', '#D85A30',
  '#378ADD', '#BA7517', '#D4537E',
]

export function getSeriesColor(index: number): string {
  return PALETTE[index % PALETTE.length] ?? PALETTE[0]!
}

export function formatAxisDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    year:  '2-digit',
  })
}