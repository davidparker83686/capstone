import { dbContext } from '../db/DbContext'
// import { badRequest } from '../utils/Errors'

class RequestsService {
  async createRequest(body) {
    return await dbContext.Requests.create(body)
  }

  async deleteRequest(id) {
    const data = await dbContext.Requests.findOneAndDelete({ _id: id })
    return data
  }

  async editRequest(body) {
    const data = await dbContext.Requests.findOneAndUpdate({ _id: body.id }, body, { new: true })
    return data
  }

  async getRequests(id) {
    const data = await dbContext.Requests.find({ $or: [{ ownerId: id }, { borrowerId: id }] }).populate('creator').populate('itemOwner').populate('itemName')
    return data
  }

  // async getOneRequest(id, id2) {
  //   const data = await dbContext.Requests.findOne({ _id: id, id2 }).populate('creator')
  //   return data
  // }
}

export const requestsService = new RequestsService()
