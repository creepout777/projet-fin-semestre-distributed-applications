// Matches LoginRequest.java exactly
export interface LoginRequestDTO {
  email:    string
  password: string
}

// Matches JwtResponse.java exactly
// Fields: token, refreshToken, id, email, roles (NOT accessToken)
export interface AuthResponseDTO {
  token:        string   // JWT access token
  refreshToken: string   // refresh token string
  id:           string
  email:        string
  roles:        string[] // e.g. ["ROLE_ADMIN"] or ["ADMIN"]
}

// Matches TokenRefreshRequest.java
export interface TokenRefreshRequestDTO {
  refreshToken: string
}

// Matches TokenRefreshResponse.java
export interface TokenRefreshResponseDTO {
  accessToken:  string
  refreshToken: string
}