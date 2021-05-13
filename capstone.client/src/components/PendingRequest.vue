
<template>
  <div class="pendingrequest row card shadow mx-3 mt-3 p-3  justify-content-center">
    <div class="col-md-12 col-12">
      <div class="row justify-content-between">
        <h4>Item: ITEM's TITLE</h4>
        <button type="button" class="btn btn-none text-danger" title="delete" aria="delete" @click="deleteHistoryItem()">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
      <div class="row">
        <p>
          Lender : {{ request.ownerId }}
        </p>
      </div>
      <div class="row">
        <p>Borrower : {{ request.borrowerId }}</p>
      </div>
    </div>
    <div class="col-md-6 col-12">
      <div class="row">
        <p>Dates: {{ request.borrowStartDate }} - {{ request.borrowEndDate }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'PendingRequest',
  props: {
    pendingrequest: {
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
