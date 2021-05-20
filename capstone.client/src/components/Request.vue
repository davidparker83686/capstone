<template>
  <div class="request row mx-o  mt-3 p-3  justify-content-center">
    <div class="col-md-12 col-12">
      <div class="row">
        <div>
          <h4 class="d-inline" v-if="request.itemName">
            {{ request.itemName.title }}
          </h4>
          <span class=" pl-3 d-inline">
            {{ request.borrowStartDate }} - {{ request.borrowEndDate }}
          </span>
        </div>

        <h4 class="text-danger pl-3" v-if="request.comment">
          {{ request.comment }}
        </h4>
      </div>
      <div class="row">
        <p class="pt-3">
          Lender : {{ request.itemOwner.name.split('@')[0] }}
        </p>
      </div>
      <div class="row justify-content-between border-bottom" v-if="request.borrowerName">
        <div class="col-md-5 p-0">
          <p class="p-0">
            Borrower : {{ request.borrowerName.split('@')[0] }}
          </p>
        </div>

        <div class="col-md-3 px-0 ">
          <div class="buttons text-right ">
            <!-- Button trigger modal -->

            <router-link :to="{name: 'Profile', params: {id: request.creatorId}}">
              <button type="button" class="btn p-1 mb-1 mr-2 btn-success" v-if="request.returned == false &&request.ownerId === state.account.id">
                Message
              </button>
            </router-link>

            <!-- idk how to make this one so that it will make the profile the item creator -->
            <router-link :to="{name: 'Profile', params: {id: request.ownerId}}">
              <button type="button" class="btn p-1 mb-1 mr-2 btn-success" v-if="request.returned == false &&request.ownerId !== state.account.id">
                Message
              </button>
            </router-link>

            <button type="button" class="btn btn-primary" @click="accept(request)" v-if="request.pending === true && request.returned == false && request.ownerId === state.account.id ">
              Accept
            </button>
            <button type="button"
                    class="btn btn-danger mb-2"
                    title="delete"
                    aria="delete"
                    @click="deleteRequest(request)"
                    v-if="request.pending == true && request.returned == false &&request.ownerId === state.account.id"
            >
              Decline
            </button>
            <div v-if="request.pending === true && request.returned == false && request.borrowerId === state.account.id">
              <span>
                currently pending
              </span>
            </div>
            <button title="accepted"
                    aria="accepted"
                    @click="accepted(request)"
                    type="button"
                    class="btn btn-danger mb-2"
                    v-if="request.pending== false && request.accepted == false && request.returned== false && request.borrowerId===state.account.id "
            >
              Accepted
            </button>

            <div v-if="request.pending== false && request.accepted == true && request.returned== false && request.borrowerId===state.account.id ">
              <span class="text-primary">You are now in possession of this item.</span>
            </div>

            <button title="returned"
                    aria="returned"
                    @click="returned(request)"
                    type="button"
                    class="btn btn-success mb-2"
                    v-if="request.pending== false && request.accepted == true && request.returned== false && request.ownerId===state.account.id "
            >
              Returned
            </button>

            <button title="leaveReview"
                    aria="leaveReview"
                    data-toggle="modal"
                    :data-target="'#reviewCreationModal' + request.id"
                    type="button"
                    class="btn btn-success mb-2"
                    v-if="request.pending == false && request.accepted == true && request.returned == true && request.ownerReviewed == false && request.ownerId === state.account.id"
                    @click="assignActiveRequest(request)"
            >
              <!-- :data-target="'#exampleModal'+request.id" -->
              Leave a Review
            </button>

            <button title="leaveReview"
                    aria="leaveReview"
                    data-toggle="modal"
                    :data-target="'#reviewCreationModal' + request.id"
                    type="button"
                    class="btn btn-success mb-2"
                    v-if="request.pending == false && request.accepted == true && request.returned == true && request.borrowerReviewed == false && request.borrowerId === state.account.id"
                    @click="assignActiveRequest(request)"
            >
              <!-- :data-target="'#exampleModal'+request.id" -->
              Leave a Review
            </button>
          </div>
        </div>
      </div>
    </div>

    <review-creation-modal :request-prop="request" />
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { requestsService } from '../services/RequestsService'
import { logger } from '../utils/Logger'
import Notification from '../utils/Notification'
// import { requestsService } from '../services/RequestsService'

export default {
  // our name must match the name of the file
  name: 'Request',
  props: {
    request: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      requests: computed(() => AppState.requests)
    })
    return {
      state,
      async deleteRequest(request) {
        try {
          if (await Notification.confirmAction('Are you sure you want to decline this request?', 'You won\'t be able to revert this.', 'warning', 'Yes, Decline')) {
            await requestsService.deleteRequest(request)
            Notification.toast('Successfully Declined Request', 'success')
          }
        } catch (error) {
          logger.error(error)
        }
      },
      async accept(request) {
        try {
          if (await Notification.confirmAction('Are you sure you want to accept this request to borrow?', 'Hit accept to proceed', '', 'Accept')) { await requestsService.accept(request) }
          Notification.toast('Successfully Accepted', 'success')
        } catch (error) {
          logger.error(error)
        }
      },
      async accepted(request) {
        try {
          if (await Notification.confirmAction('Make sure you have the requested property and its in its described condition.', 'If not, do not accept said property.', '', 'Move Foward')) {
            await requestsService.accepted(request)
            Notification.toast('Successfully Received', 'success')
          }
        } catch (error) {
          logger.error(error)
        }
      },
      async returned(request) {
        try {
          if (await Notification.confirmAction('Make sure the property has been returned to you.', 'If recieved hit Complete Lend', '', 'Complete Lend')) {
            await requestsService.returned(request)
            Notification.toast('Successfully Received', 'success')
          }
        } catch (error) {
          logger.error(error)
        }
      },
      async assignActiveRequest(request) {
        try {
          await requestsService.assignActiveRequest(request)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-img{
  border-radius: 50%;
  cursor: pointer;
}

</style>
