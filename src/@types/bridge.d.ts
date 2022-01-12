import { api } from '../../preload/index';

declare global {
  interface Window {
    Main: typeof api;
  }
}
