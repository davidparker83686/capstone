import { dbContext } from '../db/DbContext'

class ReviewsService {
  async createReview(body) {
    return await dbContext.Reviews.create(body)
  }

  async getReviewsByUserId(id) {
    const data = await dbContext.Reviews.find({ $or: [{ ownerId: id }, { borrowerId: id }] }).populate('creator')
    return data
  }

  async deleteReview(id) {
    const data = await dbContext.Reviews.findOneAndDelete({ _id: id })
    return data
  }
}
export const reviewsService = new ReviewsService()
