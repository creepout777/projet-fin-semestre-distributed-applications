export type Role = 'admin' | 'scolarite' | 'enseignant' | 'etudiant'

export interface User {
  id:        string
  name:      string
  email:     string
  role:      Role
  avatarUrl?: string
}