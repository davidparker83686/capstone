import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
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

    const activeRequests = res.data.filter(r => r.pending === false && r.returned === false)
    logger.log(activeRequests)
    AppState.activeRequests = activeRequests
    const pendingRequests = res.data.filter(r => r.pending === true)
    logger.log(pendingRequests)
    AppState.pendingRequests = pendingRequests
    const pastRequests = res.data.filter(r => r.returned === true)
    AppState.pastRequests = pastRequests
  }

  async deleteRequest(request) {
    await api.delete(`api/Requests/${request.id}`)
    AppState.requests = AppState.requests.filter(i => i.id !== request.id)
    // this.getRequests(requesid)
  }

  async accept(request) {
    request.pending = false
    const res = await api.put('api/requests/' + request.id, request)
    const oldRequest = AppState.requests.findIndex(i => i.id === request.id)
    AppState.requests[oldRequest] = request

    logger.log(res.data)
  }

  async accepted(request) {
    request.accepted = true
    const res = await api.put('api/requests/' + request.id, request)
    const oldRequest = AppState.requests.findIndex(i => i.id === request.id)
    AppState.requests[oldRequest] = request

    logger.log(res.data)
  }

  async returned(request) {
    request.returned = true
    const res = await api.put('api/requests/' + request.id, request)
    const oldRequest = AppState.requests.findIndex(i => i.id === request.id)
    AppState.requests[oldRequest] = request

    logger.log(res.data)
  }
}

export const requestsService = new RequestsService()
