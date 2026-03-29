import { z } from 'zod'

export const summaryStatsSchema = z.object({
  totalVisitors:  z.number(),
  totalRevenue:   z.number(),
  totalSales:     z.number(),
  avgSessionSec:  z.number(),
  bounceRate:     z.number(),
  conversionRate: z.number(),
  vsLastPeriod: z.object({
    visitors:   z.number(),
    revenue:    z.number(),
    sales:      z.number(),
    bounceRate: z.number(),
  }),
})

export const trafficPointSchema = z.object({
  date:     z.string(),
  direct:   z.number(),
  indirect: z.number(),
})

export const trafficResponseSchema = z.object({
  data: z.array(trafficPointSchema),
})

export const channelRowSchema = z.object({
  source:     z.string(),
  visitors:   z.number(),
  revenue:    z.number(),
  sales:      z.number(),
  conversion: z.number(),
})

export const channelsResponseSchema = z.object({
  data: z.array(channelRowSchema),
})