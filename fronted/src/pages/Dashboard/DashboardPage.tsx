import {
  Users, BookOpen, ShieldAlert, CreditCard,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react'
import './DashboardPage.css'

interface StatCardProps {
  label:   string
  value:   string | number
  delta:   string
  up:      boolean
  icon:    React.ReactNode
  color:   string
}

const StatCard: React.FC<StatCardProps> = ({ label, value, delta, up, icon, color }) => (
  <div className="stat-card">
    <div className="stat-card-top">
      <span className="stat-card-label">{label}</span>
      <div className="stat-card-icon" style={{ background: color + '18' }}>
        <span style={{ color }}>{icon}</span>
      </div>
    </div>
    <div className="stat-card-value">{value}</div>
    <div className={`stat-card-delta ${up ? 'up' : 'down'}`}>
      {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
      {delta}
    </div>
  </div>
)

interface ProgressRowProps {
  label:      string
  value:      number
  color:      string
}

const ProgressRow: React.FC<ProgressRowProps> = ({ label, value, color }) => (
  <div className="progress-row">
    <div className="progress-row-top">
      <span className="progress-row-label">{label}</span>
      <span className="progress-row-value">{value}%</span>
    </div>
    <div className="progress-bar-track">
      <div
        className="progress-bar-fill"
        style={{ width: `${value}%`, background: color }}
      />
    </div>
  </div>
)

interface AbsenceRowProps {
  name:    string
  module:  string
  date:    string
  status:  'absent' | 'justified' | 'pending'
}

const STATUS_MAP = {
  absent:    { label: 'Non justifié', cls: 'badge-danger'  },
  justified: { label: 'Justifié',     cls: 'badge-success' },
  pending:   { label: 'En attente',   cls: 'badge-warning' },
}

const AbsenceRow: React.FC<AbsenceRowProps> = ({ name, module, date, status }) => {
  const s = STATUS_MAP[status]
  return (
    <div className="table-row">
      <span className="table-cell-name">{name}</span>
      <span className="table-cell-muted">{module}</span>
      <span className="table-cell-muted">{date}</span>
      <span className={`dash-badge ${s.cls}`}>{s.label}</span>
    </div>
  )
}

interface PaiementRowProps {
  name:    string
  plan:    string
  amount:  string
  status:  'paye' | 'partiel' | 'impaye'
}

const PAY_MAP = {
  paye:    { label: 'Payé',    cls: 'badge-success' },
  partiel: { label: 'Partiel', cls: 'badge-warning' },
  impaye:  { label: 'Impayé',  cls: 'badge-danger'  },
}

const PaiementRow: React.FC<PaiementRowProps> = ({ name, plan, amount, status }) => {
  const s = PAY_MAP[status]
  return (
    <div className="table-row">
      <span className="table-cell-name">{name}</span>
      <span className="table-cell-muted">{plan}</span>
      <span className="table-cell-muted">{amount}</span>
      <span className={`dash-badge ${s.cls}`}>{s.label}</span>
    </div>
  )
}

const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard">

      {/* ── Stat Cards ── */}
      <div className="dashboard-stats">
        <StatCard label="Étudiants"     value={248}  delta="12 ce mois"  up={true}  color="#1a56a0" icon={<Users      size={18} />} />
        <StatCard label="Enseignants"   value={34}   delta="Stable"      up={true}  color="#0f9d6e" icon={<BookOpen   size={18} />} />
        <StatCard label="Absences auj." value={12}   delta="3 vs hier"   up={false} color="#e53e3e" icon={<ShieldAlert size={18} />} />
        <StatCard label="Paiements dus" value={19}   delta="5 en retard" up={false} color="#d97706" icon={<CreditCard  size={18} />} />
      </div>

      {/* ── Middle Row ── */}
      <div className="dashboard-middle">

        {/* Absences table */}
        <div className="dash-card">
          <div className="dash-card-header">
            <div className="dash-card-title-row">
              <span className="dash-card-dot" style={{ background: '#e53e3e' }} />
              <span className="dash-card-title">Absences récentes</span>
            </div>
            <button className="dash-card-action">Voir tout →</button>
          </div>
          <div className="table-head">
            <span>Étudiant</span><span>Module</span><span>Date</span><span>Statut</span>
          </div>
          <AbsenceRow name="Sara B."    module="Algo & Prog" date="17 Mar" status="absent"    />
          <AbsenceRow name="Youssef K." module="Réseaux"     date="17 Mar" status="pending"   />
          <AbsenceRow name="Lina M."    module="Maths"       date="16 Mar" status="justified" />
          <AbsenceRow name="Omar D."    module="BD"          date="15 Mar" status="absent"    />
        </div>

        {/* Paiements table */}
        <div className="dash-card">
          <div className="dash-card-header">
            <div className="dash-card-title-row">
              <span className="dash-card-dot" style={{ background: '#d97706' }} />
              <span className="dash-card-title">Paiements — état</span>
            </div>
            <button className="dash-card-action">Voir tout →</button>
          </div>
          <div className="table-head">
            <span>Étudiant</span><span>Plan</span><span>Montant</span><span>État</span>
          </div>
          <PaiementRow name="Amine R." plan="Mensuel"     amount="1 200 MAD" status="paye"    />
          <PaiementRow name="Nadia S." plan="Inscription" amount="3 500 MAD" status="partiel" />
          <PaiementRow name="Karim T." plan="Mensuel"     amount="1 200 MAD" status="impaye"  />
          <PaiementRow name="Hind F."  plan="Mensuel"     amount="1 200 MAD" status="impaye"  />
        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div className="dashboard-bottom">

        {/* Avancement */}
        <div className="dash-card">
          <div className="dash-card-header">
            <div className="dash-card-title-row">
              <span className="dash-card-dot" style={{ background: '#d97706' }} />
              <span className="dash-card-title">Avancement pédagogique</span>
            </div>
            <span className="dash-badge badge-info">4 groupes</span>
          </div>
          <div className="progress-list">
            <ProgressRow label="Groupe A — Algo & Prog" value={78} color="#1a56a0" />
            <ProgressRow label="Groupe B — Réseaux"     value={54} color="#0f9d6e" />
            <ProgressRow label="Groupe C — BD"          value={91} color="#d97706" />
            <ProgressRow label="Groupe D — Maths"       value={33} color="#e53e3e" />
          </div>
        </div>

        {/* Planning mini */}
        <div className="dash-card">
          <div className="dash-card-header">
            <div className="dash-card-title-row">
              <span className="dash-card-dot" style={{ background: '#1a56a0' }} />
              <span className="dash-card-title">Planning — cette semaine</span>
            </div>
            <span className="dash-badge badge-info">17–21 Mars</span>
          </div>
          <div className="mini-planning">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'].map(day => (
              <div key={day} className="mini-planning-col">
                <div className="mini-planning-day">{day}</div>
                {day === 'Lun' && <><div className="mini-slot slot-blue">Algo<br/><small>Salle 3</small></div><div className="mini-slot slot-purple">Maths<br/><small>Amphi A</small></div></>}
                {day === 'Mar' && <><div className="mini-slot slot-amber">BD<br/><small>Labo 2</small></div><div className="mini-slot slot-teal">Réseaux<br/><small>Salle 1</small></div></>}
                {day === 'Mer' && <><div className="mini-slot slot-teal">Réseaux<br/><small>Salle 1</small></div><div className="mini-slot slot-blue">Algo<br/><small>Salle 3</small></div></>}
                {day === 'Jeu' && <><div className="mini-slot slot-teal">Réseaux<br/><small>Salle 1</small></div><div className="mini-slot slot-amber">BD<br/><small>Labo 2</small></div></>}
                {day === 'Ven' && <><div className="mini-slot slot-purple">Maths<br/><small>Amphi A</small></div><div className="mini-slot slot-blue">Algo<br/><small>Salle 3</small></div></>}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default DashboardPage