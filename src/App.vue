<template>
  <div id="app">
    <div class="left-nav">
      <HeaderComp></HeaderComp>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import HeaderComp from '@/components/skeletons/HeaderComp'

export default {
  name: 'App',
  components: {
    HeaderComp
  }
}
</script>

<style>
  html, body{
    height: 100%;
    margin: 0;
  }
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

  .left-nav {
    display: inline-block;
    width: 15%;
    height: 100%;
  }

  .content {
    display: inline-block;
    width: 85%;
  }
</style>
