import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { itemsService } from '../services/ItemsService'
import { reviewsService } from '../services/ReviewsService'
import { messagesService } from '../services/MessagesService'
// import { requestsService } from '../services/RequestsService'

export class ProfileController extends BaseController {
  constructor() {
    super('api/profile')
    this.router
      .get('/:id/items', this.getItemsByUserId)
      .get('/:id/reviews', this.getReviewsByUserId)
      // .get('/:id/requests', this.getRequestsByUserId)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:to/messages', this.getMessagesById)
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
      const query = {
        $and: [
          { $or: [{ to: req.params.to }, { from: req.params.to }] },
          { $or: [{ to: req.userInfo.id }, { from: req.userInfo.id }] }
        ]

      }

      const data = await messagesService.getMessagesById(query)
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
