// Standard Spring response envelope
export interface ApiResponse<T> {
  data:    T
  message: string
  status:  number
}

export interface PagedResponse<T> {
  content:          T[]
  totalElements:    number
  totalPages:       number
  size:             number
  number:           number  // current page (0-indexed)
}

// Axios error with Spring's error body shape
export interface ApiError {
  status:    number
  message:   string
  errors?:   Record<string, string>  // field-level validation errors
  timestamp: string
  path:      string
}