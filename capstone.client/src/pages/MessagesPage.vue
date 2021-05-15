<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-10 my-4 flex-row">
        <h4 class="d-flex">
          Messages Page
        </h4>
        <button class="btn btn-success" @click="refresh">
          Refresh
        </button>
      </div>
      <div class="col-12">
        <div class="row justify-content-center">
          <div class="col-10">
            <Message v-for="message in state.messages" :key="message.id" :message="message" />
            <form class="d-flex flex-row mt-5 align-items-center" @submit.prevent="send">
              <label for="message">Message</label>
              <input type="text" class="form-control ml-1" id="exampleFormControlInput1" v-model="state.newMessage.body">
              <button type="submit" class="btn btn-info ml-2">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, watch } from 'vue'
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
      newMessage: {}
    })
    watch(() => state.account, () => {
      if (route) {
        messagesService.getAllMessages(route.params.id)
      }
    })
    // onMounted(async() => {
    //   try {
    //     await messagesService.getAllMessages(route.params.id)
    //   } catch (error) {
    //     logger.error(error)
    //   }
    // })
    return {
      state,
      async refresh() {
        await messagesService.getAllMessages(route.params.id)
      },
      async send() {
        const m = {
          to: route.params.id,
          from: state.account.id,
          body: state.newMessage.body
        }
        logger.log(state.newMessage)
        await messagesService.createMessage(m, route.params.id)
      }
    }
  }
}
</script>

<style scoped>
</style>
