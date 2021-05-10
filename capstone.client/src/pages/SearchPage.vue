<template>
  <div class="component">
  </div>
</template>

<script>
import { reactive, onMounted, computed } from 'vue'
import AppState from '../AppState'
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
      debugger
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
