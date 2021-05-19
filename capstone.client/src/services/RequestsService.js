import { AppState } from '../AppState'
import { api } from './AxiosService'
import Notification from '../utils/Notification'

class RequestsService {
  async createRequest(newRequest) {
    const res = await api.post('api/requests', newRequest)
    // res.borrowerName = res.creator.name
    AppState.requests.push(res.data)
    Notification.toast('Successfully Created Request', 'success')
    // this.getRequestsByUserId()
  }

  async getRequests(id) {
    const res = await api.get(`account/${id}/requests`)
    AppState.requests = res.data

    const activeRequests = res.data.filter(r => r.pending === false && r.returned === false)

    AppState.activeRequests = activeRequests
    const pendingRequests = res.data.filter(r => r.pending === true)

    AppState.pendingRequests = pendingRequests
    const pastRequests = res.data.filter(r => r.returned === true)
    AppState.pastRequests = pastRequests
  }

  async deleteRequest(request) {
    request.pending = false
    request.accepted = true
    request.returned = true
    request.ownerReviewed = true
    request.borrowerReviewed = true
    request.comment = 'declined'
    const res = await api.put('api/requests/' + request.id, request)
    this.getRequests(res.data.creatorId)

    // await api.delete(`api/Requests/${request.id}`)
    // AppState.requests = AppState.requests.filter(i => i.id !== request.id)
  }

  async accept(request) {
    request.pending = false
    const res = await api.put('api/requests/' + request.id, request)
    this.getRequests(res.data.creatorId)

    // const oldRequest = AppState.pendingRequests.findIndex(i => i.id === request.id)
    // AppState.pendingRequests.splice(oldRequest, 1)
    // AppState.activeRequests.push(res.data)

    // NOTE you can recall the get all fucnction or you could probaly splice the old one out of the appstate and push the new one into the right appstate

    // AppState.activeRequest = [...AppState.activeRequests, res.data]
  }

  async accepted(request) {
    request.accepted = true
    const res = await api.put('api/requests/' + request.id, request)
    this.getRequests(res.data.creatorId)
    // const oldRequest = AppState.requests.findIndex(i => i.id === request.id)
    // AppState.requests[oldRequest] = request
  }

  async returned(request) {
    request.returned = true
    const res = await api.put('api/requests/' + request.id, request)
    this.getRequests(res.data.creatorId)
    // const oldRequest = AppState.requests.findIndex(i => i.id === request.id)
    // AppState.requests[oldRequest] = request
  }

  async reviewedRequest(request) {
    if (request.ownerId === AppState.account.id) {
      request.ownerReviewed = true
    } else {
      request.borrowerReviewed = true
    }
    // const apple = AppState.requests.find(r => r.id === request.id)
    // apple.reviewed = true
    // request.reviewed = true
    await api.put('api/requests/' + request.id, request)
    const oldRequest = AppState.requests.findIndex(r => r.id === request.id)
    AppState.requests[oldRequest] = request
  }

  assignActiveRequest(request) {
    AppState.activeRequest = request
  }
}

export const requestsService = new RequestsService()
