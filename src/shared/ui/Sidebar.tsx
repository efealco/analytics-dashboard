import { useState } from 'react'

interface NavItem { label: string; icon: string; }

const NAV: NavItem[] = [
  { label: 'Overview',  icon: '▦' },
  { label: 'Revenue',   icon: '↗' },
  { label: 'Customers', icon: '◎' },
  { label: 'Channels',  icon: '≋' },
  { label: 'Reports',   icon: '▤' },
]

const BOTTOM: NavItem[] = [
  { label: 'Settings', icon: '⚙' },
  { label: 'Help',     icon: '?' },
]

export function Sidebar() {
  const [active, setActive] = useState('Overview')

  return (
    <nav style={{
      width: 'var(--sidebar-w)', minWidth: 'var(--sidebar-w)',
      background: 'var(--bg-sidebar)',
      display: 'flex', flexDirection: 'column',
      height: '100vh', userSelect: 'none',
    }}>
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, background: 'var(--accent)',
            borderRadius: 6, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#fff',
          }}>A</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Analytics</div>
            <div style={{ fontSize: 11, color: 'var(--text-sidebar)' }}>Workspace</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        <div style={{
          fontSize: 10, fontWeight: 600, letterSpacing: '.08em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,.25)',
          padding: '0 8px', marginBottom: 6,
        }}>Main</div>
        {NAV.map(item => (
          <button
            key={item.label}
            onClick={() => setActive(item.label)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '7px 8px', borderRadius: 'var(--radius-md)',
              border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: active === item.label ? 500 : 400,
              background: active === item.label ? 'rgba(255,255,255,.08)' : 'transparent',
              color: active === item.label ? '#fff' : 'var(--text-sidebar)',
              transition: 'background .12s, color .12s', textAlign: 'left',
            }}
          >
            <span style={{ fontSize: 15, width: 18, textAlign: 'center' }}>{item.icon}</span>
            {item.label}
            {active === item.label && (
              <div style={{ marginLeft: 'auto', width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)' }} />
            )}
          </button>
        ))}
      </div>

      <div style={{ padding: '8px 8px 16px', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        {BOTTOM.map(item => (
          <button key={item.label} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
            padding: '7px 8px', borderRadius: 'var(--radius-md)',
            border: 'none', cursor: 'pointer', fontSize: 13,
            background: 'transparent', color: 'var(--text-sidebar)', textAlign: 'left',
          }}>
            <span style={{ fontSize: 15, width: 18, textAlign: 'center' }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 8px 4px',
          borderTop: '1px solid rgba(255,255,255,.06)', marginTop: 8,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%', background: '#2D3139',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 600, color: '#A8B0BC', flexShrink: 0,
          }}>ME</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>My Account</div>
            <div style={{ fontSize: 11, color: 'var(--text-sidebar)' }}>Admin</div>
          </div>
        </div>
      </div>
    </nav>
  )
}