<template>
  <div class="container-fluid landing-page background-img align-items-end">
    <div class="row">
      <div class="col d-flex stretch text-light justify-content-center">
        <p>LendMe</p>
      </div>
    </div>
    <div class="row align-items-center justify-content-center">
      <div class="col-md-4 col-11 card py-2 my-2 mx-2 hunting-bg-img">
        <router-link :to="{name: 'SearchPage', query: {filter:'Hunting'}}">
          <h3 class="router text-light">
            Hunting
          </h3>
        </router-link>
      </div>
      <div class="col-md-4 col-11 card py-2 my-2 mx-2 fishing-bg-img">
        <router-link :to="{name: 'SearchPage', query: {filter:'Fishing'}}">
          <h3 class="router text-light">
            Fishing
          </h3>
        </router-link>
      </div>
    </div>
    <div class="row align-items-center justify-content-center">
      <div class="col-md-4 col-11 card py-2 my-2 mx-2 boating-bg-img">
        <router-link :to="{name: 'SearchPage', query: {filter:'Boating'}}">
          <h3 class="router text-light">
            Boating
          </h3>
        </router-link>
      </div>
      <div class="col-md-4 col-11 card py-2 my-2 mx-2 camping-bg-img">
        <router-link :to="{name: 'SearchPage', query: {filter:'Camping'}}">
          <h3 class="router text-light">
            Camping
          </h3>
        </router-link>
      </div>
    </div>
    <div class="row align-items-center justify-content-center">
      <div class="col-md-4 col-11 card py-2 my-2 mx-2 sports-bg-img">
        <router-link :to="{name: 'SearchPage', query: {filter:'Recreational Sports'}}">
          <h3 class="router text-light">
            Recreational Sports
          </h3>
        </router-link>
      </div>
      <div class="col-md-4 col-11 card py-2 my-2 mx-2 all-bg-img">
        <router-link :to="{name: 'SearchPage', query: {filter:'All'}}">
          <h3 class="router text-light">
            All
          </h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage'
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
</style>
