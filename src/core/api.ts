import axios from 'axios'
import { config } from './config'

export const api = axios.create({
  headers: {
    'x-api-key': config.apiKey,
  },
})
