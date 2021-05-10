<template>
  <div class="accordion px-4 py-3" id="accordionExample">
    <div class="row card">
      <div class="card-header" id="headingOne">
        <h2 class="mb-0">
          <button class="btn btn-link btn-block text-left"
                  type="button"
                  data-toggle="collapse"
                  data-target="#{{result.id}}"
                  aria-expanded="true"
                  aria-controls="collapseOne"
          >
            <span><h2>{{ result.title }}</h2><h4 class="available" v-if="result.availability == true">Available</h4><h4 class="not-available" v-if="result.availability == false">Not Available</h4></span>
            <div class="text-right" v-if="state.account.id === result.creatorId">
              <button type="button" class="btn btn-primary" @click="editresult()">
                Edit
              </button>
              <button type="button" class="btn btn-danger" @click="deleteresult()">
                Delete
              </button>
            </div>
          </button>
        </h2>
      </div>
      <div id="{{result.id}}" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
        <div class="card-body">
          <div class="col-6">
            <!-- <img class="image-fluid rounded" src="result.picture" alt="result Picture"> -->
            <img class="image-fluid rounded" src="//placehold.it//200x200" alt="result Picture">
          </div>
          <div class="col-6">
            <span>{{ result.title }}</span>
            <span>{{ result.description }}</span>
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
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'

export default {
  name: 'Results',
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
