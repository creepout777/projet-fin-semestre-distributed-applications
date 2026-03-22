import { useState, useEffect, useCallback } from 'react'
import { Plus, Filter } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { planningService } from '../../services/planning/planning.service'
import type { SlotDTO } from '../../services/planning/planning.types'
import PlanningCalendar from './components/PlanningCalendar'
import CreneauModal     from './components/CreneauModal'
import './PlanningPage.css'

const getMonday = (d: Date) => {
  const date = new Date(d)
  const day  = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1)
  date.setDate(diff)
  date.setHours(0, 0, 0, 0)
  return date
}

const toISO = (d: Date) => d.toISOString().split('T')[0]

const PlanningPage: React.FC = () => {
  const user = useAuthStore(s => s.user)
  const canEdit = user?.role === 'admin' || user?.role === 'scolarite'

  const [view,       setView]       = useState<'day' | 'week'>('week')
  const [weekStart,  setWeekStart]  = useState<Date>(getMonday(new Date()))
  const [slots,      setSlots]      = useState<SlotDTO[]>([])
  const [loading,    setLoading]    = useState(false)
  const [modalOpen,  setModalOpen]  = useState(false)
  const [editing,    setEditing]    = useState<SlotDTO | null>(null)
  const [filterG,    setFilterG]    = useState('')
  const [filterE,    setFilterE]    = useState('')

  const fetchSlots = useCallback(async () => {
    setLoading(true)
    try {
      const start = toISO(weekStart)
      const end   = new Date(weekStart)
      end.setDate(end.getDate() + (view === 'week' ? 5 : 0))
      const endISO = toISO(end)

      let data: SlotDTO[]
      if (filterG)      data = await planningService.getByGroupe(filterG, start, endISO)
      else if (filterE) data = await planningService.getByEnseignant(filterE, start, endISO)
      else              data = await planningService.getWeek(start, endISO)

      setSlots(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [weekStart, view, filterG, filterE])

  useEffect(() => { fetchSlots() }, [fetchSlots])

  const navigate = (dir: 1 | -1) => {
    setWeekStart(prev => {
      const d = new Date(prev)
      d.setDate(d.getDate() + dir * (view === 'week' ? 7 : 1))
      return d
    })
  }

  const handleSave = async (dto: SlotDTO) => {
    try {
      if (dto.id) await planningService.update(dto.id, dto)
      else        await planningService.create(dto)
      setModalOpen(false)
      setEditing(null)
      fetchSlots()
    } catch (e) {
      console.error(e)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer ce créneau ?')) return
    try {
      await planningService.delete(id)
      fetchSlots()
    } catch (e) {
      console.error(e)
    }
  }

  const handleSlotClick = (slot: SlotDTO) => {
    if (!canEdit) return
    setEditing(slot)
    setModalOpen(true)
  }

  // Unique values for filter dropdowns
  const groupes     = [...new Set(slots.map(s => s.groupe))]
  const enseignants = [...new Set(slots.map(s => s.enseignant))]

  return (
    <div className="planning-container">

      <header className="planning-header">
        <div className="planning-nav">
          <div className="view-switcher">
            <button className={view === 'day'  ? 'active' : ''} onClick={() => setView('day')}>Jour</button>
            <button className={view === 'week' ? 'active' : ''} onClick={() => setView('week')}>Semaine</button>
          </div>
        </div>

        <div className="planning-actions">
          <div className="filter-group">
            <Filter size={15} className="filter-icon" />
            <select className="planning-select"
              value={filterE} onChange={e => { setFilterE(e.target.value); setFilterG('') }}>
              <option value="">Tous les enseignants</option>
              {enseignants.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
            <select className="planning-select"
              value={filterG} onChange={e => { setFilterG(e.target.value); setFilterE('') }}>
              <option value="">Tous les groupes</option>
              {groupes.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          {canEdit && (
            <button className="btn-primary" onClick={() => { setEditing(null); setModalOpen(true) }}>
              <Plus size={16} />
              <span>Nouveau créneau</span>
            </button>
          )}
        </div>
      </header>

      {loading && <div className="planning-loading">Chargement...</div>}

      <PlanningCalendar
        view={view}
        slots={slots}
        weekStart={weekStart}
        onPrev={() => navigate(-1)}
        onNext={() => navigate(1)}
        onSlotClick={handleSlotClick}
        canEdit={canEdit}
        onDeleteSlot={handleDelete}
      />

      {modalOpen && (
        <CreneauModal
          initial={editing}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditing(null) }}
        />
      )}
    </div>
  )
}

export default PlanningPage