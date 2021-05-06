import BaseController from '../utils/BaseController'
import { requestsService } from '../services/RequestsService'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { logger } from '../utils/Logger'

export class RequestsController extends BaseController {
  constructor() {
    super('api/requests')
    this.router

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createRequest)
      .delete('/:id', this.deleteRequest)
      .put('/:id', this.editRequest)
  }

  async createRequest(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.creatorId
      await requestsService.createRequest(req.body)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteRequest(req, res, next) {
    try {
      const data = await requestsService.deleteRequest({ _id: req.params.id, creatorId: req.userInfo.id })
      res.send(data)
    } catch (error) {
      logger.error(error)
    }
  }

  async editRequest(req, res, next) {
    try {
      const data = await requestsService.editRequest(req.body)
      res.send(data)
    } catch (error) {
      logger.error(error)
    }
  }
}
