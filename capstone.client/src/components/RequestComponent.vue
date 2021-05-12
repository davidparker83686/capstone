<template>
  <div class="requestcomponent row card shadow accordion px-4 py-3 my-2" id="accordionExample">
    <div class="card-header" id="headingOne">
      <div class="col-md-6">
        <div class="row justify-content-between">
          <div class="col">
            <button class="btn btn-link btn-block text-left"
                    type="button"
                    data-toggle="collapse"
                    :data-target="'#collapseOne'+result.id"
                    aria-expanded="true"
                    aria-controls="collapseOne"
            >
              <h4>Requested Item:<br> {{ request.itemId }}</h4>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p>Borrower's Name: {{ request.borrowerId }}</p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p>Rating: STAR RATING HERE</p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col">
            <p>Dates: {{ request.borrowStartDate }} - {{ request.borrowEndDate }}</p>
          </div>
        </div>
        <div class="row">
          <div class="col" v-if="state.account.id === result.creatorId">
            <button type="button" class="btn btn-primary mr-2" @click="acceptRequest()">
              Accept
            </button>
            <button type="button" class="btn btn-danger" @click="declineRequest()">
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
    <div :id="'collapseOne'+result.id" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="row card-body justify-content-between">
        <div class="col-6">
          <div class="row my-2">
            <div class="col-md-6 col-6">
              <div class="row">
                <div class="col">
                  <h5>Request From:</h5>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <img class="profile-img" src="//placehold.it//100x100" alt="">
                </div>
              </div>
            </div>
            <div class="col-md-6 col-6">
              <div class="row">
                <div class="col">
                  <p>{{ request.borrowerId }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <p>Rating: STARS GO HERE??</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-5">
          <div class="row">
            <div class="col">
              <p>Would Like to Borrow Your:<br> YOUR ITEM'S TITLE</p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <img src="//placehold.it/100x100" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'RequestComponent',
  props: {
    requestProp: {
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
