<template>
  <div class="accordion px-4 py-3" id="accordionExample">
    <div class="row card p-3 pb-0">
      <div class="" id="headingOne">
        <div class="row justify-content-between">
          <div class="col-md-12 col-12 d-flex">
            <button style="text-decoration: none; color: inherit;"
                    class="btn btn-link btn-block text-left"
                    type="button"
                    data-toggle="collapse"
                    :data-target="'#collapseOne'+result.id"
                    aria-expanded="true"
                    aria-controls="collapseOne"
            >
              <div class="d-flex justify-content-between">
                <h4 class="ml-0">
                  {{ result.title.toUpperCase() }}
                </h4>
                <h4 class="available text-success d-flex" style="text-decoration: none; color: inherit;" v-if="result.availability == true">
                  Available
                </h4>
                <h4 class="not-available text-danger d-flex" style="text-decoration: none; color: inherit;" v-if="result.availability == false">
                  Not Available
                </h4>
              </div>
            </button>
          </div>
          <div class="col-md-2 col-6 ml-4">
            <p>{{ result.category.toUpperCase() }}</p>
          </div>
          <!-- <div class="col-md-1 col-6">
            <p>Rating??</p>
          </div> -->
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
            <div class="col-12 mt-3">
              <router-link style="color: inherit;" :to="{name: 'Profile', params: {id: result.creatorId}}">
                <div class="hover d-flex">
                  <h5>Owner: </h5>
                  <div class="col-md-12 col-6 flex-row" v-if="result.creator">
                    <h5 class="route">
                      {{ result.creator.name.split('@')[0] }}
                    </h5>
                    <div v-if="result.creator.picture">
                      <img class="rounded-circle img-size" :src="result.creator.picture" alt="profile picture">
                    </div>
                  </div>
                </div>
              </router-link>
              <div class="row my-2">
                <div class="col-md-12 col-6 d-flex flex-row">
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-12">
              <p class="ml-2 d-block">
                {{ result.description }}
              </p>
              <div class="buttons text-right mb-2">
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

.route {
  text-decoration: none!important;
  text-decoration-line: none black!important;
  color: black!important;
  cursor: pointer;
}

.hover:hover{
  position: relative;
  bottom: 2px;
}

.img-size{
  width: 100%;
}

.collapse.in, .collapse{
  // overflow: auto;
  overflow-x: hidden;
}
.card{
  // overflow: auto;
}
</style>
