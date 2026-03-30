import { Widget } from '@/shared/ui/Widget'
import { useChannels } from '@/entities/analytics'
import type { ChannelRow } from '@/entities/analytics'
import React from 'react'

const COLUMNS: {
  key:    keyof ChannelRow
  label:  string
  align:  'left' | 'right'
  format: (v: ChannelRow[keyof ChannelRow]) => string
}[] = [
  { key: 'source',     label: 'Source',     align: 'left',
    format: v => String(v) },
  { key: 'visitors',   label: 'Visitors',   align: 'right',
    format: v => (typeof v === 'number' ? (v / 1000).toFixed(1) + 'K' : '') },
  { key: 'revenue',    label: 'Revenue',    align: 'right',
    format: v => typeof v === 'number' ? `$${v.toLocaleString()}` : '' },
  { key: 'sales',      label: 'Sales',      align: 'right',
    format: v => String(v) },
  { key: 'conversion', label: 'Conversion', align: 'right',
    format: v => typeof v === 'number' ? v.toFixed(1) + '%' : '' },
]

const th: React.CSSProperties = {
  padding: '8px 12px',
  fontSize: '11px',
  fontWeight: 500,
  color: 'var(--color-text-secondary)',
  borderBottom: '0.5px solid var(--color-border-tertiary)',
  whiteSpace: 'nowrap',
}

const td: React.CSSProperties = {
  padding: '10px 12px',
  fontSize: '13px',
  borderBottom: '0.5px solid var(--color-border-tertiary)',
  whiteSpace: 'nowrap',
}

export function ChannelsTableWidget() {
  const { data, isPending, isError } = useChannels()

  if (isPending) return <Widget><Widget.Loading /></Widget>
  if (isError)   return <Widget><Widget.Error /></Widget>
  if (data.data.length === 0) return (
    <Widget><Widget.Empty message="No channel data" /></Widget>
  )

  return (
    <Widget>
      <Widget.Header>
        <span>Top channels</span>
      </Widget.Header>
      <Widget.Body>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {COLUMNS.map(col => (
                  <th key={col.key} style={{ ...th, textAlign: col.align }}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.data.map((row, i) => (
                <tr
                  key={row.source}
                  style={{
                    background: i % 2 === 0
                      ? 'transparent'
                      : 'var(--color-background-secondary)',
                  }}
                >
                  {COLUMNS.map(col => (
                    <td
                      key={col.key}
                      style={{ ...td, textAlign: col.align }}
                    >
                      {col.format(row[col.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Widget.Body>
    </Widget>
  )
}