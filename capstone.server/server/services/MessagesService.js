import { dbContext } from '../db/DbContext'

class MessagesService {
  async getMessagesById(user, to) {
    const data = await dbContext.Messages.find({
      $and: [
        { $or: [{ to: to }, { from: to }] },
        { $or: [{ to: user }, { from: user }] }
      ]
    }).populate('creator', 'name picture')
    return data
  }

  async createMessage(body) {
    return await dbContext.Messages.create(body)
  }
}
export const messagesService = new MessagesService()
