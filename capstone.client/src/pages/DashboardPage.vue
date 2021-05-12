<template>
  <div class="dashboard container-fluid bg-danger">
    <div class="row p-2">
      <div class="col-md-12 col-12 card shadow">
        <h3>Open Lends</h3>

        <DashboardComponent v-for="dashboardComponent in state.requests" :key="dashboardComponent.id " :dashboard-component="dashboardComponent" />
      </div>
    </div>
    <div class="row p-2 justify-content-between">
      <div class="col-md-5 col-12 card shadow my-1">
        <h3>Pending Requests</h3>
        <RequestComponent v-for="requestComponent in state.requests" :key="requestComponent.id" :request-prop="requestComponent" />
      </div>
      <div class="col-md-5 col-12 card shadow my-1">
        <h3>Lend History</h3>

        <!-- first thing in our v-for is the name of the component -->
        <DashboardComponent v-for="dashboardComponent in state.requests" :key="dashboardComponent.id " :dashboard-prop="dashboardComponent" />
      </div>
    </div>
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
      requests: computed(() => AppState.requests)
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
    }
  }
}
</script>

<style lang="scss" scoped>
h3{
  font-weight: 900;
}

</style>
