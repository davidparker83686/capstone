import BaseController from '../utils/BaseController'
import { requestsService } from '../services/RequestsService'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { logger } from '../utils/Logger'

export class RequestsController extends BaseController {
  constructor() {
    super('api/requests')
    this.router
      // .get('', this.getRequests)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createRequest)
      .delete('/:id', this.deleteRequest)
      .put('/:id', this.editRequest)
  }

  async createRequest(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.borrowerId = req.userInfo.id

      const data = await requestsService.createRequest(req.body)
      res.send(data)
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
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const data = await requestsService.editRequest(req.body)
      res.send(data)
    } catch (error) {
      logger.error(error)
    }
  }

  // delete this after testing
  // async getRequests(req, res, next) {
  //   try {
  //     const data = await requestsService.getRequests()
  //     res.send(data)
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}
