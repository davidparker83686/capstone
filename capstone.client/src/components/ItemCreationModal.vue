<template>
  <div>
    <div class="modal "
         id="itemCreationModal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              CREATE A LISTING
            </h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createItem">
              <div class="form-group">
                <label for="title">Name of Item</label>
                <input type="text"
                       class="form-control"
                       id="title"
                       placeholder="Title..."
                       minlength="3"
                       maxlength="50"
                       v-model="state.newItem.title"
                       required
                >
                <div class="form-group mt-3">
                  <label for="categorySelect" class="mb-0 pt-3 d-none d-md-block">Categories</label>
                  <select class="form-control" id="categorySelect" v-model="state.newItem.category" required>
                    <option value="" disabled>
                      --Select Category--
                    </option>
                    <option>Hunting</option>
                    <option>Fishing</option>
                    <option>Boating</option>
                    <option>Camping</option>
                    <option>Recreational Sports</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <input type="text"
                       class="form-control"
                       id="description"
                       placeholder="Description..."
                       minlength="3"
                       maxlength="200"
                       v-model="state.newItem.description"
                       required
                >
              </div>
              <div class="form-group">
                <label for="picture">Picture</label>
                <input type="text"
                       class="form-control"
                       id="picture"
                       placeholder="Picture..."
                       v-model="state.newItem.picture"
                >
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">
                  Dismiss
                </button>
                <button type="submit" class="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { itemsService } from '../services/ItemsService'
import $ from 'jquery'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import { logger } from '../utils/Logger'

export default {
  name: 'ItemCreationModal',
  setup() {
    const state = reactive({
      newItem: {},
      account: computed(() => AppState.account)
    })
    return {
      state,
      async createItem() {
        try {
          if (!state.account.location) {
            const confirm = window.confirm('Do you want our application to have access to your Location? To create a new item you must share your location')
            if (confirm) {
              await accountService.getLocation()
            } else {
              $('#itemCreationModal').modal('hide')
            }
          } else {
            await itemsService.createItem(state.newItem)
            state.newItem = {}
            $('#itemCreationModal').modal('hide')
          }
        } catch (error) {
          logger.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style scoped>

</style>
