import { dbContext } from '../db/DbContext'
// import { badRequest } from '../utils/Errors'

class RequestsService {
  async create(body) {
    return await dbContext.Requests.create(body)
  }
}

export const requestsService = new RequestsService()
