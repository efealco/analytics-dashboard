import { useDashboardStore } from './useDashboardStore'
import type { DateRangePreset } from './useDashboardStore'

const PRESETS: { label: string; value: DateRangePreset }[] = [
  { label: 'Last 7 days',  value: '7d'  },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 90 days', value: '90d' },
  { label: 'All time',     value: 'all' },
]

export function DateRangeFilter() {
  const preset    = useDashboardStore(s => s.preset)
  const setPreset = useDashboardStore(s => s.setPreset)

  return (
    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
      {PRESETS.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setPreset(value)}
          style={{
            padding: '5px 12px',
            fontSize: '12px',
            borderRadius: 'var(--border-radius-md, 8px)',
            border: '0.5px solid',
            cursor: 'pointer',
            transition: 'all .15s',
            background: preset === value ? '#534AB7' : 'transparent',
            borderColor: preset === value ? '#534AB7' : 'var(--color-border-secondary)',
            color: preset === value ? '#fff' : 'var(--color-text-secondary)',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  )
}