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
              Modal title
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createItem">
              <div class="form-group">
                <label for="title"></label>
                <input type="text"
                       class="form-control"
                       id="title"
                       placeholder="Tile..."
                       minlength="3"
                       maxlength="50"
                       v-model="state.newItem.title"
                       required
                >
              </div>
              <div class="form-group">
                <label for="category"></label>
                <input type="text"
                       class="form-control"
                       id="category"
                       placeholder="Category..."
                       minlength="3"
                       maxlength="200"
                       v-model="state.newItem.category"
                       required
                >
              </div>
              <div class="form-group">
                <label for="description"></label>
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
                <label for="picture"></label>
                <input type="text"
                       class="form-control"
                       id="picture"
                       placeholder="Picture..."
                       v-model="state.newItem.picture"
                >
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
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
          console.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style scoped>

</style>
