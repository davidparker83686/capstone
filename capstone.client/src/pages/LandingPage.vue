<template>
  <div class="container-fluid landing-page background-img align-items-end">
    <div class="row justify-content-center my-4">
      <div class="col-10 col-md-6 card bg-card d-flex stretch text-light justify-content-center">
        <div class="my-2">
          <p class="mb-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit corrupti quia error distinctio cum! Quibusdam natus porro fugiat exercitationem numquam facilis dolores reiciendis nesciunt sit molestias impedit quia amet quo autem enim delectus ratione ullam consequatur perspiciatis odit magnam maiores, laboriosam labore. Ipsa, error a! Possimus alias provident itaque eveniet?
          </p>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-4 col-md-4 text-center d-flex justify-content-center align-items-center">
        <button class="btn" :class="{ 'btn-success' : state.check === true, 'btn-outline-secondary' : state.check === false }" @click="location">
          Use Your Location
        </button>
        <p class="text-light mx-1 my-0">
          Use My Location
        </p>
      </div>
    </div>
    <div class="row align-items-center justify-content-center">
      <div class="col-md-4 col-11 card py-2 my-2 mx-2 hunting-bg-img">
        <router-link :to="{name: 'SearchPage', query: {filter:'hunting'}}">
          <h3 class="router text-light">
            Hunting
          </h3>
        </router-link>
      </div>
      <div class="col-md-4 col-11 card py-2 my-2 mx-2 fishing-bg-img">
        <router-link :to="{name: 'SearchPage', query: {filter:'fishing'}}">
          <h3 class="router text-light">
            Fishing
          </h3>
        </router-link>
      </div>
    </div>
    <div class="row align-items-center justify-content-center">
      <div class="col-md-4 col-11 card py-2 my-2 mx-2 boating-bg-img">
        <router-link :to="{name: 'SearchPage', query: {filter:'boating'}}">
          <h3 class="router text-light">
            Boating
          </h3>
        </router-link>
      </div>
      <div class="col-md-4 col-11 card py-2 my-2 mx-2 camping-bg-img">
        <router-link :to="{name: 'SearchPage', query: {filter:'camping'}}">
          <h3 class="router text-light">
            Camping
          </h3>
        </router-link>
      </div>
    </div>
    <div class="row align-items-center justify-content-center">
      <div class="col-md-4 col-11 card py-2 my-2 mx-2 sports-bg-img">
        <router-link :to="{name: 'SearchPage', query: {filter:'sports'}}">
          <h3 class="router text-light">
            Recreational Sports
          </h3>
        </router-link>
      </div>
      <div class="col-md-4 col-11 card py-2 my-2 mx-2 all-bg-img">
        <router-link :to="{name: 'SearchPage', query: {filter:'all'}}">
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
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'

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
          await navigator.geolocation.getCurrentPosition(x => { AppState.location = x })
          // arrow function returns an object, breaks implicit return when arrow function is directly assigning a value
          state.check = !state.check
          logger.log(state.check)
          logger.log(state.location)
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
