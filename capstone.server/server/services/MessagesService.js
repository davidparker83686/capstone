import { dbContext } from '../db/DbContext'

class MessagesService {
  async getMessagesById(id) {
    const data = await dbContext.Messages.find({ $or: [{ to: id }, { from: id }] })
    return data
  }

  async createMessage(body) {
    return await dbContext.Messages.create(body)
  }
}
export const messagesService = new MessagesService()
