<template>
  <div class="dashboard-component container-fluid card shadow my-2">
    <div class="row m-2">
      <div class="col-md-6 col-12">
        <div class="row">
          <h4>Item: YOUR ITEM's TITLE HERE</h4>
        </div>
        <div class="row">
          <p>Lender Name: {{ request.ownerId }}</p>
        </div>
        <div class="row">
          <p>Borrower Name: {{ request.borrowerId }}</p>
        </div>
      </div>
      <div class="col-md-6 col-12">
        <div class="row">
          <p>Dates: {{ request.borrowStartDate }} - {{ request.borrowEndDate }}</p>
        </div>
        <div class="row">
          <button type="button" class="btn btn-danger" @click="deleteHistoryItem()">
            Delete History Item
          </button>
        </div>
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
    request: {
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
