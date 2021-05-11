<template>
  <div>
    <div class="modal "
         id="editBioModal"
         tabindex="-1"
         role="dialog"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              BIO
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editBio">
              <div class="form-group">
                <label for="bio"></label>
                <input type="text"
                       class="form-control"
                       id="bio"
                       placeholder="bio..."
                       minlength="3"
                       maxlength="50"
                       v-model="state.editedBio.bio"
                       required
                >
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                  Dismiss
                </button>
                <button type="submit" class="btn btn-primary">
                  Create
                </button>
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
import { accountService } from '../services/AccountService'
import $ from 'jquery'
import { useRoute } from 'vue-router'
export default {
  name: 'EditBioModal',
  setup() {
    const route = useRoute()
    const state = reactive({
      editedBio: {}
    })
    return {
      state,
      async editBio() {
        try {
          state.editedBio.accountId = route.params.id
          await accountService.editBio(state.editedBio)
          state.editedBio = {}
          $('#editBioModal').modal('hide')
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style scoped>

</style>
