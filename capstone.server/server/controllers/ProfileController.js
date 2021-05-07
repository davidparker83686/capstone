import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { itemsService } from '../services/ItemsService'
import { reviewsService } from '../services/ReviewsService'
import { messagesService } from '../services/MessagesService'

export class ProfileController extends BaseController {
  constructor() {
    super('api/profile')
    this.router
      .get('/:id/items', this.getItemsByUserID)
      .get('/:id/reviews', this.getReviewsByUserID)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/messages', this.getMessagesById)
  }

  async getItemsByUserID(req, res, next) {
    try {
      const data = await itemsService.getItemsByUserID({ creatorId: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getMessagesById(req, res, next) {
    try {
      const data = await messagesService.getMessagesById(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getReviewsByUserID(req, res, next) {
    try {
      const data = await reviewsService.getReviewsByUserID({ creatorId: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  // async getRequests(req, res, next) {
  //   try {
  //     const data = await requestsService.getRequests(req.query)
  //     res.send(data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  // async getOneRequest(req, res, next) {
  //   try {
  //     const data = await requestsService.getOneRequests(req.params.id)
  //     res.send(data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}
