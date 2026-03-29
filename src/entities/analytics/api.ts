import { apiClient } from '@/shared/api/client'
import {
  summaryStatsSchema,
  trafficResponseSchema,
  channelsResponseSchema,
} from './schema'
import type {
  SummaryStats,
  TrafficResponse,
  ChannelsResponse,
} from './types'

export interface DateParams {
  from?: string | null
  to?:   string | null
}

function buildQuery(params: DateParams): string {
  const search = new URLSearchParams()
  if (params.from) search.set('from', params.from)
  if (params.to)   search.set('to',   params.to)
  const q = search.toString()
  return q ? `?${q}` : ''
}

export async function getSummaryStats(): Promise<SummaryStats> {
  const raw = await apiClient.get<unknown>('/api/analytics/summary')
  return summaryStatsSchema.parse(raw)
}

export async function getTraffic(
  params: DateParams = {}
): Promise<TrafficResponse> {
  const raw = await apiClient.get<unknown>(
    `/api/analytics/traffic${buildQuery(params)}`
  )
  return trafficResponseSchema.parse(raw)
}

export async function getChannels(): Promise<ChannelsResponse> {
  const raw = await apiClient.get<unknown>('/api/analytics/channels')
  return channelsResponseSchema.parse(raw)
}