// import { AppState } from '../AppState'

import { AppState } from '../AppState'
import { api } from './AxiosService'

class MessagesService {
  async getAllMessages(id) {
    const res = await api.get(`api/profile/${id}/messages`)
    AppState.messages = res.data
  }

  async createMessage(message) {
    const res = await api.post('api/messages', message)
    AppState.messages.push(res.data)
  }
}

export const messagesService = new MessagesService()
