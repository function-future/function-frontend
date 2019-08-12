<template>
  <div class="search-outer" :class="searchClass">
    <BaseInput placeholder="search" @keyup="event => $emit('keyup', event)" inputType="search-box" class="search-input" @input="emitValue" v-bind="$attrs"/>
    <div class="search-circle disable-selection"><font-awesome-icon icon="search" class="search-icon" /></div>
  </div>
</template>

<script src="./js/search-bar.js">

</script>

<style lang="scss" scoped>
  .search-input {
    position: absolute;
    z-index: 1;
    width: 100%;
    margin: auto;
  }

  .search-outer {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 0;
    width: 100%;
    height: 60px;
  }
  .search-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    position: absolute;
    z-index: 2;
    height: 50px;
    width: 50px;
    background-color: #02AAF3;
    border-radius: 50%;
    margin-right: 0;
    margin-left: auto;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }

    &:active {
      opacity: 1;
    }
  }

  .search-icon {
    color: white;
    font-size: 1.3rem;
  }

  .disable-selection {
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer */
    -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
    -webkit-user-select: none; /* Chrome, Safari, and Opera */
    -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
  }
</style>
