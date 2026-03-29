// ─── Summary KPIs ─────────────────────────────────────────
export interface SummaryStats {
  totalVisitors:  number
  totalRevenue:   number
  totalSales:     number
  avgSessionSec:  number
  bounceRate:     number  // 0–100 percent
  conversionRate: number  // 0–100 percent
  vsLastPeriod: {
    visitors:   number  // percent delta
    revenue:    number
    sales:      number
    bounceRate: number
  }
}

// ─── Traffic split ────────────────────────────────────────
export interface TrafficPoint {
  date:     string
  direct:   number
  indirect: number
}

export interface TrafficResponse {
  data: TrafficPoint[]
}

// ─── Top channels ─────────────────────────────────────────
export interface ChannelRow {
  source:     string
  visitors:   number
  revenue:    number
  sales:      number
  conversion: number  // 0–100 percent
}

export interface ChannelsResponse {
  data: ChannelRow[]
}