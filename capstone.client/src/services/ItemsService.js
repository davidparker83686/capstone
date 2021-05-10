import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ItemsService {
  async getAll(query) {
    const res = await api.get('api/items')
    AppState.items = res.data.filter(item => item.category === query)
    logger.log(AppState.items)
  }
}

export const itemsService = new ItemsService()
