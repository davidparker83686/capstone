import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editBio(editedBio) {
    const res = await api.put('api/accounts/' + editedBio.accountId, editedBio)
    AppState.account.bio = res.data
  }

  async getLocation() {
    const location = async function() {
      return await new Promise((resolve, reject) => {
        try {
          navigator.geolocation.getCurrentPosition(x => { resolve(x) })
        } catch (error) {
          reject(error)
        }
      })
    }
    AppState.location = await location()
    const request = {
      name: AppState.account.name,
      location: {
        coordinates: [AppState.location.coords.longitude, AppState.location.coords.latitude]
      }
    }
    const res = await api.put('account', request)
    AppState.account = res.data
    logger.log(AppState.account.location)
  }

  async getActive(id) {
    const res = await api.get(`api/profile/${id}`)
    AppState.activeAccount = res.data
  }
}

export const accountService = new AccountService()
