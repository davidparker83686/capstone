import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { itemsService } from '../services/ItemsService'
import { reviewsService } from '../services/ReviewsService'
import { messagesService } from '../services/MessagesService'

export class ProfileController extends BaseController {
  constructor() {
    super('api/profile')
    this.router
      .get('/:id/items', this.getItemsByUserId)
      .get('/:id/reviews', this.getReviewsByUserId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/messages', this.getMessagesById)
  }

  async getItemsByUserId(req, res, next) {
    try {
      const data = await itemsService.getItemsByUserId({ creatorId: req.params.id })
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

  async getReviewsByUserId(req, res, next) {
    try {
      const data = await reviewsService.getReviewsByUserId({ creatorId: req.params.id })
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
