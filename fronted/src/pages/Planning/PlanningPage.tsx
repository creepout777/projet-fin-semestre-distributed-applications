// import React, { useState } from 'react';
// import { 
//   Plus, ChevronLeft, ChevronRight, Filter, 
//   Calendar, Clock, MapPin, User, BookOpen, 
//   Users, Info // <--- Added Users and Info here
// } from 'lucide-react';
// import './PlanningPage.css';

import React, { useState } from 'react';
import { 
  Plus, ChevronLeft, ChevronRight, Filter, 
  Clock, MapPin, User, BookOpen, 
  Users, Info 
} from 'lucide-react';
import './PlanningPage.css';

const PlanningPage: React.FC = () => {
  const [view, setView] = useState<'day' | 'week'>('week');

  const sessions = [
    { 
      id: 1, 
      module: 'Mathématiques Appliquées', 
      teacher: 'Pr. Alaoui', 
      room: 'Amphi A', 
      group: 'G1', 
      start: '08:30', 
      end: '10:20', 
      type: 'Cours' 
    },
    { 
      id: 2, 
      module: 'Développement Web', 
      teacher: 'Pr. Benjelloun', 
      room: 'Lab 4', 
      group: 'G2', 
      start: '10:30', 
      end: '12:20', 
      type: 'TP',
      conflict: true 
    }
  ];

  return (
    <div className="planning-container">
      <header className="planning-header">
        <div className="planning-nav">
          <div className="view-switcher">
            <button className={view === 'day' ? 'active' : ''} onClick={() => setView('day')}>Daily</button>
            <button className={view === 'week' ? 'active' : ''} onClick={() => setView('week')}>Weekly</button>
          </div>
          <div className="date-picker">
            <button className="icon-btn"><ChevronLeft size={18} /></button>
            <span className="current-date">March 16 — 22, 2026</span>
            <button className="icon-btn"><ChevronRight size={18} /></button>
          </div>
        </div>

        <div className="planning-actions">
          <div className="filter-group">
            <Filter size={16} className="filter-icon" />
            <select className="planning-select">
              <option>All Teachers</option>
              <option>Pr. Alaoui</option>
            </select>
            <select className="planning-select">
              <option>All Groups</option>
              <option>G1 (EI-1)</option>
            </select>
          </div>
          <button className="btn-primary">
            <Plus size={18} />
            <span>Create Slot</span>
          </button>
        </div>
      </header>

      <div className="calendar-wrapper">
        <div className="time-column">
          <div className="time-slot-header" />
          {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(t => (
            <div key={t} className="time-label">{t}</div>
          ))}
        </div>

        <div className="days-grid">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="day-column">
              <div className="day-header">{day}</div>
              <div className="slots-container">
                {day === 'Mon' && sessions.map(session => (
<div 
  key={session.id} 
  className={`session-card ${session.conflict ? 'conflict' : ''}`}
  style={{ top: `${(parseInt(session.start.split(':')[0]) - 8) * 60 + 20}px` }}
>
  <div className="session-type">{session.type}</div>
  
  {/* Now using BookOpen */}
  <h4 className="session-title">
    <BookOpen size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
    {session.module}
  </h4>

  <div className="session-meta">
    {/* Now using Clock */}
    <span><Clock size={12} /> {session.start} — {session.end}</span>
    <span><User size={12} /> {session.teacher}</span>
    <span><MapPin size={12} /> {session.room}</span>
    <span><Users size={12} /> {session.group}</span>
  </div>

  {session.conflict && (
    <div className="conflict-badge">
      <Info size={10} /> Room Overlap!
    </div>
  )}
</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanningPage;