import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { logger } from '../utils/Logger'
import { reviewsService } from '../services/ReviewsService'

export class ReviewsController extends BaseController {
  constructor() {
    super('api/reviews')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createReview)
      .delete('', this.deleteReview)
  }

  async createReview(req, res, next) {
    try {
      await reviewsService.createReview(req.body)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteReview(req, res, next) {
    try {
      const data = await reviewsService.deleteReview({ _id: req.params.id, creatorId: req.userInfo.id })
      return res.send(data)
    } catch (error) {
      logger.error(error)
    }
  }
}
