import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { SlotDTO } from '../../../services/planning'

interface Props {
  view: 'day' | 'week'
  slots: SlotDTO[]
  weekStart: Date
  onPrev: () => void
  onNext: () => void
  onSlotClick: (slot: SlotDTO) => void
  canEdit: boolean
  onDeleteSlot: (id: number) => void
}

const HOURS = Array.from({ length: 10 }, (_, i) => i + 8) // 08 → 17
const DAYS  = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

const TYPE_COLORS: Record<string, string> = {
  COURS: '#1d4ed8',
  TP:    '#16a34a',
  TD:    '#d97706',
  EXAM:  '#dc2626',
}

const timeToMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

const getSlotStyle = (startTime: string, endTime: string) => {
  const start   = timeToMinutes(startTime)
  const end     = timeToMinutes(endTime)
  const top     = (start - 8 * 60) * (60 / 60)  // 60px per hour
  const height  = (end - start) * (60 / 60)
  return { top: `${top}px`, height: `${Math.max(height, 40)}px` }
}

const formatDateLabel = (weekStart: Date, view: 'day' | 'week') => {
  const opts: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' }
  if (view === 'day') {
    return weekStart.toLocaleDateString('fr-FR', { ...opts, day: 'numeric' })
  }
  const end = new Date(weekStart)
  end.setDate(end.getDate() + 5)
  return `${weekStart.getDate()} — ${end.getDate()} ${weekStart.toLocaleDateString('fr-FR', opts)}`
}

const PlanningCalendar: React.FC<Props> = ({
  view, slots, weekStart, onPrev, onNext, onSlotClick, canEdit, onDeleteSlot
}) => {

  const days = Array.from({ length: view === 'week' ? 6 : 1 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + i)
    return d
  })

  const slotsForDay = (date: Date) => {
    const iso = date.toISOString().split('T')[0]
    return slots.filter(s => s.date === iso)
  }

  return (
    <div className="calendar-wrapper">

      {/* Toolbar */}
      <div className="calendar-toolbar">
        <button className="cal-nav-btn" onClick={onPrev}>
          <ChevronLeft size={16} />
        </button>
        <span className="cal-date-label">{formatDateLabel(weekStart, view)}</span>
        <button className="cal-nav-btn" onClick={onNext}>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Grid */}
      <div className="cal-grid">

        {/* Time column */}
        <div className="time-col">
          <div className="time-col-header" />
          {HOURS.map(h => (
            <div key={h} className="time-cell">
              {String(h).padStart(2, '0')}:00
            </div>
          ))}
        </div>

        {/* Day columns */}
        {days.map((day, i) => (
          <div key={i} className="day-col">
            <div className={`day-col-header ${day.toDateString() === new Date().toDateString() ? 'today' : ''}`}>
              <span className="day-name">{DAYS[i]}</span>
              <span className="day-num">{day.getDate()}</span>
            </div>

            <div className="day-body">
              {/* Hour lines */}
              {HOURS.map(h => (
                <div key={h} className="hour-line" style={{ top: `${(h - 8) * 60}px` }} />
              ))}

              {/* Slots */}
              {slotsForDay(day).map(slot => (
                <div
                  key={slot.id}
                  className="cal-slot"
                  style={{
                    ...getSlotStyle(slot.startTime, slot.endTime),
                    borderLeftColor: TYPE_COLORS[slot.type] ?? '#64748b',
                    background: `${TYPE_COLORS[slot.type]}12`,
                  }}
                  onClick={() => onSlotClick(slot)}
                >
                  <div className="cal-slot-type" style={{ color: TYPE_COLORS[slot.type] }}>
                    {slot.type}
                  </div>
                  <div className="cal-slot-module">{slot.module}</div>
                  <div className="cal-slot-meta">
                    {slot.startTime} — {slot.endTime} · {slot.salle}
                  </div>
                  <div className="cal-slot-meta">{slot.enseignant} · {slot.groupe}</div>
                  {canEdit && (
                    <button
                      className="cal-slot-delete"
                      onClick={e => { e.stopPropagation(); onDeleteSlot(slot.id!) }}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlanningCalendar