import { NavLink } from 'react-router-dom'
import {
  CalendarDays, ShieldAlert, TrendingUp, 
  CreditCard, Users, Settings, LogOut, LayoutGrid
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useAuth } from '../../hooks/useAuth'
import type { Role } from '../../types'
import './Sidebar.css'

interface NavItem {
  label: string
  path: string
  icon: React.ReactNode
  roles: Role[]
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard',  path: '/',           icon: <LayoutGrid size={18} />,     roles: ['admin', 'scolarite', 'enseignant', 'etudiant'] },
  { label: 'Planning',   path: '/planning',   icon: <CalendarDays size={18} />,  roles: ['admin', 'scolarite', 'enseignant', 'etudiant'] },
  { label: 'Absences',   path: '/absences',   icon: <ShieldAlert size={18} />,   roles: ['admin', 'scolarite', 'enseignant', 'etudiant'] },
  { label: 'Avancement', path: '/avancement', icon: <TrendingUp size={18} />,    roles: ['admin', 'scolarite', 'enseignant', 'etudiant'] },
  { label: 'Paiements',  path: '/paiements',  icon: <CreditCard size={18} />,    roles: ['admin', 'scolarite', 'etudiant'] },
  { label: 'Utilisateurs', path: '/users',    icon: <Users size={18} />,         roles: ['admin'] },
  { label: 'Paramètres',  path: '/settings',   icon: <Settings size={18} />,      roles: ['admin'] },
]

const Sidebar: React.FC = () => {
  const user = useAuthStore(s => s.user)
  const { logout } = useAuth()
  
  const allowedItems = NAV_ITEMS.filter(item =>
    user?.role && item.roles.includes(user.role)
  )

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '??'

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo-container">
          <img src="/src\assets\images\logo.png" alt="Logo" className="sidebar-logo-img" />
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-name">CampusOps</span>
            <span className="sidebar-brand-tag">By. Yassine Ait Aouicha</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-nav-group">
          <span className="sidebar-label">Platform</span>
          {allowedItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              <span className="sidebar-link-text">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user-pill">
          <div className="sidebar-avatar">{initials}</div>
          <div className="sidebar-user-details">
            <p className="sidebar-user-name">{user?.name ?? 'Guest User'}</p>
            <p className="sidebar-user-role">{user?.role ?? 'Member'}</p>
          </div>
          <button className="sidebar-logout-btn" onClick={logout} title="Sign Out">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar