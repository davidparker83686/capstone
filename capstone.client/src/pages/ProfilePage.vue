<template>
  <div class="container-fluid background-img bg-success">
    <div class="row justify-content-around">
      <!-- profile stuff -->
      <div class="col-12 col-md-3">
        <div class="card mt-2">
          <div class="card-body">
            <h5 class="card-title d-flex justify-content-between">
              <div class="d-inline">
                User Name
                <!-- {{ account.name }} -->
              </div>
              <div class="d-inline">
                <i class="fas fa-star star"></i>
                5
                <!-- {{user rating}} -->
              </div>
            </h5>
            <div>
              <img class="img-fluid rounded mb-2" src="https://personalexcellence.co/files/girl-smiling2.jpg" alt="profile picture">
            </div>
            <div class=" d-none d-md-block">
              <div class="card mb-2">
                <div class="card-title m-0 bg-info">
                  <span class="pl-2 py-2">
                    ABOUT ME
                  </span>
                </div>
                <div class="pl-2 py-2">
                  Bio
                </div>
              </div>

              <div class="card mb-2">
                <div class="card-title m-0 bg-info">
                  <span class="pl-2 py-2">
                    REvIEW
                  </span>
                </div>
                <div class="pl-2 py-2">
                  <span>
                    my reviews go here
                  <!-- <Review-for="review in state.reviews" :key="review.id" :review="review"/> -->
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- listings  -->
      <div class="col-12 col-md-8 bg-danger mt-2">
        MY ITEMS
        <!-- <Item v-for="item in state.items" :key="item.id" :item="item"/> -->
      </div>
      <div class="col-12 d-block d-md-none">
        <div class=" ">
          <div class="card mb-2">
            <div class="card-title m-0 bg-info">
              <span class="pl-2 py-2">
                ABOUT ME
              </span>
            </div>
            <div class="pl-2 py-2">
              Bio
            </div>
          </div>

          <div class="card mb-2">
            <div class="card-title m-0 bg-info">
              <span class="pl-2 py-2">
                REvIEW
              </span>
            </div>
            <div class="pl-2 py-2">
              <span>
                my reviews go here
                <!-- <Review-for="review in state.reviews" :key="review.id" :review="review"/> -->
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { itemsService } from '../services/ItemsService'
import { reviewsService } from '../services/ReviewsService'
export default {
  name: 'Home',
  setup() {
    const route = useRoute()
    const state = reactive({
      items: computed(() => AppState.items),
      reviews: computed(() => AppState.reviews)
    })
    onMounted(async() => {
      try {
        await itemsService.getItemsByUserId(route.params.id)
      } catch (error) {
        console.error(error)
      }
    })
    onMounted(async() => {
      try {
        await reviewsService.getReviewsByUserId(route.params.id)
      } catch (error) {
        console.error(error)
      }
    })

    return {
      state,
      route

    }
  }
}
</script>

<style scoped lang="scss">
.star{
  color:yellow
}
.background-img{
  background-image: url('../assets/img/Untitled.jpg');
  background-size: cover;
  background-position-y: 50%;
}

</style>
