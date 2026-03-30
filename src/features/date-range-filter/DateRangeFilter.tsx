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
    <div style={{
      display: 'flex', gap: 2,
      background: '#ECEEF2',
      padding: '3px',
      borderRadius: '10px',
    }}>
      {PRESETS.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setPreset(value)}
          style={{
            background: preset === value ? '#fff' : 'transparent',
            color: preset === value ? 'var(--text-primary)' : 'var(--text-muted)',
            border: preset === value ? '1px solid var(--border)' : '1px solid transparent',
            boxShadow: preset === value ? '0 1px 3px rgba(0,0,0,.08)' : 'none',
            borderRadius: 7,
            padding: '4px 12px',
            fontSize: 12,
            fontWeight: preset === value ? 500 : 400,
            cursor: 'pointer',
            transition: 'all .12s',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  )
}