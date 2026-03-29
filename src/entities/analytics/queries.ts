import { useQuery } from '@tanstack/react-query'
import { getSummaryStats, getTraffic, getChannels } from './api'
import type { DateParams } from './api'

export const analyticsKeys = {
  all:     ['analytics'] as const,
  summary: () => [...analyticsKeys.all, 'summary'] as const,
  traffic: (params: DateParams) =>
    [...analyticsKeys.all, 'traffic', params] as const,
  channels: () => [...analyticsKeys.all, 'channels'] as const,
}

export function useSummaryStats() {
  return useQuery({
    queryKey: analyticsKeys.summary(),
    queryFn:  getSummaryStats,
  })
}

export function useTraffic(params: DateParams = {}) {
  return useQuery({
    queryKey: analyticsKeys.traffic(params),
    queryFn:  () => getTraffic(params),
  })
}

export function useChannels() {
  return useQuery({
    queryKey: analyticsKeys.channels(),
    queryFn:  getChannels,
  })
}