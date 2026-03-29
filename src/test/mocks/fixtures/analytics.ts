import type {
  SummaryStats, TrafficPoint, ChannelRow
} from '@/entities/analytics'

export const summaryFixture: SummaryStats = {
  totalVisitors:  12400,
  totalRevenue:   24680,
  totalSales:     1340,
  avgSessionSec:  187,
  bounceRate:     38.4,
  conversionRate: 4.7,
  vsLastPeriod: {
    visitors:   12.5,
    revenue:    8.3,
    sales:      6.1,
    bounceRate: -2.4,
  },
}

const today = new Date()
const months = Array.from({ length: 6 }, (_, i) => {
  const d = new Date(today)
  d.setMonth(d.getMonth() - (5 - i))
  return d.toISOString().split('T')[0]!
})

export const trafficFixtures: TrafficPoint[] = months.map((date, i) => ({
  date,
  direct:   [820, 932, 901, 1290, 1330, 1520][i]!,
  indirect: [420, 532, 601,  790,  930, 1120][i]!,
}))

export const channelFixtures: ChannelRow[] = [
  { source: 'Github.com',        visitors: 2400, revenue: 3877, sales: 267, conversion: 4.7 },
  { source: 'Facebook',          visitors: 2200, revenue: 3426, sales: 249, conversion: 4.4 },
  { source: 'Google (organic)',  visitors: 2000, revenue: 2444, sales: 224, conversion: 4.2 },
  { source: 'Vimeo.com',         visitors: 1900, revenue: 2236, sales: 220, conversion: 4.2 },
  { source: 'Indiehackers.com',  visitors: 1700, revenue: 2034, sales: 204, conversion: 3.9 },
  { source: 'Twitter / X',       visitors: 1500, revenue: 1820, sales: 189, conversion: 3.7 },
  { source: 'Dev.to',            visitors: 1300, revenue: 1540, sales: 171, conversion: 3.5 },
]