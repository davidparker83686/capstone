<template>
  <div class="component container-fluid">
    <div class="row pt-3 pt-md-5 justify-content-center">
      <div class="col-md-11 col-11 card shadow bg-dark text-light">
        <form>
          <div class="row justify-content-between">
            <div class="col-md-3 col-12 p-3">
              <h3>Search By</h3>
            </div>
            <div class="col-md-4 col-12 form-group">
              <label for="categorySelect" class="mb-0 pt-3 d-none d-md-block">Categories</label>
              <select class="form-control" id="categorySelect">
                <option>All</option>
                <option>Hunting</option>
                <option>Fishing</option>
                <option>Boating</option>
                <option>Camping</option>
                <option>Recreational Sports</option>
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

export default {
  name: 'SearchPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      items: computed(() => AppState.items)
    })
    onMounted(async() => {
      await itemsService.getAll(route.query.filter)
    })
    return {
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
