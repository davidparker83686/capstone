<template>
  <div class="dashboard container-fluid bg-danger">
    <div class="row p-2">
      <div class="col-md-12 col-12 card shadow">
        <h3><u>Open Lends</u></h3>
        <DashboardComponent v-for="result in state.items" :result="result" :key="result.id" />
      </div>
    </div>
    <div class="row p-2 justify-content-between">
      <div class="col-md-5 col-12 card shadow my-1">
        <h3><u>Pending Requests</u></h3>
        <RequestComponent v-for="result in state.items" :result="result" :key="result.id" />
      </div>
      <div class="col-md-5 col-12 card shadow my-1">
        <h3><u>Lend History</u></h3>
        <DashboardComponent v-for="result in state.items" :result="result" :key="result.id" />
      </div>
    </div>
  </div>
</template>

<script>

import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { itemsService } from '../services/ItemsService'
import { logger } from '../utils/Logger'

export default {
  name: 'Dashboard',
  setup() {
    const route = useRoute()
    const state = reactive({
      items: computed(() => AppState.items),
      reviews: computed(() => AppState.reviews),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })
    onMounted(async() => {
      try {
        await itemsService.getItemsByUserId(route.params.id)
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
