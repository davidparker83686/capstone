<template>
  <!-- Start of accordian menue -->
  <div class="accordion" id="accordionExample">
    <div class="row card shadow mb-2 mx-0 mx-md-1">
      <div class="px-2 px-md-3 lightgrey " id="headingOne">
        <div class="mb-0">
          <button class="btn btn-link btn-block shadow-none text-left px-0"
                  style="text-decoration: none;"
                  type="button"
                  data-toggle="collapse"
                  :data-target="'#collapseOne'+item.id"
                  aria-expanded="true"
                  aria-controls="collapseOne"
          >
            <div class="justify-content-between d-flex">
              <div>
                <span>
                  <h2 class="d-inline">{{ item.title.toUpperCase() }} -</h2>
                  <h4 class="available d-inline" v-if="item.availability == true">
                    Available
                  </h4><h4 class="not-available d-inline" v-if="item.availability == false">
                    Not Available
                  </h4>
                </span>
              </div>

              <!-- <div class="" v-if="state.account.id === item.creatorId">
                <button type="button" class="btn btn-none btn-outline-danger text-danger" @click.prevent="deleteItem(item.id)">
                  Delete
                </button>
                <button type="button" class="mx-1 btn btn-none btn-outline-primary text-primary" @click="editItem()">
                  Edit
                </button>
              </div> -->

              <!-- <div class="d-block d-md-none" v-if="state.account.id === item.creatorId">
                <button type="button" class="btn btn-none p-0 text-danger" @click.prevent="deleteItem(item.id)">
                  <i class="fas fa-trash-alt"></i>
                </button>
                <button type="button" class="mx-1 btn btn-none p-0 text-primary" @click="editItem()">
                  <i class="fas fa-edit"></i>
                </button>
              </div> -->
            </div>
          </button>
        </div>
      </div>
      <div :id="'collapseOne'+item.id" class="collapse col-12 show" aria-labelledby="headingOne" data-parent="#accordionExample">
        <div class=" row justify-content-between">
          <div class="col-6 mt-2">
            <img class="img-fluid rounded" :src="item.picture" alt="Item Picture" v-if="item.picture">
          </div>
          <div class="col-6 mt-2">
            <span><b>{{ item.title.toUpperCase() }}</b> <br> {{ item.description }}</span>
          </div>
          <div class="buttons col-12 mb-2 text-right pt-3 pt-md-0 userbuttons">
            <button v-if="state.account.id === item.creatorId" type="button" class="btn btn-danger" @click.prevent="deleteItem(item.id)">
              Delete
            </button>
            <button v-if="state.account.id === item.creatorId"
                    type="button"
                    class="mx-1 btn btn-primary "
                    data-toggle="modal"
                    :data-target="'#itemEditModal' + item.id"
                    @click="assignActiveItem(item)"
            >
              <!-- :data-target="'#itemEditModal' + item.id" -->
              Edit
            </button>

            <!-- Button trigger modal -->
            <button type="button"
                    class="btn btn-primary"
                    data-toggle="modal"
                    data-target="#requestCreationModal"
                    v-if="state.user.isAuthenticated && item.availability == true && state.account.id !== item.creatorId "
                    @click="assignActiveItem(item)"
            >
              Borrow
            </button>
            <button type="button" class="btn btn-primary disabled" v-if=" state.user.isAuthenticated && item.availability == false && state.account.id !== item.creatorId ">
              Borrow
            </button>
            <button type="button" class="btn btn-danger" v-if="item.availability == true && state.account.id == item.creatorId" @click="toggleAvailability(item)">
              Unavailable
            </button>
            <button type="button" class="btn btn-success" v-if="item.availability == false && state.account.id == item.creatorId" @click="toggleAvailability(item)">
              Available
            </button>
          </div>
        </div>
      </div>
    </div>
    <item-edit-modal :item-prop="item" />
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { itemsService } from '../services/ItemsService'
import { logger } from '../utils/Logger'
import Notification from '../utils/Notification'
export default {
  name: 'Item',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    return {
      state,
      async deleteItem(id) {
        try {
          if (await Notification.confirmAction('Are you sure you want to delete this item?', 'You won\'t be able to revert this.', '', 'Yes, Delete')) {
            await itemsService.deleteItem(id)
            Notification.toast('Successfully Deleted Item', 'success')
          }
        } catch (error) {
          logger.error(error)
        }
      },
      async toggleAvailability(item) {
        try {
          await itemsService.toggleAvailability(item)
          Notification.toast('Successfully Toggled Availability', 'success')
        } catch (error) {
          logger.error(error)
        }
      },
      async assignActiveItem(item) {
        try {
          await itemsService.assignActiveItem(item)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--primary);
}
.available {
  color: var(--success)
}
.not-available {
  color: var(--danger)
}
.lightgrey{
  background-color: rgba(236, 236, 236, 0.315);
}

@media screen and (min-width:760px){
  .userbuttons{
justify-content: space-around;
  }
}
</style>
