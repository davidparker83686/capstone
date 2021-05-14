<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-10">
        Messages Page
        <button class="btn btn-success" @click="refresh">
          Refresh
        </button>
        <Message v-for="message in state.messages" :key="message.id" :message="message" />
      </div>
      <div class="col-10">
        <form class="form-group" @sumbit.prevent="send">
          <label for="message">Message</label>
          <input type="test" class="form-control" id="exampleFormControlInput1" v-model="state.message.body">
          <button type="submit" class="btn btn-info">
            Send
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { messagesService } from '../services/MessagesService'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'

export default {
  name: 'MessagesPage',
  setup() {
    const route = useRoute()
    const state = reactive({
      chats: computed(() => AppState.chats),
      messages: computed(() => AppState.messages),
      account: computed(() => AppState.account),
      message: {
        to: route.params.id,
        from: computed(() => this.account.id)
      }
    })
    onMounted(async() => {
      try {
        await messagesService.getAllMessages(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      async refresh() {
        await messagesService.getAllMessages(route.params.id)
      },
      async send() {
        await messagesService.createMessage(state.message)
      }
    }
  }
}
</script>

<style scoped>
* {
    border: 1px solid red;

}
</style>
