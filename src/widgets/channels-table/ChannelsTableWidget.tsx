import { Widget } from '@/shared/ui/Widget'
import { useChannels } from '@/entities/analytics'
import { TableSkeleton } from '@/shared/ui/Skeleton'
import type { ChannelRow } from '@/entities/analytics'

export function ChannelsTableWidget() {
  const { data, isPending, isError } = useChannels()

  if (isPending) return (
    <Widget>
      <Widget.Header><span>Top channels</span></Widget.Header>
      <TableSkeleton rows={7} />
    </Widget>
  )
  if (isError)      return <Widget><Widget.Error /></Widget>
  if (!data.data.length) return <Widget><Widget.Empty message="No channel data" /></Widget>

  return (
    <Widget>
      <Widget.Header><span>Top channels</span></Widget.Header>
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Source</th>
              <th style={{ textAlign: 'right' }}>Visitors</th>
              <th style={{ textAlign: 'right' }}>Revenue</th>
              <th style={{ textAlign: 'right' }}>Sales</th>
              <th style={{ textAlign: 'right' }}>Conversion</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((row: ChannelRow) => (
              <tr key={row.source}>
                <td>{row.source}</td>
                <td style={{ textAlign: 'right', color: 'var(--text-secondary)' }}>
                  {(row.visitors / 1000).toFixed(1)}K
                </td>
                <td style={{ textAlign: 'right', fontWeight: 500 }}>
                  ${row.revenue.toLocaleString()}
                </td>
                <td style={{ textAlign: 'right', color: 'var(--text-secondary)' }}>
                  {row.sales}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <span className="conversion-good">
                    {row.conversion.toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Widget>
  )
}