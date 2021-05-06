import { dbContext } from '../db/DbContext'
// import { badRequest } from '../utils/Errors'

class RequestsService {
  async createRequest(body) {
    await dbContext.Requests.create(body)
  }

  async deleteRequest(id) {
    const data = await dbContext.Requests.findOneAndDelete({ _id: id })
    return data
  }

  async editRequest(body) {
    const data = await dbContext.Requests.findOneAndUpdate({ _id: body.id }, body, { new: true })
    return data
  }

  async getRequests(accountid) {
    const data1 = await dbContext.Requests.find(borrowerid)
    const data2 = await dbContext.Requests.find(borrowerid)
    return data1 + data2
  }

  // async getOneRequest(id, id2) {
  //   const data = await dbContext.Requests.findOne({ _id: id, id2 }).populate('creator')
  //   return data
  // }
}

export const requestsService = new RequestsService()
