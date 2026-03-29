import { useQuery } from '@tanstack/react-query'
import { getMetrics } from './api'
import type { GetMetricsParams } from './api'

// Query key factory — centralised, no magic strings scattered around
export const metricKeys = {
  all: ['metrics'] as const,
  list: (params: GetMetricsParams) =>
    [...metricKeys.all, 'list', params] as const,
}

export function useMetrics(params: GetMetricsParams = {}) {
  return useQuery({
    queryKey: metricKeys.list(params),
    queryFn: () => getMetrics(params),
  })
}