import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { itemsService } from '../services/ItemsService'
import { logger } from '../utils/Logger'

export class ItemsController extends BaseController {
  constructor() {
    super('api/items')
    this.router
      .get('', this.getAllItems)
      .get('/search', this.searchItems)
      .get('/:id', this.getOneItem)
      .use(Auth0Provider.getAuthorizedUserInfo)

      .post('', this.createItem)
      .delete('/:id', this.deleteItem)
      .put('/:id', this.editItem)
  }

  async getAllItems(req, res, next) {
    try {
      const data = await itemsService.getAllItems(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getOneItem(req, res, next) {
    try {
      const data = await itemsService.getOneItem(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async createItem(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const data = await itemsService.createItem(req.body)

      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteItem(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      const data = await itemsService.deleteItem({ _id: req.params.id, creatorId: req.userInfo.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editItem(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const data = await itemsService.editItem(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async searchItems(req, res, next) {
    try {
      logger.log('search!')
      const data = await itemsService.searchItems(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
