import { useState }   from 'react'
import { TrendingUp, Users, BookOpen, Award } from 'lucide-react'
import './AvancementPage.css'

interface ModuleProgress {
  id:         string
  module:     string
  groupe:     string
  enseignant: string
  chapitres:  number
  chapDone:   number
  tps:        number
  tpsDone:    number
  competences:number
  compDone:   number
  color:      string
  accentBg:   string
}

const MOCK: ModuleProgress[] = [
  { id:'1', module:'Algo & Prog',  groupe:'Groupe A', enseignant:'M. Karimi',  chapitres:8, chapDone:6, tps:10, tpsDone:8, competences:12, compDone:9,  color:'#1a56a0', accentBg:'#e8f0fc' },
  { id:'2', module:'Réseaux',      groupe:'Groupe B', enseignant:'Mme. Saidi', chapitres:6, chapDone:3, tps:8,  tpsDone:4, competences:10, compDone:5,  color:'#0f9d6e', accentBg:'#e6f9f2' },
  { id:'3', module:'BD',           groupe:'Groupe C', enseignant:'M. Alami',   chapitres:7, chapDone:7, tps:6,  tpsDone:6, competences:8,  compDone:8,  color:'#d97706', accentBg:'#fff8e6' },
  { id:'4', module:'Maths',        groupe:'Groupe D', enseignant:'Mme. Tahir', chapitres:10,chapDone:3, tps:12, tpsDone:4, competences:15, compDone:4,  color:'#e53e3e', accentBg:'#fef0f0' },
  { id:'5', module:'Physique',     groupe:'Groupe A', enseignant:'M. Fassi',   chapitres:6, chapDone:5, tps:8,  tpsDone:6, competences:9,  compDone:7,  color:'#6c4fd6', accentBg:'#f0eeff' },
  { id:'6', module:'Anglais Tech', groupe:'Groupe B', enseignant:'Mme. Benni', chapitres:5, chapDone:4, tps:4,  tpsDone:3, competences:6,  compDone:5,  color:'#0891b2', accentBg:'#e0f7fa' },
]

const pct = (done: number, total: number) =>
  total === 0 ? 0 : Math.round((done / total) * 100)

const globalAvg = (m: ModuleProgress) =>
  pct(m.chapDone + m.tpsDone + m.compDone, m.chapitres + m.tps + m.competences)

const ProgressBar: React.FC<{ value: number; color: string; thin?: boolean }> = ({ value, color, thin }) => (
  <div className={`av-progress-track ${thin ? 'av-progress-thin' : ''}`}>
    <div className="av-progress-fill" style={{ width: `${value}%`, background: color }} />
  </div>
)

const AvancementPage: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null)

  const overallAvg = Math.round(
    MOCK.reduce((acc, m) => acc + globalAvg(m), 0) / MOCK.length
  )

  return (
    <div className="avancement-page">

      {/* ── Summary strip ── */}
      <div className="av-summary">
        {[
          { label: 'Progression globale', value: `${overallAvg}%`,    icon: <TrendingUp size={18} />, color: '#1a56a0', bg: '#e8f0fc' },
          { label: 'Modules actifs',       value: MOCK.length,          icon: <BookOpen   size={18} />, color: '#0f9d6e', bg: '#e6f9f2' },
          { label: 'Groupes suivis',        value: 4,                    icon: <Users      size={18} />, color: '#d97706', bg: '#fff8e6' },
          { label: 'Modules complétés',     value: MOCK.filter(m => globalAvg(m) === 100).length, icon: <Award size={18} />, color: '#6c4fd6', bg: '#f0eeff' },
        ].map(s => (
          <div key={s.label} className="av-stat-card">
            <div className="av-stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div>
              <div className="av-stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="av-stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Module cards grid ── */}
      <div className="av-grid">
        {MOCK.map(m => {
          const avg        = globalAvg(m)
          const isExpanded = selected === m.id

          return (
            <div
              key={m.id}
              className={`av-card ${isExpanded ? 'av-card-expanded' : ''}`}
              style={{ borderTop: `3px solid ${m.color}` }}
            >
              {/* Card header */}
              <div className="av-card-header" onClick={() => setSelected(isExpanded ? null : m.id)}>
                <div className="av-card-title-row">
                  <div className="av-card-dot" style={{ background: m.accentBg }}>
                    <BookOpen size={14} color={m.color} />
                  </div>
                  <div>
                    <div className="av-card-module">{m.module}</div>
                    <div className="av-card-meta">{m.groupe} · {m.enseignant}</div>
                  </div>
                </div>
                <div className="av-card-pct" style={{ color: m.color }}>{avg}%</div>
              </div>

              {/* Global progress */}
              <div className="av-card-body">
                <ProgressBar value={avg} color={m.color} />

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="av-detail">
                    <div className="av-detail-row">
                      <div className="av-detail-label">
                        <span>Chapitres</span>
                        <span className="av-detail-count">{m.chapDone}/{m.chapitres}</span>
                      </div>
                      <ProgressBar value={pct(m.chapDone, m.chapitres)} color={m.color} thin />
                    </div>
                    <div className="av-detail-row">
                      <div className="av-detail-label">
                        <span>Travaux pratiques</span>
                        <span className="av-detail-count">{m.tpsDone}/{m.tps}</span>
                      </div>
                      <ProgressBar value={pct(m.tpsDone, m.tps)} color={m.color} thin />
                    </div>
                    <div className="av-detail-row">
                      <div className="av-detail-label">
                        <span>Compétences</span>
                        <span className="av-detail-count">{m.compDone}/{m.competences}</span>
                      </div>
                      <ProgressBar value={pct(m.compDone, m.competences)} color={m.color} thin />
                    </div>
                  </div>
                )}

                <button
                  className="av-toggle-btn"
                  style={{ color: m.color }}
                  onClick={() => setSelected(isExpanded ? null : m.id)}
                >
                  {isExpanded ? 'Réduire ↑' : 'Voir détail ↓'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AvancementPage