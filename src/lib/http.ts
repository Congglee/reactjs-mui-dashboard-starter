import { envConfig } from '@/config/environment'
import axios, { type AxiosInstance } from 'axios'

export class Http {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: envConfig.baseUrl,
      timeout: 1000 * 60 * 10, // 10 minutes
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    })
  }
}

const http = new Http().instance

export default http
