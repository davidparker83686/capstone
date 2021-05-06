import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { itemsService } from '../services/ItemsService'
import { requestsService } from '../services/RequestsService'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('/:id/items', this.getItemsByUserID)
      .get('/:id/requests', this.getRequests)
      // .get('/:id/requests/:id', this.getOneRequest)
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

  async getRequests(req, res, next) {
    try {
      const data = await requestsService.getRequests(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  // async getOneRequest(req, res, next) {
  //   try {
  //     const data = await requestsService.getOneRequests(req.params.id)
  //     res.send(data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}
