import { api } from '../../../main/bridge'

declare global {
  interface Window {
    Main: typeof api
    removeLoading: () => void
  }
}
