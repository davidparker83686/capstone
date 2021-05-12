<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <item-creation-modal />
    <edit-bio-modal />
    <request-creation-modal />
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Created By David, Ethan, Lane, Scott | May 2021
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import ItemCreationModal from './components/ItemCreationModal.vue'
export default {
  components: { ItemCreationModal },
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
