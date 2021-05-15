<template>
  <header class="font">
    <Navbar />
  </header>
  <main class="font">
    <router-view />
    <item-creation-modal />
    <edit-bio-modal />
    <request-creation-modal />
    <!-- <review-creation-modal /> -->
  </main>
  <footer>
    <div class="dark-green-background creme-text text-center ">
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
.font{
  font-family: 'Fjalla One', sans-serif;
}
</style>
