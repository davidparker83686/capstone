<template>
  <div class="request-component accordion px-4 py-3" id="accordionExample">
    <div class="row card">
      <div class="card-header" id="headingOne">
        <div class="row justify-content-between">
          <div class="col-md-3 col-12">
            <button class="btn btn-link btn-block text-left"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
            >
              <h4>Item: {{ result.title }}</h4>
            </button>
          </div>
          <div class="col-md-2 col-6">
            <p>Lender Name: {{ result.category }}</p>
          </div>
          <div class="col-md-1 col-6">
            <p>Rating??</p>
          </div>
          <div class="col-md-1 col-6">
            <p>Dates: 00/00/00 - 00/00/00</p>
          </div>
          <div class="col-md-2 col-12" v-if="state.account.id === result.creatorId">
            <button type="button" class="btn btn-primary mr-2" @click="acceptRequest()">
              Accept
            </button>
            <button type="button" class="btn btn-danger" @click="declineRequest()">
              Decline
            </button>
          </div>
        </div>
      </div>
      <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
        <div class="card-body">
          <div class="row">
            <div class="col-md-3 col-12">
              <!-- TODO change this back after styling     <img class="image-fluid rounded" src="result.picture" alt="result Picture"> -->
              <img class="image-fluid rounded" src="//placehold.it//200x200" alt="result Picture">
            </div>
            <div class="col-8">
              <div class="row my-2">
                <div class="col-md-2 col-6">
                  <h5>Item Owner:</h5>
                </div>
                <div class="col-md-6 col-6">
                  <img class="profile-img" src="//placehold.it//100x100" alt="">
                  <p>{{ result.creatorId }}</p>
                </div>
                <div class="col-md-4 col-12">
                  Rating: STARS GO HERE??
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-12"></div>
                <p class="ml-2">
                  {{ result.description }}
                </p>
              </div>
              <div class="buttons text-right">
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" v-if="result.available == true && state.account.id !== result.creatorId">
                  Borrow
                </button>
                <button type="button" class="btn btn-primary disabled" v-if="result.available == false && state.account.id !== result.creatorId">
                  Borrow
                </button>
              </div>
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
