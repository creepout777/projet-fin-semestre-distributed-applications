import { apiClient } from '../http/apiClient'
import type { SlotDTO } from './planning.types'

export const planningApi = {

  getByRange: (start: string, end: string) =>
    apiClient.get<SlotDTO[]>('/planning/slots/range', { params: { start, end } }),

  getByDate: (date: string) =>
    apiClient.get<SlotDTO[]>('/planning/slots/date', { params: { date } }),

  getByGroupe: (groupe: string, start: string, end: string) =>
    apiClient.get<SlotDTO[]>(`/planning/slots/groupe/${groupe}`, { params: { start, end } }),

  getByEnseignant: (enseignant: string, start: string, end: string) =>
    apiClient.get<SlotDTO[]>(`/planning/slots/enseignant/${enseignant}`, { params: { start, end } }),

  getById: (id: number) =>
    apiClient.get<SlotDTO>(`/planning/slots/${id}`),

  create: (dto: SlotDTO) =>
    apiClient.post<SlotDTO[]>('/planning/slots', dto),

  update: (id: number, dto: SlotDTO) =>
    apiClient.put<SlotDTO>(`/planning/slots/${id}`, dto),

  delete: (id: number) =>
    apiClient.delete(`/planning/slots/${id}`),
}