import { useState, useRef, useEffect } from 'react'
import { Bell, Search, ChevronDown, LogOut, Settings, User } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import './Topbar.css'

interface TopbarProps {
  title: string
  subtitle?: string
}

const Topbar: React.FC<TopbarProps> = ({ title, subtitle }) => {
  const user = useAuthStore(s => s.user)
  const logout = useAuthStore(s => s.logout)
  const [search, setSearch] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '??'

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

          {/* User pill + dropdown wrapper */}
          <div className="topbar-user-wrapper" ref={dropdownRef}>
            <button
              className={`topbar-user-pill ${dropdownOpen ? 'active' : ''}`}
              onClick={() => setDropdownOpen(prev => !prev)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <div className="topbar-avatar">{initials}</div>
              <div className="topbar-user-info">
                <span className="topbar-user-name">{user?.name ?? 'Guest User'}</span>
                <span className="topbar-user-role">{user?.role ?? 'Member'}</span>
              </div>
              <ChevronDown
                size={14}
                className={`topbar-chevron ${dropdownOpen ? 'rotated' : ''}`}
              />
            </button>

            {dropdownOpen && (
              <div className="topbar-dropdown">
                {/* Header */}
                <div className="topbar-dropdown-header">
                  <div className="topbar-dropdown-avatar">{initials}</div>
                  <div>
                    <p className="topbar-dropdown-name">{user?.name ?? 'Guest User'}</p>
                    <p className="topbar-dropdown-email">{user?.email ?? ''}</p>
                  </div>
                </div>

                <div className="topbar-dropdown-divider" />

                {/* Menu items */}
                <ul className="topbar-dropdown-menu">
                  <li>
                    <button className="topbar-dropdown-item">
                      <User size={15} />
                      <span>Mon profil</span>
                    </button>
                  </li>
                  <li>
                    <button className="topbar-dropdown-item">
                      <Settings size={15} />
                      <span>Paramètres</span>
                    </button>
                  </li>
                </ul>

                <div className="topbar-dropdown-divider" />

                {/* Logout */}
                <button
                  className="topbar-dropdown-item topbar-dropdown-logout"
                  onClick={() => {
                    setDropdownOpen(false)
                    logout()
                  }}
                >
                  <LogOut size={15} />
                  <span>Se déconnecter</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar