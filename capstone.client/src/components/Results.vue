<template>
  <div class="accordion px-0 px-md-5 py-2 py-md-3" id="accordionExample">
    <div class="card shadow p-3 pb-0">
      <div class="row">
        <div class=" d-flex p-0">
          <button style="text-decoration: none; color: inherit;"
                  class="btn btn-link btn-block text-left p-0"
                  type="button"
                  data-toggle="collapse"
                  :data-target="'#collapseOne'+result.id"
                  aria-expanded="true"
                  aria-controls="collapseOne"
          >
            <div class="col-md-12 col-12">
              <h3 class="d-inline">
                {{ result.title.toUpperCase() }} -

                <span class="available text-success d-inline" style="text-decoration: none; color: inherit;" v-if="result.availability == true">
                  Available
                </span>
                <span class="not-available text-danger d-inline" style="text-decoration: none; color: inherit;" v-if="result.availability == false">
                  Not Available
                </span>
              </h3>
              <br>
              <span>{{ result.category.toUpperCase() }}</span>
            </div>
          </button>
          <!--
          <div class="text-right " v-if="state.account.id === result.creatorId">
            <button type="button" class="btn btn-primary mr-2" @click="editresult()">
              Edit
            </button>
            <button type="button" class="btn btn-danger" @click="deleteresult()">
              Delete
            </button>
          </div> -->
        </div>
      </div>

      <div :id="'collapseOne'+result.id" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
        <div class="card-body p-0">
          <div class="row">
            <div class="col-12 col-md-3">
              <img class="img-fluid rounded" :src="result.picture" alt="Item Picture" v-if="result.picture">
            </div>
            <div class="col-12 col-md-9 mt-3">
              <router-link style="color: inherit;" :to="{name: 'Profile', params: {id: result.creatorId}}">
                <div class="hover route d-flex">
                  <h5>
                    <span v-if="result.creator">Owner : {{ result.creator.name.split('@')[0] }} </span>
                  </h5>
                  <div v-if="result.creator.picture">
                    <img class="rounded-circle img-size" :src="result.creator.picture" alt="profile picture">
                  </div>
                </div>
              </router-link>
              <div v-if="result.description">
                {{ result.description }}
              </div>
              <div class="buttons text-right  mb-2">
                <button type="button"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#requestCreationModal"
                        v-if="state.user.isAuthenticated && result.availability == true && state.account.id !== result.creatorId"
                        @click="assignActiveItem(result)"
                >
                  Borrow
                </button>
                <button type="button" class="btn btn-primary disabled" v-if="state.user.isAuthenticated &&result.availability == false && state.account.id !== result.creatorId">
                  Borrow
                </button>
                <button type="button" class="btn btn-primary mr-2" @click="editresult()" v-if="state.account.id === result.creatorId">
                  Edit
                </button>
                <button type="button" class="btn btn-danger" @click="deleteresult()" v-if="state.account.id === result.creatorId">
                  Delete
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
</style>
