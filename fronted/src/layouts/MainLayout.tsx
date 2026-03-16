import './MainLayout.css';
import { LogOut, LayoutDashboard, UserPlus, Shield, Settings, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleLabel = () => {
    if (user?.roles.includes('ROLE_ADMIN')) return 'Administrator';
    if (user?.roles.includes('ROLE_ETUDIANT')) return 'Student';
    if (user?.roles.includes('ROLE_ENSEIGNANT')) return 'Teacher';
    return user?.roles[0] || 'User';
  };

  return (
    <div className="layout-container">
      <aside className="sidebar animate-fade-in">
        <div className="logo-section">
          <img src={logo} alt="CampusOps" className="sidebar-logo" />
          <span className="brand-name">CampusOps</span>
        </div>
        <nav className="nav-menu">
          <a href="#" className="nav-item active">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </a>
          {user?.roles.includes('ROLE_ADMIN') && (
            <>
              <a href="#" className="nav-item">
                <UserPlus size={20} />
                <span>Registration</span>
              </a>
              <a href="#" className="nav-item">
                <Shield size={20} />
                <span>Roles</span>
              </a>
            </>
          )}
          <a href="#" className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </a>
        </nav>
      </aside>

      <div className="main-wrapper">
        <header className="top-header glass">
          <div className="header-search">
            <Search className="search-icon" size={18} />
            <input type="text" placeholder="Search anything..." className="search-input" />
          </div>
          <div className="user-profile">
            <div className="user-info">
              <span className="user-name">{user?.email.split('@')[0]}</span>
              <span className="user-role">{getRoleLabel()}</span>
            </div>
            <div className="avatar">{user?.email.charAt(0).toUpperCase()}</div>
            <button className="logout-btn hover-lift" onClick={handleLogout} title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <main className="content animate-slide-up">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
