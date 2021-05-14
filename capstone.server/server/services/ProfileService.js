import { dbContext } from '../db/DbContext'

class ProfileService {
  async getProfile(id) {
    const data = dbContext.Account.findOne({ _id: id })
    return data
  }
}

export const profileService = new ProfileService()
