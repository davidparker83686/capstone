<template>
  <div class="my-2" v-if="state.account">
    <div v-if="message.from === state.account.id">
      <div class="
         row
         justify-content-start"
      >
        <div class="col-6 d-flex card">
          <div>
            {{ message.from }}
          </div>
          <div>
            {{ message.body }}
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-end" v-else>
      <div class="col-6 d-flex card">
        <div>
          {{ message.from }}
        </div>
        <div>
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
