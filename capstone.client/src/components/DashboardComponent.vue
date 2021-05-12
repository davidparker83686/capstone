<template>
  <div class="dashboardcomponent row card shadow my-2">
    <div class=" m-2">
      <div class="col-md-6 col-12">
        <div class="row">
          <h4>Item: YOUR ITEM's TITLE HERE</h4>
        </div>
        <div class="row">
          <p>Lender Name: {{ dashboardProp.ownerId }}</p>
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
  // our name must match the name of the file
  name: 'DashboardComponent',
  props: {
    dashboardProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    return {
      state
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
