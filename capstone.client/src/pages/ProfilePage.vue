<template>
  <div class="container-fluid ">
    <div class="row justify-content-around">
      <!-- profile stuff -->
      <div class="col-12 col-md-3 ">
        <div class="card shadow mt-2 mt-md-5">
          <div class="card-body">
            <h5 class="card-title d-flex justify-content-between">
              <div class="d-inline">
                <!-- {{ (state.account.name.split('@')[0]).charAt(0).toUpperCase()+ (state.account.name.split('@')[0]).substring(1) }} -->
                {{ state.account.name.split('@')[0] }}
              </div>
              <div class="d-inline">
                <i class="fas fa-star star"></i>
                {{ getUserRating() }}
                <!-- {{ userRating }}
                {{ rating }} -->
              </div>
            </h5>
            <div>
              <img class="img-fluid rounded mb-2" :src="state.user.picture" alt="profile picture">
            </div>
            <div class=" d-none d-md-block">
              <div class="card shadow mb-2">
                <div class="card-title m-0 bg-info d-flex justify-content-between">
                  <span class="pl-2 py-2">
                    ABOUT ME
                  </span>
                  <button type="button"
                          class="btn btn-none text-primary"
                          title="edit bio"
                          aria="edit bio"
                          data-toggle="modal"
                          data-target="#editBioModal"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                </div>
                <div class="pl-2 py-2">
                  Bio
                </div>
              </div>

              <div class="card mb-2 ">
                <div class="card-title m-0 bg-info">
                  <span class="pl-2 py-2">
                    REvIEW
                  </span>
                </div>
                <div class="row justify-content-center">
                  <span class="col-12 ml-4 pr-1">
                    <Review v-for="review in state.reviews" :key="review.id" :review="review" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- listings  -->
      <div class="col-11 col-md-8 mt-2 mt-md-5">
        <Item v-for="item in state.items" :key="item.id" :item="item" />
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
                <Review v-for="review in state.reviews" :key="review.id" :review="review" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { computed, onMounted, reactive } from 'vue'
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
      reviews: computed(() => AppState.reviews),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user)
    })
    onMounted(async() => {
      try {
        await reviewsService.getReviewsByUserId(route.params.id)
        await itemsService.getItemsByUserId(route.params.id)
        // await reviewsService.getUserReviewScore(route.params.id)
        // const rating = await reviewsService.getUserReviewScore(route.params.id)
        // return rating
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    })

    return {
      state,
      route,
      getUserRating() {
        // debugger
        const totalReviews = state.reviews.length
        let sumOfReviews = 0
        state.reviews.forEach(r => {
          sumOfReviews += r.rating
        })
        const userRating = sumOfReviews / totalReviews
        return userRating
      }
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
