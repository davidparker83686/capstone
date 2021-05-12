import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { requestsService } from '../services/RequestsService'
import { logger } from '../utils/Logger'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/requests', this.getRequests)
      .get('', this.getUserAccount)
      .put('', this.edit)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getRequests(req, res, next) {
    try {
      const data = await requestsService.getRequests(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      logger.log(req.body)
      req.body.location = { coordinates: [req.body.location.coords.longitude, req.body.location.coords.lattitude] }
      const data = await accountService.updateAccount(req.userInfo, req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
