import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './DashboardPage.css';
import { 
  Users, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  Calendar,
  MoreVertical,
  ArrowUpRight,
  Shield,
  Settings
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  const stats = [
    { label: 'Active Courses', value: '24', icon: <BookOpen className="stat-icon blue" />, change: '+12%', color: 'blue' },
    { label: 'Total Students', value: '1,256', icon: <Users className="stat-icon green" />, change: '+5.4%', color: 'green' },
    { label: 'Pending Requests', value: '8', icon: <Clock className="stat-icon orange" />, change: '-2', color: 'orange' },
    { label: 'Completion Rate', value: '94%', icon: <CheckCircle className="stat-icon purple" />, change: '+1.2%', color: 'purple' },
  ];

  const activities = [
    { id: 1, type: 'registration', title: 'New student registration', user: 'Amin Khalil', time: '2 hours ago', status: 'pending' },
    { id: 2, type: 'course', title: 'Course "Distributed Systems" updated', user: 'Dr. Alami', time: '4 hours ago', status: 'completed' },
    { id: 3, type: 'security', title: 'Role permission changed', user: 'System', time: 'Yesterday', status: 'info' },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-text">
          <h1>Welcome back, {user?.email.split('@')[0]}</h1>
          <p>Here's what's happening across the campus today.</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <Calendar size={18} />
            <span>March 2026</span>
          </button>
          <button className="btn-primary hover-lift">
            <TrendingUp size={18} />
            <span>View Reports</span>
          </button>
        </div>
      </header>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card animate-fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="stat-main">
              <div className={`icon-wrapper ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="stat-info">
                <span className="stat-label">{stat.label}</span>
                <h2 className="stat-value">{stat.value}</h2>
              </div>
            </div>
            <div className="stat-footer">
              <span className={`change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                {stat.change}
              </span>
              <span className="period">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-section recent-activity glass animate-slide-up">
          <div className="section-header">
            <h3>Recent Activity</h3>
            <button className="icon-btn"><MoreVertical size={20} /></button>
          </div>
          <div className="activity-list">
            {activities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className={`activity-indicator ${activity.status}`}></div>
                <div className="activity-details">
                  <div className="activity-main">
                    <h4>{activity.title}</h4>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                  <p>By {activity.user}</p>
                </div>
                <ArrowUpRight size={16} className="activity-arrow" />
              </div>
            ))}
          </div>
          <button className="view-all-btn">View All Activity</button>
        </section>

        <section className="dashboard-section quick-actions glass animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="section-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="actions-grid">
            <button className="action-card">
              <Users size={24} />
              <span>Add Student</span>
            </button>
            <button className="action-card">
              <BookOpen size={24} />
              <span>Create Course</span>
            </button>
            <button className="action-card">
              <Shield size={24} />
              <span>Manage Roles</span>
            </button>
            <button className="action-card">
              <Settings size={24} />
              <span>System Config</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
