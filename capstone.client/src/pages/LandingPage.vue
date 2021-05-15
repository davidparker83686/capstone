<template>
  <div class="container-fluid landing-page  align-items-end">
    <div class="row justify-content-center my-4">
      <div class="col-10 col-md-8 card bg-card d-flex stretch text-light justify-content-center">
        <div class="my-2">
          <p class="mb-0">
            Welcome to LendMe!  A peer to peer borrowing platform for all your recreational needs! <br> Want to go camping but you don't want to buy your own tent?  Use LendMe!  Want to go fishing but don't want to buy your own fishing gear?  Use LendMe!  Want to play soccer but don't have any balls?  Use LendMe!  Want to go bird watching but don't have a pair of binoculars?  Use LendMe!
          </p>
        </div>
      </div>
    </div>
    <!-- <div class="row justify-content-center">

      <div class="col-4 col-md-8 text-left d-flex ">
        <button class="btn" :class="{ 'btn-success' : state.check === true, 'btn-outline-secondary' : state.check === false }" @click="location">
          Use Your Location
        </button>
        <p class="text-light mx-1 my-0">
          Use My Location
        </p>
      </div>
    </div> -->
    <div class="row align-items-center justify-content-center">
      <div class="col-md-4 col-11 card py-2 my-2 mx-2 hunting-bg-img">
        <router-link :to="{name: 'SearchPage', query: {filter:'Hunting'}}" style="text-decoration: none;">
          <h3 class="router text-light">
            Hunting
          </h3>
        </router-link>
      </div>
      <div class="col-md-4 col-11 card py-2 my-2 mx-2 fishing-bg-img">
        <router-link :to="{name: 'SearchPage', query: {filter:'Fishing'}}" style="text-decoration: none;">
          <h3 class="router text-light">
            Fishing
          </h3>
        </router-link>
      </div>
    </div>
    <div class="row align-items-center justify-content-center">
      <div class="col-md-4 col-11 card py-2 my-2 mx-2 boating-bg-img">
        <router-link :to="{name: 'SearchPage', query: {filter:'Boating'}}" style="text-decoration: none;">
          <h3 class="router text-light">
            Boating
          </h3>
        </router-link>
      </div>
      <div class="col-md-4 col-11 card py-2 my-2 mx-2 camping-bg-img">
        <router-link :to="{name: 'SearchPage', query: {filter:'Camping'}}" style="text-decoration: none;">
          <h3 class="router text-light">
            Camping
          </h3>
        </router-link>
      </div>
    </div>
    <div class="row align-items-center justify-content-center">
      <div class="col-md-4 col-11 card py-2 my-2 mx-2 sports-bg-img">
        <router-link :to="{name: 'SearchPage', query: {filter:'Recreational Sports'}}" style="text-decoration: none;">
          <h3 class="router text-light">
            Recreational Sports
          </h3>
        </router-link>
      </div>
      <div class="col-md-4 col-11 card py-2 my-2 mx-2 all-bg-img">
        <router-link :to="{name: 'SearchPage', query: {filter:'All'}}" style="text-decoration: none;">
          <h3 class="router text-light">
            All
          </h3>
        </router-link>
      </div>
    </div>
    <item-creation-modal />
  </div>
</template>

<script>
import { reactive } from 'vue'
// import { logger } from '../utils/Logger'
import { AppState } from '../AppState'

async function getLocation() {
  return await new Promise((resolve, reject) => {
    try {
      navigator.geolocation.getCurrentPosition(x => { resolve(x) })
    } catch (error) {
      reject(error)
    }
  })
}

export default {
  name: 'LandingPage',
  setup() {
    const state = reactive({
      locationChecked: true,
      location: AppState.location,
      check: false
    })
    return {
      state,
      async location() {
        // debugger
        const confirm = window.confirm('Do you want our application to have access to your Location?')
        if (confirm) {
          const coords = await getLocation()
          AppState.location = coords
          // arrow function returns an object, breaks implicit return when arrow function is directly assigning a value
          state.check = !state.check
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}

.router{
  text-decoration: none !important;
  color: black;
}

.stretch{
  flex-grow: 1;
  display: flex;
  align-items: stretch;
}

.card{
  border: 2px solid black;
  box-shadow: 0px 10px 20px -5px rgba(0,0,0,.8);
}

.background-img{
  background-image: url('../assets/img/tree-trunk.jpg');
  background-size: cover;
}

.background-content{
  opacity: 1;
}

.hunting-bg-img{
  background-image: linear-gradient(to right, rgb(0, 0, 0) , transparent), url('../assets/img/hunting.jpg');
  background-size: cover;
  background-position-y: -5rem;
}

.hunting-bg-img:hover{
  transition: all 0.25s;
  box-shadow: 0 0 3em 0.5em white;
}

.fishing-bg-img{
  background-image: linear-gradient(to right, rgb(0, 0, 0) , transparent), url('../assets/img/fishing.jpg');
  background-position-y: -7rem;
  background-size: cover;
}

.fishing-bg-img:hover{
  transition: all 0.25s;
  box-shadow: 0 0 3em 0.5em white;
}

.boating-bg-img{
  background-image: linear-gradient(to right, rgb(0, 0, 0) , transparent), url('../assets/img/boating.jpg');
  background-position-y: -8rem;
  background-size: cover;
}

.boating-bg-img:hover{
  transition: all 0.25s;
  box-shadow: 0 0 3em 0.5em white;
}

.camping-bg-img{
  background-image: linear-gradient(to right, rgb(0, 0, 0) , transparent), url('../assets/img/camping.jpg');
  background-position-y: -20rem;
  background-size: cover;
}

.camping-bg-img:hover{
  transition: all 0.25s;
  box-shadow: 0 0 3em 0.5em white;
}

.sports-bg-img{
  background-image: linear-gradient(to right, rgb(0, 0, 0) , transparent), url('../assets/img/rec-sports.jpg');
  background-position-y: -8rem;
  // background-position-x: 5rem;
  background-size: cover;
}

.sports-bg-img:hover{
  transition: all 0.25s;
  box-shadow: 0 0 3em 0.5em white;
}

.all-bg-img{
  background-image: linear-gradient(to right, rgb(0, 0, 0) , transparent), url('../assets/img/all-img.jpg');
  background-position-y: -1rem;
  background-size: cover;
}

.all-bg-img:hover{
  transition: all 0.25s;
  box-shadow: 0 0 3em 0.5em white;
}

.bg-card{
  background-color: rgba(0, 0, 0, 0.753);
  border: none;
}

.btn-toggle{
  background-color: green;
  color: white;

}
</style>
