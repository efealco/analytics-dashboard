import { z } from 'zod'

const kpiConfigSchema = z.object({
  metricId: z.string(),
  label: z.string().min(1),
  unit: z.string(),
  showTrend: z.boolean(),
})

const lineChartConfigSchema = z.object({
  metricIds: z.array(z.string()),
  title: z.string().min(1),
  showLegend: z.boolean(),
  curved: z.boolean(),
})

const barChartConfigSchema = z.object({
  metricIds: z.array(z.string()),
  title: z.string().min(1),
  stacked: z.boolean(),
})

const dataTableConfigSchema = z.object({
  metricIds: z.array(z.string()),
  title: z.string().min(1),
  pageSize: z.number().int().positive(),
})

export const widgetDefinitionSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('kpi'),   config: kpiConfigSchema }),
  z.object({ type: z.literal('line'),  config: lineChartConfigSchema }),
  z.object({ type: z.literal('bar'),   config: barChartConfigSchema }),
  z.object({ type: z.literal('table'), config: dataTableConfigSchema }),
])

export const dashboardWidgetSchema = z.object({
  id: z.string().uuid(),
  definition: widgetDefinitionSchema,
  layout: z.object({
    id: z.string(),
    x: z.number(), y: z.number(),
    w: z.number(), h: z.number(),
  }),
})

export const dashboardConfigSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  widgets: z.array(dashboardWidgetSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})