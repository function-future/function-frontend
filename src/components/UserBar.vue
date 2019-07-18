<template>
  <div>
    <div class="block" v-bind:class="{'block-extend': isExtend, 'block-shrink': isExtend === false, 'login': !loggedIn}"
         @click="login" @mouseover="extendUserBar" @mouseleave="shrinkUserBar">
      <div v-if="loggedIn">
        <div class="block-list disable-selection">
          <font-awesome-icon icon="user-circle" class="icon" /> {{ firstName }}
        </div>
        <div class="more-block">
          <span class="more-menu" v-show="!isExtend">
            <font-awesome-icon icon="chevron-down" class="icon"/>
          </span>
          <span class="more-menu" v-show="isExtend">
            <font-awesome-icon icon="chevron-up" class="icon" />
          </span>
        </div>
      </div>
      <div v-else>
        <div class="login block-list disable-selection">
          <font-awesome-icon icon="sign-in-alt" class="login-icon" /> Login
        </div>
      </div>
      <transition name="fade">
        <div class="block-list disable-selection" v-if="isExtend" @click="goToProfile">
          <font-awesome-icon icon="cog" class="icon" /> Profile
        </div>
      </transition>
      <transition name="fade">
        <div class="block-list disable-selection" v-if="isExtend" @click="logout">
          <font-awesome-icon icon="sign-out-alt" class="icon" /> Logout
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/user-bar.js">
</script>

<style scoped>
  @keyframes extendUserBar {
    0% {
      height: 50px;
    }
    100% {
      height: 150px;
    }
  }

  @keyframes shrinkUserBar {
    0% {
      height: 150px;
    }
    100% {
      height: 50px;
    }
  }

  .block {
    display: flex;
    flex-direction: column;
    width: 260px;
    height: 50px;
    background: #FFFFFF;
    border: 1px solid #F2F2F2;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 0 0 20px 20px;
    text-align: left;
    z-index: 999;
    padding-top: 2px;
  }

  .block:hover {
    transition: all .4s ease;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.1), 2px 2px 10px rgba(0,0,0,0.3);
  }

  .block-extend {
    animation: extendUserBar 0.5s;
    animation-fill-mode: forwards;
  }

  .block-shrink {
    animation: shrinkUserBar 0.5s;
    animation-fill-mode: forwards;
  }

  .block-list {
    display: inline-block;
    padding: 15px 25px 15px 25px;
    min-width: 125px;
    font-size: 1em;
    font-weight: 200;
    cursor: pointer;
  }

  .block-list:hover {
    opacity: 0.8;
  }

  .block-list:active {
    opacity: 0.7;
  }

  .more-block {
    display: inline-block;
    float: right;
    margin: 6px 0 6px 0;
    padding: 10px 40px 5px 15px;
    border-left: 1px solid #BDBDBD;
    max-width: 10px;
  }

  .more-menu {
    cursor: pointer;
    padding-left: 5px;
    transition: all .3s ease;
  }

  .icon {
    margin-right: 5px;
  }

  .login {
    width: 200px;
  }

  .login-icon {
    margin-right: 35px;
  }

  .fade-enter-active {
    transition: opacity 1s;
  }

  .fade-leave-active {
    transition: opacity .1s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .disable-selection {
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer */
    -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
    -webkit-user-select: none; /* Chrome, Safari, and Opera */
    -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
  }
</style>
