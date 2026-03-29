import { create } from 'zustand'

export type DateRangePreset = '7d' | '30d' | '90d' | 'all'

interface DateRange {
  from: string | null
  to:   string | null
}

interface DashboardState {
  preset:    DateRangePreset
  dateRange: DateRange
  setPreset: (preset: DateRangePreset) => void
}

function presetToRange(preset: DateRangePreset): DateRange {
  if (preset === 'all') return { from: null, to: null }

  const days = { '7d': 7, '30d': 30, '90d': 90 }[preset]
  const to   = new Date()
  const from = new Date()
  from.setDate(from.getDate() - days)

  return {
    from: from.toISOString().split('T')[0]!,
    to:   to.toISOString().split('T')[0]!,
  }
}

export const useDashboardStore = create<DashboardState>()((set) => ({
  preset:    'all',
  dateRange: { from: null, to: null },

  setPreset: (preset) =>
    set({
      preset,
      dateRange: presetToRange(preset),
    }),
}))