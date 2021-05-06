import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { itemsService } from '../services/ItemsService'
import { reviewsService } from '../services/ReviewsService'

export class ItemsController extends BaseController {
  constructor() {
    super('api/items')
    this.router
      .get('', this.getAllItems)
      .get('/:id/items', this.getAllItemsByUserID)
      .get('/:id/items/:id', this.getOneItem)

      .get('/:id/requests', this.getRequestsByUserId)
      .get('/:id/requests/:id', this.getOneRequestByUserId)

      .use(Auth0Provider.getAuthorizedUserInfo)

      .delete('/:id', this.deleteItem)
      .put('/:id', this.editItem)
      .post('', this.createItem)
  }

  async getAllItems(req, res, next) {
    try {
      const data = await itemsService.getAllItems(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getAllItemsByUserID(req, res, next) {
    try {
      const data = await itemsService.getAllItemsByUserID(req.params.id)
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

      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const data = await itemsService.deleteItem(req.body)
      res.send(data)
      res.send(req.body)
    } catch (error) {
      next(error)
    }
  }

  async editItem(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(req.body)
    } catch (error) {
      next(error)
    }
  }

  async getRequestsByUserId(req, res, next) {
    try {
      return res.send(['item1', 'item2'])
    } catch (error) {
      next(error)
    }
  }

  async getOneRequestByUserId(req, res, next) {
    try {
      return res.send(['item1', 'item2'])
    } catch (error) {
      next(error)
    }
  }
}
