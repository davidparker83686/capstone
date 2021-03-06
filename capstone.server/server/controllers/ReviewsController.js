import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { reviewsService } from '../services/ReviewsService'

export class ReviewsController extends BaseController {
  constructor() {
    super('api/reviews')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createReview)
      .delete('/:id', this.deleteReview)
  }

  async createReview(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = await reviewsService.createReview(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteReview(req, res, next) {
    try {
      const data = await reviewsService.deleteReview({ _id: req.params.id, creatorId: req.userInfo.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
