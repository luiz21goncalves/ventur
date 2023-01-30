import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://brasilapi.com.br/api',
})
