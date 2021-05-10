import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ItemsService {
  async createItem(newItem) {
    const res = await api.post('api/items', newItem)
    AppState.items.push(res.data)
    // this.getItemsByUserId()
  }

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

  async toggleAvailability(item) {
    if (item.availability === true) {
      item.availability = false
    } else if (item.availability === false) {
      item.availability = true
    }
    const res = await api.put('api/items/' + item.id, item)
    const oldItem = AppState.items.findIndex(i => i.id === item.id)
    AppState.items[oldItem] = item

    logger.log(res.data)
  }
}

export const itemsService = new ItemsService()
