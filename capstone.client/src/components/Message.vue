<template>
  <div class="my-4">
    <div v-if="message.from === state.account.id">
      <div class="
         row
         align-items-start flex-column"
      >
        <div>
          {{ message.creator.name }}
        </div>
        <div class="col-11 col-md-6 d-flex">
          <div class="rounded-pill d-flex px-4 py-2 text-light card bg-primary shadow">
            {{ message.body }}
          </div>
        </div>
      </div>
    </div>
    <div class="row align-items-end flex-column" v-else>
      <div>
        {{ message.creator.name }}
      </div>
      <div class="col-11 col-md-6 d-flex justify-content-end">
        <div class="rounded-pill d-flex px-4 py-2 text-light card bg-primary shadow">
          {{ message.body }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Message',
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state
    }
  }
}
</script>
