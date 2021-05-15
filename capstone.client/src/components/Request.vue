<template>
  <div class="request row card shadow mx-3 mt-3 p-3  justify-content-center">
    <div class="col-md-12 col-12">
      <div class="row justify-content-between">
        <h4 v-if="request.itemName">
          {{ request.itemName.title }}
        </h4>
      </div>
      <div class="row">
        <p>
          Lender : {{ request.itemOwner.name.split('@')[0] }}
        </p>
      </div>
      <div class="row" v-if="request.borrowerName">
        <p>Borrower : {{ request.borrowerName.split('@')[0] }}</p>
      </div>
    </div>
    <div class="col-md-12 col-12">
      <div class="row">
        {{ request.borrowStartDate }} - {{ request.borrowEndDate }}
      </div>
    </div>

    <div class="col-12">
      <div class="buttons text-right">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" @click="accept(request)" v-if="request.pending === true && request.returned == false && request.ownerId === state.account.id ">
          accept
        </button>
        <button type="button"
                class="btn btn-danger"
                title="delete"
                aria="delete"
                @click="deleteRequest(request)"
                v-if="request.pending == true && request.returned == false &&request.ownerId === state.account.id"
        >
          decline
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
                class="btn btn-danger"
                v-if="request.pending== false && request.accepted == false && request.returned== false && request.borrowerId===state.account.id "
        >
          accepted
        </button>

        <div v-if="request.pending== false && request.accepted == true && request.returned== false && request.borrowerId===state.account.id ">
          <span class="text-info">You are now using this item.</span>
        </div>

        <!-- <div v-if="request.pending== false && request.accepted == true && request.returned== false && request.ownerId===state.account.id ">
          Now waiting on Item to be returned
        </div> -->

        <button title="returned"
                aria="returned"
                @click="returned(request)"
                type="button"
                class="btn btn-success"
                v-if="request.pending== false && request.accepted == true && request.returned== false && request.ownerId===state.account.id "
        >
          returned
        </button>

        <button title="leaveReview"
                aria="leaveReview"
                data-toggle="modal"
                :data-target="'#reviewCreationModal' + request.id"
                type="button"
                class="btn btn-success"
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
                class="btn btn-success"
                v-if="request.pending == false && request.accepted == true && request.returned == true && request.borrowerReviewed == false && request.borrowerId === state.account.id"
                @click="assignActiveRequest(request)"
        >
          <!-- :data-target="'#exampleModal'+request.id" -->
          Leave a Review
        </button>
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
          await requestsService.accept(request)
          Notification.toast('Successfully Accepted', 'success')
        } catch (error) {
          logger.error(error)
        }
      },
      async accepted(request) {
        try {
          await requestsService.accepted(request)
          Notification.toast('Successfully Received', 'success')
        } catch (error) {
          logger.error(error)
        }
      },
      async returned(request) {
        try {
          await requestsService.returned(request)
          Notification.toast('Successfully Received', 'success')
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
