import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { logger } from '../utils/Logger'
import { reviewsService } from '../services/ReviewsService'

export class ReviewsController extends BaseController {
  constructor() {
    super('api/reviews')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async create(req, res, next) {
    try {
      await reviewsService.create(req.body)
    } catch (error) {
      logger.error(error)
    }
  }
}
