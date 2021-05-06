import BaseController from '../utils/BaseController'
import { requestsService } from '../services/RequestsService'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { logger } from '../utils/Logger'

export class RequestsController extends BaseController {
  constructor() {
    super('api/requests')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.creatorId
      const data = await requestsService.create(req.body)
      return res.send(data)
    } catch (error) {
      logger.error(error)
    }
  }
}
