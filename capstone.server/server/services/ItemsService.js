import { dbContext } from '../db/DbContext'
// import { BadRequest } from '../utils/Errors'

class ItemsService {
  async getAllItems(query = {}) {
    const data = await dbContext.Items.find(query)
    return data
  }

  async getOneItem(id) {
    const data = await dbContext.Items.findOne({ _id: id })
    return data
  }

  async createItem(body) {
    await dbContext.Items.create(body)
  }

  async deleteItem(id) {
    const data = await dbContext.Items.findOneAndDelete({ _id: id })
    return data
  }
}
export const itemsService = new ItemsService()
