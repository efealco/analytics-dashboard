import { describe, it, expect, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { renderWithProviders } from '@/test/renderWithProviders'
import { WidgetRenderer } from '@/widgets'
import { DateRangeFilter } from '@/features/date-range-filter/DateRangeFilter'
import { useDashboardStore } from '@/features/date-range-filter/useDashboardStore'
import { metricFixtures } from '@/test/mocks/fixtures/metrics'

beforeEach(() => {
  useDashboardStore.setState({ preset: 'all', dateRange: { from: null, to: null } })
})

describe('date range filter → widget integration', () => {
  it('renders KPI widget with data on initial load', async () => {
    renderWithProviders(
      <>
        <DateRangeFilter />
        <WidgetRenderer definition={{
          type: 'kpi',
          config: {
            metricId: metricFixtures[0]!.id,
            label: 'Revenue',
            unit: '$',
            showTrend: true,
          },
        }} />
      </>
    )
    expect(await screen.findByText('Revenue')).toBeInTheDocument()
  })

  it('filter buttons are all rendered', async () => {
    renderWithProviders(<DateRangeFilter />)
    expect(screen.getByText('Last 7 days')).toBeInTheDocument()
    expect(screen.getByText('Last 30 days')).toBeInTheDocument()
    expect(screen.getByText('All time')).toBeInTheDocument()
  })

  it('clicking a preset updates the store', async () => {
    const user = userEvent.setup()
    renderWithProviders(<DateRangeFilter />)

    await user.click(screen.getByText('Last 30 days'))

    const { preset, dateRange } = useDashboardStore.getState()
    expect(preset).toBe('30d')
    expect(dateRange.from).not.toBeNull()
  })

  it('clicking All time resets store to null range', async () => {
    const user = userEvent.setup()
    renderWithProviders(<DateRangeFilter />)

    await user.click(screen.getByText('Last 7 days'))
    await user.click(screen.getByText('All time'))

    expect(useDashboardStore.getState().dateRange.from).toBeNull()
  })
})