import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import type { SlotDTO, SlotType, Recurrence } from '../../../services/planning/planning.types'

interface Props {
  initial?: SlotDTO | null
  onSave:  (dto: SlotDTO) => void
  onClose: () => void
}

const EMPTY: SlotDTO = {
  date: '', startTime: '', endTime: '',
  module: '', groupe: '', enseignant: '', salle: '',
  type: 'COURS', recurrence: 'ONCE',
}

const CreneauModal: React.FC<Props> = ({ initial, onSave, onClose }) => {
  const [form, setForm] = useState<SlotDTO>(initial ?? EMPTY)

  useEffect(() => { setForm(initial ?? EMPTY) }, [initial])

  const set = (k: keyof SlotDTO, v: string) =>
    setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = () => {
    if (!form.date || !form.startTime || !form.endTime || !form.module) return
    onSave(form)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>

        <div className="modal-header">
          <h2>{initial?.id ? 'Modifier le créneau' : 'Nouveau créneau'}</h2>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="modal-body">
          <div className="form-row">
            <label>Date</label>
            <input type="date" value={form.date}
              onChange={e => set('date', e.target.value)} />
          </div>

          <div className="form-row-2">
            <div className="form-row">
              <label>Début</label>
              <input type="time" value={form.startTime}
                onChange={e => set('startTime', e.target.value)} />
            </div>
            <div className="form-row">
              <label>Fin</label>
              <input type="time" value={form.endTime}
                onChange={e => set('endTime', e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <label>Module</label>
            <input type="text" placeholder="ex: Mathématiques Appliquées"
              value={form.module} onChange={e => set('module', e.target.value)} />
          </div>

          <div className="form-row-2">
            <div className="form-row">
              <label>Groupe</label>
              <input type="text" placeholder="ex: G1"
                value={form.groupe} onChange={e => set('groupe', e.target.value)} />
            </div>
            <div className="form-row">
              <label>Salle</label>
              <input type="text" placeholder="ex: Amphi A"
                value={form.salle} onChange={e => set('salle', e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <label>Enseignant</label>
            <input type="text" placeholder="ex: Pr. Alaoui"
              value={form.enseignant} onChange={e => set('enseignant', e.target.value)} />
          </div>

          <div className="form-row-2">
            <div className="form-row">
              <label>Type</label>
              <select value={form.type} onChange={e => set('type', e.target.value as SlotType)}>
                <option value="COURS">Cours</option>
                <option value="TP">TP</option>
                <option value="TD">TD</option>
                <option value="EXAM">Examen</option>
              </select>
            </div>
            <div className="form-row">
              <label>Récurrence</label>
              <select value={form.recurrence} onChange={e => set('recurrence', e.target.value as Recurrence)}>
                <option value="ONCE">Une fois</option>
                <option value="WEEKLY">Hebdomadaire (12 sem.)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Annuler</button>
          <button className="btn-primary" onClick={handleSubmit}>
            {initial?.id ? 'Enregistrer' : 'Créer'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreneauModal