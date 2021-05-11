<template>
  <div class="dashboard-component container-fluid card shadow my-2">
    <div class="row m-2">
      <div class="col-md-6 col-12">
        <div class="row">
          <h4>Item: {{ result.title }}</h4>
        </div>
        <div class="row">
          <p>Lender Name: NAME HERE</p>
        </div>
        <div class="row">
          <p>Borrower Name: NAME HERE</p>
        </div>
      </div>
      <div class="col-md-6 col-12">
        <div class="row">
          <p>Dates: 00/00/00 - 00/00/00</p>
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
