<template>
  <div class="component background-img container-fluid">
    <div class="row pt-3 pt-md-3 justify-content-center">
      <div class="text-dark col-11  ">
        <h3>SEARCH BY</h3>
      </div>
      <div class="col-md-11 col-11 card shadow bg-dark text-light justify-content-center pt-3 ">
        <form @submit.prevent="search">
          <div class="row justify-content-around">
            <div class="col-md-6 col-12 form-group">
              <label for="categorySelect" class="my-0 pt-1 d-none d-md-block">Categories</label>
              <select class="form-control" id="categorySelect" v-model="state.searchQuery.category" required>
                <option value="" disabled>
                  --Select Category--
                </option>
                <option>All</option>
                <option>Hunting</option>
                <option>Fishing</option>
                <option>Boating</option>
                <option>Camping</option>
                <option>Recreational Sports</option>
              </select>
            </div>
            <div class="col-md-6 col-12 form-group">
              <label for="distanceSelect" class="my-0 pt-1 d-none d-md-block">Distance From You in Miles</label>
              <select class="form-control" id="distanceSelect" v-model="state.searchQuery.distance" required>
                <option value="" disabled>
                  --Select Miles From You--
                </option>
                <option>5</option>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
          </div>
          <div class="row form-group px-3 justify-content-center">
            <div class="col-md-12 d-flex col-12 p-0 align-items-center">
              <input type="text"
                     class="form-control w-100"
                     id="searchInput"
                     aria-describedby="searchInput"
                     placeholder="Search For Items..."
                     v-model="state.searchQuery.query"
              >
              <button type="submit" class="btn btn-primary btn-sm ml-3">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div>
      <Results v-for="result in state.items" :result="result" :key="result.id" />
    </div>
    <item-creation-modal />
  </div>
</template>

<script>
import { reactive, onMounted, computed } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { itemsService } from '../services/ItemsService'
import { logger } from '../utils/Logger'

async function getLocation() {
  return await new Promise((resolve, reject) => {
    try {
      navigator.geolocation.getCurrentPosition(x => { resolve(x) })
    } catch (error) {
      reject(error)
    }
  })
}

export default {
  name: 'SearchPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      searchQuery: {},
      items: computed(() => AppState.items)
    })
    onMounted(async() => {
      await itemsService.getAll(route.query.filter)
    })
    return {
      state,
      async search() {
        try {
          const coords = await getLocation()
          AppState.location = coords
          await itemsService.search(state.searchQuery)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" >
.background-img{
  background-image: url('../assets/img/Untitled.jpg');
  background-size: cover;
}

</style>
