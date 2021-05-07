import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { itemsService } from '../services/ItemsService'
import { logger } from '../utils/Logger'

export class ProfileController extends BaseController {
  constructor() {
    super('api/profile')
    this.router
      .get('/:id/items', this.getItemsByUserID)
      .use(Auth0Provider.getAuthorizedUserInfo)
  }

  async getItemsByUserID(req, res, next) {
    try {
      logger.log('getitemsbyuserId log')
      const data = await itemsService.getItemsByUserID({ creatorId: req.params.id })
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
