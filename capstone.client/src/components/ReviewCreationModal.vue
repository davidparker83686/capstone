<template>
  <div>
    <div class="modal "
         :id="'reviewCreationModal' + requestProp.id"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
    >
      <!-- :id="'exampleModal'+request.id" -->
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Review
            </h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createReview">
              <div class="form-group">
                <label for="title"></label>
                <input type="text"
                       class="form-control"
                       id="title"
                       placeholder="Tile..."
                       minlength="3"
                       maxlength="50"
                       v-model="state.newReview.title"
                       required
                >
                <div class="form-group mt-3">
                  <label for="rating" class="mb-0 pt-3 d-none d-md-block">Rating</label>
                  <select class="form-control" id="rating" v-model="state.newReview.rating" required>
                    <option value="" disabled>
                      --Rate Your Experience--
                    </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="body"></label>
                <input type="text"
                       class="form-control"
                       id="body"
                       placeholder="Body..."
                       minlength="3"
                       maxlength="200"
                       v-model="state.newReview.body"
                       required
                >
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                  Dismiss
                </button>
                <button type="submit" class="btn btn-primary" @click="reviewedRequest()">
                  Create
                </button>
                <!-- <button type="submit" class="btn btn-primary">
                  Create
                </button> -->
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
import { reviewsService } from '../services/ReviewsService'
import { requestsService } from '../services/RequestsService'
import $ from 'jquery'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

export default {
  name: 'ReviewCreationModal',
  props: {
    requestProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      newReview: {},
      account: computed(() => AppState.account)
    })
    return {
      state,
      async reviewedRequest() {
        try {
          await requestsService.reviewedRequest(props.requestProp)
        } catch (error) {
          logger.error(error)
        }
      },
      async createReview() {
        state.newReview.ownerId = AppState.activeRequest.creatorId
        // state.newReview.itemName = AppState.activeRequest.title
        state.newReview.borrowerId = AppState.activeRequest.borrowerId
        try {
          await reviewsService.createReview(state.newReview)
          state.newReview = {}
          $('#reviewCreationModal').modal('hide')
          // $('#reviewCreationModal' + request.id).modal('hide')
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
