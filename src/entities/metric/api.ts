import { apiClient } from '@/shared/api/client'
import { metricsResponseSchema } from './schema'
import type { MetricsResponse } from './types'

export interface GetMetricsParams {
  from?: string | null
  to?: string | null
}

export async function getMetrics(
  params: GetMetricsParams = {}
): Promise<MetricsResponse> {
  const search = new URLSearchParams()
  if (params.from) search.set('from', params.from)
  if (params.to)   search.set('to', params.to)

  const query = search.toString()
  const path = query ? `/api/metrics?${query}` : '/api/metrics'

  const raw = await apiClient.get<unknown>(path)

  // Validate at the API boundary — throws if shape is wrong
  return metricsResponseSchema.parse(raw)
}