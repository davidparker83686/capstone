<template>
  <div class="dashboard container-fluid bg-danger">
    <div class="row justify-content-center  p-3 p-md-5">
      <div class="col-md-12 col-12 p-0 card shadow">
        <h3 class="card-heading pl-5 pt-3 m-0">
          Open Lends
        </h3>
        <div class="card-body">
          <Request v-for="request in state.activeRequests" :key="request.id " :request="request" />
        </div>
      </div>
    </div>

    <div class="row px-md-5 mb-5 between-to-center">
      <div class="col-md-5 col-11 card  shadow p-3 p-md-5">
        <h3>Pending Requests</h3>
        <!-- <PendingRequest v-for="pendingrequest in state.requests" :key="pendingrequest.id" :pendingrequest="pendingrequest" /> -->
        <Request v-for="request in state.pendingRequests" :key="request.id " :request="request" />
      </div>
      <div class="col-md-5 col-11 card p-3 m-0 shadow">
        <h3>Lend History</h3>
        <!-- first thing in our v-for is the name of the component -->
        <!-- <div v-if="{{ request.returned=== true }}"> -->
        <Request v-for="request in state.pastRequests" :key="request.id " :request="request" />
      </div>
    </div>
    <!-- {{ getPendingRequests() }}
    {{ getPastRequests() }} -->
  </div>
</template>

<script>

import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { itemsService } from '../services/ItemsService'
import { requestsService } from '../services/RequestsService'
import { logger } from '../utils/Logger'

export default {
  name: 'Dashboard',
  setup() {
    const route = useRoute()
    const state = reactive({
      items: computed(() => AppState.items),
      reviews: computed(() => AppState.reviews),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      requests: computed(() => AppState.requests),
      activeRequests: computed(() => AppState.activeRequests),
      pendingRequests: computed(() => AppState.pendingRequests),
      pastRequests: computed(() => AppState.pastRequests)
    })
    onMounted(async() => {
      try {
        await itemsService.getItemsByUserId(route.params.id)
        await requestsService.getRequests(route.params.id)
        // await reviewsService.getReviewsByUserId(route.params.id)
        // await reviewsService.getReviewsByUserId(route.params.id)
      } catch (error) {
        logger.log(error)
      }
    })

    return {
      state,
      route
      // getPendingRequests(id) {
      //   requestsService.getRequests(id)
      //   this.getRequests(id)
      //   const pendingRequests = state.requests.filter(r => r.pending === true)
      //   logger.log(pendingRequests)
      //   state.pendingRequests = pendingRequests
      // },
      // getPastRequests(id) {
      //   requestsService.getRequests(id)
      //   this.getRequests(id)
      //   const pastRequests = state.requests.filter(r => r.returned === true)
      //   state.pastRequests = pastRequests
      //   logger.log(state.pastRequests)
      // }

    }
  }
}
</script>

<style lang="scss" scoped>
h3{
  font-weight: 900;
}
.between-to-center{
  justify-content: space-between;
}
@media screen and (max-width:760px){
.between-to-center{
  justify-content: center;
}
}

</style>
