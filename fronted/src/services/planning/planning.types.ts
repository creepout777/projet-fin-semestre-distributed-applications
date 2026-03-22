export type SlotType = 'COURS' | 'TP' | 'TD' | 'EXAM'
export type Recurrence = 'ONCE' | 'WEEKLY'

export interface SlotDTO {
  id?:          number
  date:         string       // ISO: "2026-03-20"
  startTime:    string       // "08:30"
  endTime:      string       // "10:20"
  module:       string
  groupe:       string
  enseignant:   string
  salle:        string
  type:         SlotType
  recurrence:   Recurrence
}

export interface SlotFilter {
  start:        string
  end:          string
  groupe?:      string
  enseignant?:  string
}