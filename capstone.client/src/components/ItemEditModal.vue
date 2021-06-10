
<template>
  <!-- :id="'itemEditModal' + itemProp.id" -->
  <div>
    <div class="modal "
         :id="'itemEditModal'+ itemProp.id"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
    >
      <!-- :id="'exampleModal'+item.id" -->
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              EDIT YOUR LISTING
            </h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createReview">
              <div class="form-group">
                <label for="title">Title</label>
                <input type="text"
                       class="form-control"
                       id="title"
                       placeholder="Title..."
                       minlength="3"
                       maxlength="40"
                       v-model="state.editedItem.title"
                >
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea type="text"
                          class="form-control inputheight"
                          id="description"
                          placeholder="Description..."
                          minlength="3"
                          maxlength="2000"
                          v-model="state.editedItem.description"
                >
                </textarea>
              </div>

              <!-- <div class="form-group">
                <label for="description">Description</label>
                <input type="text"
                       class="form-control inputheight"
                       id="description"
                       placeholder="Description..."
                       minlength="3"
                       maxlength="2000"
                       v-model="state.editedItem.description"
                >
              </div> -->
              <div class="form-group">
                <label for="picture">Picture</label>
                <input type="text"
                       class="form-control"
                       id="picture"
                       placeholder="Picture..."
                       minlength="3"
                       maxlength="500"
                       v-model="state.editedItem.picture"
                >
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">
                  Dismiss
                </button>
                <button type="submit" class="btn btn-primary" @click="editItem()">
                  Save
                </button>
                <!-- <button type="submit" class="btn btn-primary">
                  Create
                </button> -->
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { itemsService } from '../services/ItemsService'
import { logger } from '../utils/Logger'

import $ from 'jquery'

export default {
  name: 'ItemEditModal',
  props: {
    itemProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      editedItem: {}
    })
    return {
      state,
      async editItem() {
        try {
          await itemsService.editItem(state.editedItem)
          state.editedItem = {}
          $('#itemEditModal' + props.itemProp.id).modal('hide')
          Notification.toast('Successfully Edited Item', 'success')
        } catch (error) {
          logger.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style scoped>
.inputheight{
  height: 200px;
  }

</style>
