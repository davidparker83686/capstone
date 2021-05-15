<template>
  <div class="component background-img container-fluid">
    <div class="row pt-3 pt-md-5 justify-content-center">
      <div class="col-md-11 col-11 card shadow bg-dark text-light">
        <form @submit.prevent="search">
          <div class="row justify-content-between">
            <div class="col-md-3 col-12 p-3">
              <h3>Search By</h3>
            </div>
            <div class="col-md-4 col-12 form-group">
              <label for="categorySelect" class="mb-0 pt-3 d-none d-md-block">Categories</label>
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
            <div class="col-md-4 col-12 form-group">
              <label for="distanceSelect" class="mb-0 pt-3 d-none d-md-block">Distance From You in Miles</label>
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
          <div class="row form-group px-3 justify-content-between">
            <div class="col-md-11 col-12 p-0">
              <input type="text"
                     class="form-control w-100"
                     id="searchInput"
                     aria-describedby="searchInput"
                     placeholder="Search For Items..."
                     v-model="state.searchQuery.query"
              >
            </div>
            <div class="col-md-1 col-12 pt-3 pt-md-0 text-right">
              <button type="submit" class="btn btn-primary ">
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
