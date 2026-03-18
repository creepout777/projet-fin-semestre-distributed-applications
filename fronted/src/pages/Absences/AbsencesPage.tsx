import { useState }     from 'react'
import { Search, Filter, CheckCircle, XCircle, Clock, Download } from 'lucide-react'
import './AbsencesPage.css'

type Statut = 'all' | 'absent' | 'present' | 'retard'

interface Absence {
  id:        string
  etudiant:  string
  groupe:    string
  module:    string
  date:      string
  horaire:   string
  statut:    'absent' | 'present' | 'retard'
  justifie:  boolean
}

const MOCK: Absence[] = [
  { id:'1',  etudiant:'Sara Benali',     groupe:'Groupe A', module:'Algo & Prog', date:'17/03/2026', horaire:'08:00–10:00', statut:'absent',  justifie:false },
  { id:'2',  etudiant:'Youssef Karimi',  groupe:'Groupe B', module:'Réseaux',     date:'17/03/2026', horaire:'10:00–12:00', statut:'retard',  justifie:false },
  { id:'3',  etudiant:'Lina Moussaoui', groupe:'Groupe D', module:'Maths',       date:'16/03/2026', horaire:'08:00–10:00', statut:'absent',  justifie:true  },
  { id:'4',  etudiant:'Omar Driss',      groupe:'Groupe C', module:'BD',          date:'15/03/2026', horaire:'14:00–16:00', statut:'absent',  justifie:false },
  { id:'5',  etudiant:'Hind Fassi',      groupe:'Groupe A', module:'Algo & Prog', date:'15/03/2026', horaire:'08:00–10:00', statut:'present', justifie:false },
  { id:'6',  etudiant:'Amine Rachidi',   groupe:'Groupe B', module:'Réseaux',     date:'14/03/2026', horaire:'08:00–10:00', statut:'present', justifie:false },
  { id:'7',  etudiant:'Nadia Slaoui',    groupe:'Groupe C', module:'BD',          date:'14/03/2026', horaire:'10:00–12:00', statut:'retard',  justifie:true  },
  { id:'8',  etudiant:'Karim Tahiri',    groupe:'Groupe D', module:'Maths',       date:'13/03/2026', horaire:'14:00–16:00', statut:'absent',  justifie:false },
]

const STATUT_CONFIG = {
  present: { label: 'Présent', icon: <CheckCircle size={13} />, cls: 'statut-present' },
  absent:  { label: 'Absent',  icon: <XCircle     size={13} />, cls: 'statut-absent'  },
  retard:  { label: 'Retard',  icon: <Clock       size={13} />, cls: 'statut-retard'  },
}

const AbsencesPage: React.FC = () => {
  const [search,       setSearch]       = useState('')
  const [filterStatut, setFilterStatut] = useState<Statut>('all')
  const [filterGroupe, setFilterGroupe] = useState('all')
  const [data,         setData]         = useState<Absence[]>(MOCK)

  const groupes = ['all', ...Array.from(new Set(MOCK.map(a => a.groupe)))]

  const filtered = data.filter(a => {
    const matchSearch  = a.etudiant.toLowerCase().includes(search.toLowerCase()) ||
                         a.module.toLowerCase().includes(search.toLowerCase())
    const matchStatut  = filterStatut === 'all' || a.statut === filterStatut
    const matchGroupe  = filterGroupe === 'all' || a.groupe === filterGroupe
    return matchSearch && matchStatut && matchGroupe
  })

  const stats = {
    total:   data.length,
    absent:  data.filter(a => a.statut === 'absent').length,
    retard:  data.filter(a => a.statut === 'retard').length,
    present: data.filter(a => a.statut === 'present').length,
  }

  const markStatut = (id: string, statut: Absence['statut']) => {
    setData(prev => prev.map(a => a.id === id ? { ...a, statut } : a))
  }

  return (
    <div className="absences-page">

      {/* ── Summary cards ── */}
      <div className="absences-stats">
        {[
          { label: 'Total séances', value: stats.total,   color: '#1a56a0', bg: '#e8f0fc' },
          { label: 'Absences',      value: stats.absent,  color: '#e53e3e', bg: '#fef0f0' },
          { label: 'Retards',       value: stats.retard,  color: '#d97706', bg: '#fff8e6' },
          { label: 'Présences',     value: stats.present, color: '#0f9d6e', bg: '#e6f9f2' },
        ].map(s => (
          <div key={s.label} className="absence-stat-card" style={{ borderTop: `3px solid ${s.color}` }}>
            <span className="absence-stat-value" style={{ color: s.color }}>{s.value}</span>
            <span className="absence-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Filters ── */}
      <div className="absences-card">
        <div className="absences-toolbar">
          <div className="absences-search">
            <Search size={14} className="absences-search-icon" />
            <input
              type="text"
              placeholder="Rechercher étudiant ou module..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="absences-search-input"
            />
          </div>
          <div className="absences-filters">
            <div className="filter-group">
              <Filter size={13} />
              <select
                value={filterGroupe}
                onChange={e => setFilterGroupe(e.target.value)}
                className="filter-select"
              >
                {groupes.map(g => (
                  <option key={g} value={g}>{g === 'all' ? 'Tous les groupes' : g}</option>
                ))}
              </select>
            </div>
            <div className="statut-tabs">
              {(['all','present','absent','retard'] as Statut[]).map(s => (
                <button
                  key={s}
                  className={`statut-tab ${filterStatut === s ? 'active' : ''}`}
                  onClick={() => setFilterStatut(s)}
                >
                  {s === 'all' ? 'Tous' : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
            <button className="export-btn">
              <Download size={13} /> Exporter
            </button>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="absences-table-wrap">
          <table className="absences-table">
            <thead>
              <tr>
                <th>Étudiant</th>
                <th>Groupe</th>
                <th>Module</th>
                <th>Date</th>
                <th>Horaire</th>
                <th>Statut</th>
                <th>Justifié</th>
                <th>Marquer</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="absences-empty">Aucun résultat trouvé</td>
                </tr>
              ) : (
                filtered.map(a => {
                  const s = STATUT_CONFIG[a.statut]
                  return (
                    <tr key={a.id}>
                      <td className="td-name">{a.etudiant}</td>
                      <td className="td-muted">{a.groupe}</td>
                      <td className="td-muted">{a.module}</td>
                      <td className="td-muted">{a.date}</td>
                      <td className="td-muted">{a.horaire}</td>
                      <td>
                        <span className={`statut-badge ${s.cls}`}>
                          {s.icon}{s.label}
                        </span>
                      </td>
                      <td>
                        {a.statut === 'absent' ? (
                          <span className={`justif-badge ${a.justifie ? 'justif-yes' : 'justif-no'}`}>
                            {a.justifie ? 'Oui' : 'Non'}
                          </span>
                        ) : (
                          <span className="td-muted">—</span>
                        )}
                      </td>
                      <td>
                        <div className="mark-actions">
                          <button
                            className={`mark-btn mark-present ${a.statut === 'present' ? 'mark-active-present' : ''}`}
                            onClick={() => markStatut(a.id, 'present')}
                            title="Présent"
                          >
                            <CheckCircle size={14} />
                          </button>
                          <button
                            className={`mark-btn mark-retard ${a.statut === 'retard' ? 'mark-active-retard' : ''}`}
                            onClick={() => markStatut(a.id, 'retard')}
                            title="Retard"
                          >
                            <Clock size={14} />
                          </button>
                          <button
                            className={`mark-btn mark-absent ${a.statut === 'absent' ? 'mark-active-absent' : ''}`}
                            onClick={() => markStatut(a.id, 'absent')}
                            title="Absent"
                          >
                            <XCircle size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="absences-footer">
          <span className="absences-count">{filtered.length} résultat{filtered.length > 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  )
}

export default AbsencesPage