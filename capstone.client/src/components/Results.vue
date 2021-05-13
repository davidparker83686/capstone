<template>
  <div class="accordion px-4 py-3" id="accordionExample">
    <div class="row card p-3">
      <div class="" id="headingOne">
        <div class="row justify-content-between">
          <div class="col-md-3 col-12">
            <button class="btn btn-link btn-block text-left"
                    type="button"
                    data-toggle="collapse"
                    :data-target="'#collapseOne'+result.id"
                    aria-expanded="true"
                    aria-controls="collapseOne"
            >
              <div class="">
                <h4>{{ result.title.toUpperCase() }}</h4>
                <h4 class="available text-success" v-if="result.availability == true">
                  Available
                </h4>
                <h4 class="not-available text-danger" v-if="result.availability == false">
                  Not Available
                </h4>
              </div>
            </button>
          </div>
          <div class="col-md-2 col-6">
            <p>{{ result.category.toUpperCase() }}</p>
          </div>
          <div class="col-md-1 col-6">
            <p>Rating??</p>
          </div>
          <div class="col-md-2 col-12">
            <p>Distance From You??</p>
          </div>

          <div class="col-md-2 col-12" v-if="state.account.id === result.creatorId">
            <button type="button" class="btn btn-primary mr-2" @click="editresult()">
              Edit
            </button>
            <button type="button" class="btn btn-danger" @click="deleteresult()">
              Delete
            </button>
          </div>
        </div>
      </div>
      <div :id="'collapseOne'+result.id" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
        <div class="card-body">
          <div class="row">
            <div class="col-md-3 col-12">
              <!-- TODO change this back after styling     <img class="image-fluid rounded" src="result.picture" alt="result Picture"> -->
              <img class="img-fluid rounded" :src="result.picture" alt="Item Picture" v-if="result.picture">
            </div>
            <div class="col-8">
              <div class="row my-2">
                <div class="col-md-2 col-6">
                  <h5>Item Owner:</h5>
                </div>
                <div class="col-md-6 col-6" v-if="result.creator">
                  <p>{{ result.creator.name.split('@')[0] }}</p>
                  <img class="rounded-circle" :src="result.creator.picture" alt="profile picture">
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

                <button type="button"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#requestCreationModal"
                        v-if="result.availability == true && state.account.id !== result.creatorId"
                        @click="assignActiveItem(result)"
                >

                  Borrow
                </button>
                <button type="button" class="btn btn-primary disabled" v-if="result.availability == false && state.account.id !== result.creatorId">
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
import { itemsService } from '../services/ItemsService'
import { logger } from '../utils/Logger'

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
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    // onMounted(async() => {
    //   await itemsService.getAll(route.query.filter)
    // })
    return {
      state,
      async assignActiveItem(item) {
        try {
          await itemsService.assignActiveItem(item)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// .profile-img{
//   border-radius: 50%;
//   cursor: pointer;
// }

</style>
