<template>
  <div id="app">
    <div class="left-nav" v-if="!isLoginPage">
      <HeaderComp></HeaderComp>
    </div>
    <div class="content">
      <div class="container">
        <div class="page-title">
          <BaseTitle>{{ title }}</BaseTitle>
          <Breadcrumbs></Breadcrumbs>
        </div>
        <div class="user-section" v-if="!isLoginPage">
          <UserBar></UserBar>
        </div>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./index.js">
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');

  html, body {
    height: 100%;
    margin: 0;
    color: #505050;
    font-size: 100%;
    line-height: 1.4rem;
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  }

  #app {
    height: 100%;
    font-family: 'Open Sans', Helvetica, Arial, sans-serif;
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
    overflow: hidden;
  }

  .container {
    display: flex;
    flex-direction: column;
    margin: 0 20px 20px 15px;
    height: 98vh;
  }

  .user-section {
    display: block;
    position: absolute;
    top: 0;
    right: 5vw;
    z-index: 999;
  }

  .scrollable-container {
    max-height: 90%;
    overflow: auto;
    padding-right: 5px;
  }

  .page-title {
    margin-left: 10px;
  }

  .blue {
    color: #02AAF3;
  }

  .red {
    color: #FF0000;
  }

  .toaster {
    background-color: #02AAF3 !important;
    font-family: Helvetica, Arial, sans-serif;
  }

  .error {
    background-color: #cc0000 !important;
  }

  .v-note-wrapper {
    min-height: 100%;
  }

  .v-note-op {
    border-radius: 10px 10px 0 0;
  }

  .v-note-panel {
    border-radius: 0 0 10px 10px;
  }

  .wrap-word{
    white-space: -moz-pre-wrap !important;  /* Mozilla, since 1999 */
    white-space: -webkit-pre-wrap; /*Chrome & Safari */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    white-space: pre-wrap;       /* css-3 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
    word-break: break-word;
    white-space: normal;
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

  ::-webkit-scrollbar-track {
    background-color: #F5F5F5;
    border-radius: 10px;
  }

  ::-webkit-scrollbar {
    width: 8px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #02AAF3;
  }

  ::-webkit-scrollbar-thumb:hover {
  }

  ::-webkit-scrollbar-thumb:active {
  }
</style>
