import { AppState } from '../AppState'
import { api } from './AxiosService'

class ReviewsService {
  async createReview(newReview) {
    const res = await api.post('api/reviews', newReview)
    AppState.reviews.push(res.data)
    // this.getReviewsByUserId()
  }

  async getReviewsByUserId(id) {
    const res = await api.get(`api/profile/${id}/reviews`)

    // res.data.filter(r => r.creatorId !== AppState.account.id)
    // res.data.filter(r => r.creatorId !== AppState.account.id)

    AppState.reviews = res.data

    // we need to find the reviews where we were teh borrower or lender BUT where we went the creator
    // AppState.reviews.filter(i => i.creator.id !== state.account.id)
    AppState.reviews = res.data
  }

  async getUserReviewScore(id) {
    const res = await api.get(`api/profile/${id}/reviews`)
    AppState.reviews = res.data
    const totalReviews = AppState.reviews.length
    const sumOfReviews = 0
    AppState.reviews.forEach(r => sumOfReviews + r.rating)
    const userRating = sumOfReviews / totalReviews
    return userRating
  }

  async deleteReview(id) {
    await api.delete(`api/reviews/${id}`)
    AppState.reviews = AppState.reviews.filter(i => i.id !== id)
  }
}

export const reviewsService = new ReviewsService()
