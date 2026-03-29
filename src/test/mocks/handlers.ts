import { http, HttpResponse } from 'msw'
import { metricFixtures } from './fixtures/metrics'
import {
  summaryFixture,
  trafficFixtures,
  channelFixtures,
} from './fixtures/analytics'

interface CreateDashboardBody {
  title: string
  widgets: unknown[]
}

export const handlers = [

  http.get('/api/metrics', ({ request }) => {
    const url  = new URL(request.url)
    const from = url.searchParams.get('from')
    const to   = url.searchParams.get('to')
    const filtered = metricFixtures.map(series => ({
      ...series,
      points: series.points.filter(p => {
        if (from && p.date < from) return false
        if (to   && p.date > to)   return false
        return true
      }),
    }))
    return HttpResponse.json({ data: filtered, meta: { from, to, total: filtered.length } })
  }),

  http.get('/api/analytics/summary', () =>
    HttpResponse.json(summaryFixture)
  ),

  http.get('/api/analytics/traffic', ({ request }) => {
    const url  = new URL(request.url)
    const from = url.searchParams.get('from')
    const to   = url.searchParams.get('to')
    const filtered = trafficFixtures.filter(p => {
      if (from && p.date < from) return false
      if (to   && p.date > to)   return false
      return true
    })
    return HttpResponse.json({ data: filtered })
  }),

  http.get('/api/analytics/channels', () =>
    HttpResponse.json({ data: channelFixtures })
  ),

  http.get('/api/dashboards/:id', ({ params }) =>
    HttpResponse.json({ id: params.id, title: 'My dashboard', widgets: [] })
  ),

  http.post('/api/dashboards', async ({ request }) => {
    const body = await request.json() as CreateDashboardBody
    return HttpResponse.json({ ...body, id: 'mock-id-1' }, { status: 201 })
  }),
]