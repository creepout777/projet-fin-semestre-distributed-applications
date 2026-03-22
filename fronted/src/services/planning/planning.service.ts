import { planningApi } from './planning.api'
import type { SlotDTO } from './planning.types'

export const planningService = {

  getWeek: (start: string, end: string) =>
    planningApi.getByRange(start, end).then(r => r.data),

  getDay: (date: string) =>
    planningApi.getByDate(date).then(r => r.data),

  getByGroupe: (groupe: string, start: string, end: string) =>
    planningApi.getByGroupe(groupe, start, end).then(r => r.data),

  getByEnseignant: (enseignant: string, start: string, end: string) =>
    planningApi.getByEnseignant(enseignant, start, end).then(r => r.data),

  create: (dto: SlotDTO) =>
    planningApi.create(dto).then(r => r.data),

  update: (id: number, dto: SlotDTO) =>
    planningApi.update(id, dto).then(r => r.data),

  delete: (id: number) =>
    planningApi.delete(id),
}