import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
      AppState.loading = false
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editBio(editedBio) {
    const res = await api.put('api/accounts/' + editedBio.accountId, editedBio)
    if (res.name == null) {
      res.name = AppState.account.name
      AppState.account.name = res.name
    } else { AppState.account.name = res.name }

    if (res.email == null) {
      res.email = AppState.account.email
      AppState.account.email = res.email
    } else { AppState.account.email = res.email }

    if (res.picture == null) {
      res.picture = AppState.account.picture
      AppState.account.picture = res.picture
    } else { AppState.account.picture = res.picture }

    if (res.bio == null) {
      res.bio = AppState.account.bio
      AppState.account.bio = res.bio
    } else { AppState.account.bio = res.bio }

    AppState.account = res.data
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
  }

  async getActive(id) {
    const res = await api.get(`api/profile/${id}/active`)

    AppState.activeAccount = res.data
  }
}

export const accountService = new AccountService()
