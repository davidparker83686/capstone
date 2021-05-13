<template>
  <div class="my-2">
    <div v-if="message.from === creatorId">
      <div class="row justify-content-start">
        <div class="col">
          <div>
            {{ message.from }}
          </div>
          <div>
            {{ message.body }}
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-start" v-else>
      <div class="col">
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
export default {
  name: 'Message',
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>
