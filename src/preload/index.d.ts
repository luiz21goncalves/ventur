import { api } from '.'

declare global {
  export interface Window {
    api: typeof api
  }
}
