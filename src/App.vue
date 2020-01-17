<template>
  <div class="app">
    <NavBar class="is-hidden-mobile is-hidden-touch"></NavBar>
    <transition name="fade">
      <MobileNavBar class="top-navbar is-hidden-desktop"></MobileNavBar>
    </transition>
    <div class="main-container is-fullhd">
      <MenuBar class="is-hidden-mobile is-hidden-touch" @updateViewKey="updateViewKey"></MenuBar>
      <div class="main-content">
        <transition name="fade" mode="out-in">
          <router-view :key="viewKey"></router-view>
        </transition>
        <BottomNavBar class="is-hidden-desktop" v-if="bottomNavBarVisible"></BottomNavBar>
      </div>
    </div>
    <transition name="fade">
      <Login v-if="showLoginModal"></Login>
    </transition>
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
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: white;

    @media only screen and (min-width: 1023px) {
      height: 100vh;
    }
  }

  .main-content {
    padding-top: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 9rem;
    width: 75vw;

    @media only screen and (max-width: 1023px) {
      width: 100vw;
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }
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

  .top-navbar {
    transition: opacity .35s, visibility .35s, height .35s;
  }
</style>
