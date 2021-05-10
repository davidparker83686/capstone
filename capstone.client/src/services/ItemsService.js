import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ItemsService {
  async getAll(query) {
    const res = await api.get('api/items')
    AppState.items = res.data.filter(item => item.category === query)
    logger.log(AppState.items)
  }

  async getItemsByUserId(id) {
    const res = await api.get(`api/profile/${id}/items`)
    AppState.items = res.data
  }

  async deleteItem(id) {
    await api.delete(`api/items/${id}`)
    AppState.items = AppState.items.filter(i => i.id !== id)
    this.getAll()
  }
}

export const itemsService = new ItemsService()
