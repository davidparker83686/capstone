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
    if (editedBio.name == null) {
      editedBio.name = AppState.account.name
      AppState.account.name = editedBio.name
    } else { AppState.account.name = editedBio.name }

    if (editedBio.email == null) {
      editedBio.email = AppState.account.email
      AppState.account.email = editedBio.email
    } else { AppState.account.email = editedBio.email }

    if (editedBio.picture == null) {
      editedBio.picture = AppState.account.picture
      AppState.account.picture = editedBio.picture
    } else { AppState.account.picture = editedBio.picture }

    if (editedBio.bio == null) {
      editedBio.bio = AppState.account.bio
      AppState.account.bio = editedBio.bio
    } else { AppState.account.bio = editedBio.bio }

    const res = await api.put('account', editedBio)
    AppState.account = res.data
    AppState.activeAccount = res.data
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
      bio: AppState.account.bio,
      picture: AppState.account.picture,
      email: AppState.account.email,
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
