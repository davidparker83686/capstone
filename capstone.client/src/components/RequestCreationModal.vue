<template>
  <div>
    <div class="modal "
         id="requestCreationModal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <b>Request an Item</b>
            </h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createRequest">
              <div class="form-group">
                <label for="borrowStartDate"></label>
                <input type="text"
                       class="form-control"
                       id="borrowStartDate"
                       placeholder="Pick Up Date..."
                       minlength="4"
                       maxlength="10"
                       v-model="state.newRequest.borrowStartDate"
                       required
                >
              </div>

              <div class="form-group">
                <label for="borrowEndDate"></label>
                <input type="text"
                       class="form-control"
                       id="borrowEndDate"
                       placeholder="Return Date..."
                       minlength="4"
                       maxlength="10"
                       v-model="state.newRequest.borrowEndDate"
                       required
                >
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                  DISMISS
                </button>
                <button type="submit" class="btn btn-primary">
                  REQUEST
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
import { computed, reactive } from 'vue'
import { requestsService } from '../services/RequestsService'
import $ from 'jquery'
import { AppState } from '../AppState'
export default {
  name: 'RequestCreationModal',
  setup() {
    const state = reactive({
      newRequest: {},
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    return {
      state,
      async createRequest() {
        try {
          state.newRequest.ownerId = AppState.activeItem.creatorId
          // state.newRequest.itemName = AppState.activeItem.title
          state.newRequest.itemId = AppState.activeItem.id
          await requestsService.createRequest(state.newRequest)
          state.newRequest = {}
          $('#requestCreationModal').modal('hide')
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
