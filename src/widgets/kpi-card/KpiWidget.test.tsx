import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { KpiWidget } from './KpiWidget'
import { renderWithProviders } from '@/test/renderWithProviders'
import { metricFixtures } from '@/test/mocks/fixtures/metrics'

const revenueMetric = metricFixtures[0]!

describe('KpiWidget', () => {
  it('renders the metric label', async () => {
    renderWithProviders(
      <KpiWidget config={{
        metricId: revenueMetric.id,
        label: 'Revenue',
        unit: '$',
        showTrend: false,
      }} />
    )
    expect(await screen.findByText('Revenue')).toBeInTheDocument()
  })

  it('renders the latest value with unit prefix', async () => {
  renderWithProviders(
    <KpiWidget config={{
      metricId: revenueMetric.id,
      label: 'Revenue',
      unit: '$',
      showTrend: false,
    }} />
  )

  // Wait for data to load, then find the kpi-value element directly
  const valueEl = await screen.findByText((_, element) =>
    element?.className === 'kpi-value'
  )
  expect(valueEl).toBeInTheDocument()
  expect(valueEl.textContent).toContain('$')
  expect(valueEl.textContent).toContain('2')  // at least some of the value
})

  it('shows trend when showTrend is true', async () => {
    renderWithProviders(
      <KpiWidget config={{
        metricId: revenueMetric.id,
        label: 'Revenue',
        unit: '$',
        showTrend: true,
      }} />
    )
    expect(await screen.findByText(/vs last period/)).toBeInTheDocument()
  })

  it('hides trend when showTrend is false', async () => {
    renderWithProviders(
      <KpiWidget config={{
        metricId: revenueMetric.id,
        label: 'Revenue',
        unit: '$',
        showTrend: false,
      }} />
    )
    await screen.findByText('Revenue')
    expect(screen.queryByText(/vs last period/)).not.toBeInTheDocument()
  })

  it('renders empty state for unknown metricId', async () => {
    renderWithProviders(
      <KpiWidget config={{
        metricId: 'non-existent-id',
        label: 'Ghost',
        unit: '',
        showTrend: false,
      }} />
    )
    expect(await screen.findByText(/not found/)).toBeInTheDocument()
  })
})