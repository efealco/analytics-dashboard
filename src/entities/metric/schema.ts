import { z } from 'zod'

export const metricPointSchema = z.object({
  date: z.string().date(),
  value: z.number(),
  label: z.string(),
})

export const metricSeriesSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  unit: z.string(),
  points: z.array(metricPointSchema),
  trend: z.enum(['up', 'down', 'neutral']),
  changePercent: z.number(),
})

export const metricsResponseSchema = z.object({
  data: z.array(metricSeriesSchema),
  meta: z.object({
    from: z.string().nullable(),
    to: z.string().nullable(),
    total: z.number(),
  }),
})

// Infer types from schema — single source of truth
export type MetricPointFromSchema = z.infer<typeof metricPointSchema>
export type MetricSeriesFromSchema = z.infer<typeof metricSeriesSchema>