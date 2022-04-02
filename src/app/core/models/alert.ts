export interface Alert {
  type?: 'info' | 'danger' | 'success' | 'warning'
  message?: string
  title?: string
  id?: string
}
