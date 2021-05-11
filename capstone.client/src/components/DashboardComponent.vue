<template>
  <div class="dashboard-component container-fluid">
    <div class="row card">
      <div class="col-md-6 col-12">
        <h4>Item: {{ result.title }}</h4>
      </div>
      <div class="col-md-6 col-12">
        <p>Dates: 00/00/00 - 00/00/00</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 col-6">
        <p>Lender Name: {{ result.category }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 col-12" v-if="state.account.id === result.creatorId">
        <button type="button" class="btn btn-danger" @click="deleteHistoryItem()">
          Delete History Item
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'DashboardComponent',
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    // onMounted(async() => {
    //   await itemsService.getAll(route.query.filter)
    // })
    return { state }
  }
}
</script>

<style lang="scss" scoped>
.profile-img{
  border-radius: 50%;
  cursor: pointer;
}

</style>
