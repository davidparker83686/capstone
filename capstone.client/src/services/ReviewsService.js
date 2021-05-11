import { AppState } from '../AppState'
// import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ReviewsService {
  async createReview(newReview) {
    const res = await api.post('api/reviews', newReview)
    AppState.reviews.push(res.data)
    // this.getReviewsByUserId()
  }

  async getReviewsByUserId(id) {
    const res = await api.get(`api/profile/${id}/reviews`)
    AppState.reviews = res.data
  }

  async deleteReview(id) {
    await api.delete(`api/reviews/${id}`)
    AppState.reviews = AppState.reviews.filter(i => i.id !== id)
    this.getAll()
  }
}

export const reviewsService = new ReviewsService()
