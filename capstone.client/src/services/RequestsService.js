import { AppState } from '../AppState'
// import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class RequestsService {
  async createRequest(newRequest) {
    const res = await api.post('api/requests', newRequest)
    AppState.requests.push(res.data)
    // this.getRequestsByUserId()
  }

  async getRequests(id) {
    const res = await api.get(`account/${id}/requests`)
    AppState.requests = res.data
  }

  async deleteRequest(id) {
    await api.delete(`api/Requests/${id}`)
    AppState.requests = AppState.requests.filter(i => i.id !== id)
  }
}

export const requestsService = new RequestsService()
