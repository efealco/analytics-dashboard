import { useState } from 'react'

const NAV = [
  { label: 'Overview',  icon: '▦' },
  { label: 'Revenue',   icon: '↗' },
  { label: 'Customers', icon: '◎' },
  { label: 'Channels',  icon: '≋' },
  { label: 'Reports',   icon: '▤' },
]

const s = {
  nav: {
    width: '220px', minWidth: '220px',
    background: '#111318',
    display: 'flex', flexDirection: 'column' as const,
    height: '100vh', userSelect: 'none' as const,
  },
  logo: {
    padding: '18px 16px',
    display: 'flex', alignItems: 'center', gap: 10,
    marginBottom: 4,
  },
  logoMark: {
    width: 26, height: 26, background: '#0A6EDB',
    borderRadius: 6, display: 'flex', alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0,
  },
  section: { flex: 1, padding: '4px 10px', overflowY: 'auto' as const },
  sectionLabel: {
    fontSize: 10, fontWeight: 600, letterSpacing: '.08em',
    textTransform: 'uppercase' as const, color: '#3A3F4D',
    padding: '8px 6px 4px',
  },
  footer: {
    padding: '10px 10px 16px',
    borderTop: '1px solid rgba(255,255,255,.05)',
  },
  avatar: {
    width: 28, height: 28, borderRadius: '50%',
    background: '#1E2230',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 10, fontWeight: 700, color: '#5C6680', flexShrink: 0,
  },
}

function NavBtn({ label, icon, active, onClick }:
  { label: string; icon: string; active: boolean; onClick: () => void }
) {
  return (
    <button onClick={onClick} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 9,
      padding: '6px 8px', borderRadius: 7,
      border: 'none', cursor: 'pointer', fontSize: 13,
      fontWeight: active ? 500 : 400,
      background: active ? 'rgba(255,255,255,.07)' : 'transparent',
      color: active ? '#F0F2F5' : '#6B7385',
      transition: 'all .1s', textAlign: 'left' as const, marginBottom: 1,
    }}
    onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#C8CDD8' }}
    onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#6B7385' }}
    >
      <span style={{ fontSize: 14, width: 16, textAlign: 'center', opacity: active ? 1 : 0.7 }}>
        {icon}
      </span>
      <span style={{ flex: 1 }}>{label}</span>
      {active && (
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#0A6EDB', flexShrink: 0 }} />
      )}
    </button>
  )
}

export function Sidebar() {
  const [active, setActive] = useState('Overview')
  return (
    <nav style={s.nav}>
      <div style={s.logo}>
        <div style={s.logoMark}>A</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Analytics</div>
          <div style={{ fontSize: 11, color: '#4B5160', marginTop: 1 }}>Workspace</div>
        </div>
      </div>
      <div style={s.section}>
        <div style={s.sectionLabel}>Main</div>
        {NAV.map(item => (
          <NavBtn key={item.label} label={item.label} icon={item.icon}
            active={active === item.label} onClick={() => setActive(item.label)} />
        ))}
      </div>
      <div style={s.footer}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 6px' }}>
          <div style={s.avatar}>ME</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#C8CDD8',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              My Account
            </div>
            <div style={{ fontSize: 11, color: '#4B5160' }}>Admin</div>
          </div>
        </div>
      </div>
    </nav>
  )
}