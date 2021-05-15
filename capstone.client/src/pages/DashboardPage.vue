<template>
  <div class="dashboard container-fluid background-img ">
    <div class="row justify-content-center  p-3 p-md-5">
      <div class="col-md-12 col-12 p-0 card bg-secondary scroll shadow">
        <h3 class=" dark-green-text pl-4 pt-3 m-0">
          Open Lends
        </h3>
        <div class="card-body">
          <Request v-for="request in state.activeRequests" :key="request.id " :request="request" />
        </div>
      </div>
    </div>

    <div class="row px-md-5 pb-5 between-to-center">
      <div class="col-md-5 col-11 card bg-secondary m-2 scroll shadow ">
        <div class=" dark-green-text p-3">
          <h3>Pending Requests</h3>
        </div>
        <div class="card-body">
          <Request v-for="request in state.pendingRequests" :key="request.id " :request="request" />
        </div>
        <!-- <PendingRequest v-for="pendingrequest in state.requests" :key="pendingrequest.id" :pendingrequest="pendingrequest" /> -->
      </div>
      <div class="col-md-5 col-11 card  bg-secondary  m-2 scroll  shadow">
        <div class=" dark-green-text p-3">
          <h3>Lend History</h3>
        </div>
        <div class="card-body">
          <Request v-for="request in state.pastRequests" :key="request.id " :request="request" />
        </div>
        <!-- first thing in our v-for is the name of the component -->
        <!-- <div v-if="{{ request.returned=== true }}"> -->
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
        logger.error(error)
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

.scroll{
    overflow-y: scroll;
    // overflow-:auto;
    // flex-wrap: nowrap;
    max-height: 25vw;// display: inline-block;
}
@media screen and (max-width:760px){
  .scroll{
    overflow-y: scroll;
    max-height: 85vw;// display: inline-block;
  }
}
.background-img{
  background-image: url('../assets/img/Untitled.jpg');
  background-size: cover;
}

</style>
