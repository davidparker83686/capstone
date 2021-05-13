<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        <Chat />
      </div>
      <div class="col-7">
        <Message v-for="message in state.messages" :key="message.id" :message="message" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
// import { messagesService } from '../services/MessagesService'
import { logger } from '../utils/Logger'
// import { useRoute } from 'vue-router'

export default {
  name: 'MessagesPage',
  setup() {
    // const route = useRoute()
    const state = reactive({
      chats: computed(() => AppState.chats),
      messages: computed(() => AppState.messages),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        // await messagesService.getAllMessages(state.account.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state
    }
  }
}
</script>
