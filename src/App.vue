<template>
  <div id="app">
    <div class="left-nav">
      <HeaderComp></HeaderComp>
    </div>
    <div class="content">
      <div class="container">
        <div class="title">
          <BaseTitle>Feeds</BaseTitle>
        </div>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="@/index.js">
</script>

<style>
  html, body {
    height: 100%;
    margin: 0;
    color: #505050;
  }

  #app {
    height: 100%;
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-color: white;
  }

  .left-nav {
    display: inline-block;
    width: 27vw;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }

  .content {
    display: inline-block;
    width: 73vw;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    overflow: auto;
  }

  .container {
    padding-left: 20px;
    padding-right: 20px;
  }

  @media only screen and (min-width: 875px) {
    .left-nav {
      width: 24vw;
    }

    .content {
      width: 76vw;
    }
  }

  @media only screen and (min-width: 1000px) {
    .left-nav {
      width: 23vw;
    }

    .content {
      width: 77vw;
    }
  }

  @media only screen and (min-width: 1150px) {
    .left-nav {
      width: 19vw;
    }

    .content {
      width: 81vw;
    }
  }

  @media only screen and (min-width: 1500px) {
    .left-nav {
      width: 17vw;
    }

    .content {
      width: 83vw;
    }
  }
</style>
