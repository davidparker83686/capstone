<template>
  <div class="card ">
    <div class="card-header">
      <h4>
        {{ review.title }}<i class="fas fa-star star"></i>{{ review.rating }}
      </h4>
      <div class="text-right" v-if="state.account.id === item.creatorId">
        <button type="button" class="btn btn-danger" @click.prevent="deleteReview(review.id)" title="delete review" aria="delete review">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
    <div class="card-body">
      {{ review.body }}
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { reviewsService } from '../services/ReviewsService'
import { logger } from '../utils/Logger'
import Notification from '../utils/Notification'
export default {
  name: 'Review',
  props: {
    review: {
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
          if (await Notification.confirmAction('Are you sure you want to delete this review?', 'You won\'t be able to revert this.', 'warning', 'Yes, Delete')) {
            await reviewsService.deleteItem(id)
            Notification.toast('Successfully Deleted Item', 'success')
          }
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
.nav-review .nav-link.router-link-exact-active{
  color: var(--primary);
}
.available {
  color: var(--success)
}
.not-available {
  color: var(--danger)
}
</style>
