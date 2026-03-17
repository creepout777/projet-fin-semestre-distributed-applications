import Sidebar from '../components/layout/Sidebar'
import Topbar  from '../components/layout/Topbar'
import { useLocation } from 'react-router-dom'
import './MainLayout.css'

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  '/':           { title: 'Tableau de bord', subtitle: 'Vue générale' },
  '/planning':   { title: 'Planning',        subtitle: 'Gestion des créneaux' },
  '/absences':   { title: 'Absences',        subtitle: 'Suivi des présences' },
  '/avancement': { title: 'Avancement',      subtitle: 'Suivi pédagogique' },
  '/paiements':  { title: 'Paiements',       subtitle: 'Gestion financière' },
  '/users':      { title: 'Utilisateurs',    subtitle: 'Gestion des comptes' },
  '/settings':   { title: 'Paramètres',      subtitle: 'Configuration' },
}

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation()
  const meta     = PAGE_TITLES[location.pathname] ?? { title: 'CampusOps', subtitle: '' }

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-layout-body">
        <Topbar title={meta.title} subtitle={meta.subtitle} />
        <main className="main-layout-content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout