import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { messagesService } from '../services/MessagesService'

export class MessagesController extends BaseController {
  constructor() {
    super('api/messages')
    this.router
      .get('', this.getAllMessages)
      .get('/:id', this.getOneMessage)
      .use(Auth0Provider.getAuthorizedUserInfo)

      .post('', this.createMessage)
      .delete('/:id', this.deleteMessage)
      .put('/:id', this.editMessage)
  }

  async getAllMessages(req, res, next) {
    try {
      const data = await messagesService.getAllMessages(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getOneMessage(req, res, next) {
    try {
      const data = await messagesService.getOneMessage(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
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

  async deleteMessage(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      const data = await messagesService.deleteMessage({ _id: req.params.id, creatorId: req.userInfo.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editMessage(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const data = await messagesService.editMessage(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
