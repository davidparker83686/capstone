<template>
  <!-- Start of accordian menue -->
  <div class="accordion" id="accordionExample">
    <div class="row card shadow mb-2">
      <div class="card-header" id="headingOne">
        <h2 class="mb-0">
          <button class="btn btn-link btn-block text-left px-0"
                  type="button"
                  data-toggle="collapse"
                  :data-target="'#collapseOne'+item.id"
                  aria-expanded="true"
                  aria-controls="collapseOne"
          >
            <div class="justify-content-between d-flex">
              <div>
                <h2>{{ item.title }}</h2>
              </div>
              <div class="d-none d-md-block" v-if="state.account.id === item.creatorId">
                <button type="button" class="btn btn-none btn-outline-danger text-danger" @click.prevent="deleteItem(item.id)">
                  Delete
                </button>
                <button type="button" class="mx-1 btn btn-none btn-outline-primary text-primary" @click="editItem()">
                  Edit
                </button>
              </div>

              <div class="d-block d-md-none" v-if="state.account.id === item.creatorId">
                <button type="button" class="btn btn-none p-0 text-danger" @click.prevent="deleteItem(item.id)">
                  <i class="fas fa-trash-alt"></i>
                </button>
                <button type="button" class="mx-1 btn btn-none p-0 text-primary" @click="editItem()">
                  <i class="fas fa-edit"></i>
                </button>
              </div>
            </div>
          </button>

          <h4 class="available" v-if="item.availability == true">
            Available
          </h4><h4 class="not-available" v-if="item.availability == false">
            Not Available
          </h4>
        </h2>
      </div>
      <div :id="'collapseOne'+item.id" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
        <div class="card-body d-flex justify-content-between">
          <div class="col-5">
            <img class="img-fluid rounded" :src="item.picture" alt="Item Picture" v-if="item.picture">
          </div>
          <div class="col-5">
            <span><b>{{ item.title }}</b> <br> {{ item.description }}</span>
            <div class="buttons text-right ">
              <!-- Button trigger modal -->
              <button type="button"
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#requestCreationModal"
                      v-if="item.availability == true && state.account.id !== item.creatorId"
                      @click="assignActiveItem(item)"
              >
                Borrow
              </button>
              <button type="button" class="btn btn-primary disabled" v-if="item.availability == false && state.account.id !== item.creatorId">
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
    </div>
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
          if (await Notification.confirmAction('Are you sure you want to delete this item?', 'You won\'t be able to revert this.', 'warning', 'Yes, Delete')) {
            await itemsService.deleteItem(id)
            Notification.toast('Successfully Deleted Item', 'success')
          }
        } catch (error) {
          logger.error(error)
        }
      },
      async editItem(id) {
        try {
          await itemsService.editItem(id)
          Notification.toast('Successfully Edited Item', 'success')
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
</style>
