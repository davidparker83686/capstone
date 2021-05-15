// import { AppState } from '../AppState'

import { AppState } from '../AppState'
import { api } from './AxiosService'

class MessagesService {
  async getAllMessages(id) {
    const res = await api.get(`api/profile/${id}/messages`)

    // AppState.messages = res.data.filter(message => (message.creatorId === id && message.to === AppState.account.id) || (message.creatorId === AppState.account.id && message.to === id))
    // AppState.messages = res.data.filter(message => (message.creatorId === id) || (message.creatorId === AppState.account.id))
    AppState.messages = res.data
  }

  async createMessage(message, id) {
    await api.post('api/messages', message)
    this.getAllMessages(id)
  }
}

export const messagesService = new MessagesService()
