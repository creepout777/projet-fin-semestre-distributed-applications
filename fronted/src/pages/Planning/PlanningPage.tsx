import { useState }        from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import './PlanningPage.css'

interface Creneau {
  id:         string
  module:     string
  groupe:     string
  enseignant: string
  salle:      string
  day:        number  // 0 = Mon … 4 = Fri
  startHour:  number  // e.g. 8
  duration:   number  // in hours
  color:      'blue' | 'teal' | 'amber' | 'purple' | 'red'
}

const MOCK_CRENEAUX: Creneau[] = [
  { id:'1', module:'Algo & Prog',  groupe:'Groupe A', enseignant:'M. Karimi',  salle:'Salle 3',  day:0, startHour:8,  duration:2, color:'blue'   },
  { id:'2', module:'Maths',        groupe:'Groupe D', enseignant:'Mme. Tahir', salle:'Amphi A',  day:0, startHour:14, duration:2, color:'purple' },
  { id:'3', module:'BD',           groupe:'Groupe C', enseignant:'M. Alami',   salle:'Labo 2',   day:1, startHour:10, duration:2, color:'amber'  },
  { id:'4', module:'Réseaux',      groupe:'Groupe B', enseignant:'Mme. Saidi', salle:'Salle 1',  day:1, startHour:14, duration:2, color:'teal'   },
  { id:'5', module:'Réseaux',      groupe:'Groupe B', enseignant:'Mme. Saidi', salle:'Salle 1',  day:2, startHour:8,  duration:2, color:'teal'   },
  { id:'6', module:'Algo & Prog',  groupe:'Groupe A', enseignant:'M. Karimi',  salle:'Salle 3',  day:2, startHour:10, duration:2, color:'blue'   },
  { id:'7', module:'Réseaux',      groupe:'Groupe B', enseignant:'Mme. Saidi', salle:'Salle 1',  day:3, startHour:8,  duration:2, color:'teal'   },
  { id:'8', module:'BD',           groupe:'Groupe C', enseignant:'M. Alami',   salle:'Labo 2',   day:3, startHour:14, duration:2, color:'amber'  },
  { id:'9', module:'Maths',        groupe:'Groupe D', enseignant:'Mme. Tahir', salle:'Amphi A',  day:4, startHour:8,  duration:2, color:'purple' },
  { id:'10',module:'Algo & Prog',  groupe:'Groupe A', enseignant:'M. Karimi',  salle:'Salle 3',  day:4, startHour:10, duration:2, color:'blue'   },
]

const DAYS   = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
const HOURS  = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
const HOUR_H = 64 // px per hour

const getWeekDates = (offset: number) => {
  const now  = new Date()
  const day  = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1) + offset * 7
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(now.setDate(diff + i))
    return { label: d.getDate(), month: d.toLocaleString('fr', { month: 'short' }) }
  })
}

const CreneauCard: React.FC<{ creneau: Creneau; onClick: () => void }> = ({ creneau, onClick }) => {
  const top    = (creneau.startHour - 8) * HOUR_H
  const height = creneau.duration * HOUR_H - 4

  return (
    <div
      className={`creneau-card creneau-${creneau.color}`}
      style={{ top, height }}
      onClick={onClick}
    >
      <span className="creneau-module">{creneau.module}</span>
      <span className="creneau-detail">{creneau.groupe}</span>
      <span className="creneau-detail">{creneau.salle}</span>
    </div>
  )
}

const PlanningPage: React.FC = () => {
  const [weekOffset, setWeekOffset]       = useState(0)
  const [selected,   setSelected]         = useState<Creneau | null>(null)
  const weekDates = getWeekDates(weekOffset)

  return (
    <div className="planning-page">

      {/* ── Toolbar ── */}
      <div className="planning-toolbar">
        <div className="planning-toolbar-left">
          <button className="planning-nav-btn" onClick={() => setWeekOffset(w => w - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span className="planning-week-label">
            Semaine du {weekDates[0]?.label} au {weekDates[4]?.label} {weekDates[4]?.month}
          </span>
          <button className="planning-nav-btn" onClick={() => setWeekOffset(w => w + 1)}>
            <ChevronRight size={16} />
          </button>
          <button className="planning-today-btn" onClick={() => setWeekOffset(0)}>
            Aujourd'hui
          </button>
        </div>
        <button className="planning-add-btn">
          <Plus size={15} /> Nouveau créneau
        </button>
      </div>

      {/* ── Calendar grid ── */}
      <div className="planning-card">
        <div className="calendar-grid">

          {/* Corner */}
          <div className="calendar-corner" />

          {/* Day headers */}
          {DAYS.map((day, i) => (
            <div key={day} className="calendar-day-header">
              <span className="calendar-day-name">{day}</span>
              <span className="calendar-day-date">
                {weekDates[i]?.label} {weekDates[i]?.month}
              </span>
            </div>
          ))}

          {/* Time gutter */}
          <div className="calendar-time-gutter">
            {HOURS.map(h => (
              <div key={h} className="calendar-time-slot" style={{ height: HOUR_H }}>
                <span className="calendar-time-label">{h}:00</span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {DAYS.map((_, dayIdx) => (
            <div key={dayIdx} className="calendar-day-col">
              {/* Hour lines */}
              {HOURS.map(h => (
                <div key={h} className="calendar-hour-line" style={{ height: HOUR_H }} />
              ))}
              {/* Créneaux */}
              {MOCK_CRENEAUX
                .filter(c => c.day === dayIdx)
                .map(c => (
                  <CreneauCard
                    key={c.id}
                    creneau={c}
                    onClick={() => setSelected(c)}
                  />
                ))
              }
            </div>
          ))}
        </div>
      </div>

      {/* ── Detail panel ── */}
      {selected && (
        <div className="creneau-overlay" onClick={() => setSelected(null)}>
          <div className="creneau-detail-panel" onClick={e => e.stopPropagation()}>
            <div className={`creneau-detail-header creneau-header-${selected.color}`}>
              <span className="creneau-detail-module">{selected.module}</span>
              <button className="creneau-close-btn" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="creneau-detail-body">
              <div className="creneau-detail-row">
                <span className="creneau-detail-key">Groupe</span>
                <span className="creneau-detail-val">{selected.groupe}</span>
              </div>
              <div className="creneau-detail-row">
                <span className="creneau-detail-key">Enseignant</span>
                <span className="creneau-detail-val">{selected.enseignant}</span>
              </div>
              <div className="creneau-detail-row">
                <span className="creneau-detail-key">Salle</span>
                <span className="creneau-detail-val">{selected.salle}</span>
              </div>
              <div className="creneau-detail-row">
                <span className="creneau-detail-key">Horaire</span>
                <span className="creneau-detail-val">
                  {selected.startHour}:00 – {selected.startHour + selected.duration}:00
                </span>
              </div>
              <div className="creneau-detail-row">
                <span className="creneau-detail-key">Jour</span>
                <span className="creneau-detail-val">{DAYS[selected.day]}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlanningPage