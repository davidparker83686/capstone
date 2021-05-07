import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { messagesService } from '../services/MessagesService'

export class MessagesController extends BaseController {
  constructor() {
    super('api/messages')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createMessage)
  }

  async createMessage(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const data = await messagesService.createMessage(req.body)

      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
