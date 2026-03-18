import { useState } from 'react'
import { Bell, Search, ChevronDown } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import './Topbar.css'

interface TopbarProps {
  title: string
  subtitle?: string
}

const Topbar: React.FC<TopbarProps> = ({ title, subtitle }) => {
  const user = useAuthStore(s => s.user)
  const [search, setSearch] = useState('')

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '??'

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-titles">
          <h1 className="topbar-title">{title}</h1>
          {subtitle && <span className="topbar-subtitle">{subtitle}</span>}
        </div>
      </div>

      <div className="topbar-right">
        <div className="topbar-search-container">
          <Search size={16} className="topbar-search-icon" />
          <input
            type="text"
            placeholder="Search tasks, people, or files..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="topbar-search-input"
          />
          <kbd className="topbar-search-shortcut">/</kbd>
        </div>

        <div className="topbar-actions">
          <button className="topbar-icon-btn" aria-label="Notifications">
            <Bell size={20} />
            <span className="topbar-notif-dot" />
          </button>

          <div className="topbar-divider" />

          <button className="topbar-user-pill">
            <div className="topbar-avatar">{initials}</div>
            <div className="topbar-user-info">
              <span className="topbar-user-name">{user?.name ?? 'Guest User'}</span>
              <span className="topbar-user-role">{user?.role ?? 'Member'}</span>
            </div>
            <ChevronDown size={14} className="topbar-chevron" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Topbar