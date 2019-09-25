<template>
  <div class="app">
    <NavBar></NavBar>
    <div class="main-container is-fullhd">
      <MenuBar></MenuBar>
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./index.js">
</script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  html, body {
    height: 100%;
    margin: 0;
    color: #505050;
    font-size: 100%;
    line-height: 1.4rem;
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  }

  .app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: white;
  }

  .main-content {
    padding-top: 8px;
    padding-right: 8px;
    width: 83vw;
  }

  .main-container {
    z-index: 1;
    display: flex;
    margin: 0;
    height: 100%;
  }

  .user-section {
    display: block;
    position: absolute;
    top: 0;
    right: 5vw;
    z-index: 999;
  }

  .page-title {
    margin-left: 10px;
  }
</style>
