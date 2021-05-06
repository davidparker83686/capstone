import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { itemsService } from '../services/ItemsService'
import { reviewsService } from '../services/ReviewsService'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('/:id/items', this.getItemsByUserID)

      .get('/:id/requests', this.getRequestsByUserId)
      .get('/:id/requests/:id', this.getOneRequestByUserId)
      .use(Auth0Provider.getAuthorizedUserInfo)
  }

  async getItemsByUserID(req, res, next) {
    try {
      const data = await itemsService.getItemsByUserID({ creatorId: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getRequestsByUserId(req, res, next) {
    try {
      const data = await reviewsService.getRequestsByUserId(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getOneRequestByUserId(req, res, next) {
    try {
      const data = await reviewsService.getOneRequestsByUserId(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
