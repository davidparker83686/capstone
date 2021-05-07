<template>
  <div class="container-fluid landing-page">
    <div class="row align-items-center justify-content-center flex-column flex-grow-1">
      <div class="col">
        <p>example</p>
      </div>
    </div>
    <div class="row align-items-center justify-content-center">
      <div class="col-md-4 col-11 card shadow py-2 my-2 mx-2">
        <router-link :to="{name: 'SearchPage', query: {filter:'Hunting'}}">
          <h3 class="router ">
            Hunting
          </h3>
        </router-link>
      </div>
      <div class="col-md-4 col-11 card shadow py-2 my-2 mx-2">
        <router-link :to="{name: 'SearchPage', query: {filter:'Fishing'}}">
          <h3 class="router ">
            Fishing
          </h3>
        </router-link>
      </div>
    </div>
    <div class="row align-items-center justify-content-center">
      <div class="col-md-4 col-11 card shadow py-2 my-2 mx-2">
        <router-link :to="{name: 'SearchPage', query: {filter:'Boating'}}">
          <h3 class="router ">
            Boating
          </h3>
        </router-link>
      </div>
      <div class="col-md-4 col-11 card shadow py-2 my-2 mx-2">
        <router-link :to="{name: 'SearchPage', query: {filter:'Camping'}}">
          <h3 class="router ">
            Camping
          </h3>
        </router-link>
      </div>
    </div>
    <div class="row align-items-center justify-content-center">
      <div class="col-md-4 col-11 card shadow py-2 my-2 mx-2">
        <router-link :to="{name: 'SearchPage', query: {filter:'Recreational Sports'}}">
          <h3 class="router ">
            Recreational Sports
          </h3>
        </router-link>
      </div>
      <div class="col-md-4 col-11 card shadow py-2 my-2 mx-2">
        <router-link :to="{name: 'SearchPage', query: {filter:'All'}}">
          <h3 class="router ">
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

.stretch-col{
  flex-grow: 1;
  display: flex;
  align-items: stretch;
}
</style>
