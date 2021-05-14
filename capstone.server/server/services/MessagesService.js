import { dbContext } from '../db/DbContext'

class MessagesService {
  async getMessagesById(query) {
    const data = await dbContext.Messages.find(query).populate('creator', 'name picture')
    return data
  }

  async createMessage(body) {
    return await dbContext.Messages.create(body)
  }
}
export const messagesService = new MessagesService()
