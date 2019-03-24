<template>
  <div id="app">
    <div class="left-nav">
      <HeaderComp></HeaderComp>
    </div>
    <div class="content">
      <BaseCard>
        <div class="buttons">
          <BaseButton type="reset" buttonClass="button-cancel">Cancel</BaseButton>
          <BaseButton type="submit" buttonClass="button-save">Save</BaseButton>
          <BaseButton type="submit" buttonClass="button-edit">Edit</BaseButton>
          <BaseButton type="submit" buttonClass="button-delete">Delete</BaseButton>
        </div>
        <div class="inputs">
          <BaseInput label="Test Input"></BaseInput>
        </div>
      </BaseCard>
      <router-view/>
    </div>
  </div>
</template>

<script>
  import HeaderComp from '@/components/skeletons/HeaderComp'
  import BaseButton from '@/components/BaseButton'
  import BaseInput from '@/components/BaseInput'
  import BaseCard from '@/components/BaseCard'

  export default {
    name: 'App',
    components: {
      HeaderComp,
      BaseButton,
      BaseInput,
      BaseCard
    }
  }
</script>

<style>
  html, body {
    height: 100%;
    margin: 0;
  }

  #app {
    height: 100%;
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .left-nav {
    display: inline-block;
    width: 27%;
    height: 100%;
  }

  .content {
    display: inline-block;
    width: 73%;
  }

  @media only screen and (min-width: 875px) {
    .left-nav {
      width: 24%;
    }

    .content {
      width: 76%;
    }
  }

  @media only screen and (min-width: 1000px) {
    .left-nav {
      width: 23%;
    }

    .content {
      width: 77%;
    }
  }

  @media only screen and (min-width: 1150px) {
    .left-nav {
      width: 19%;
    }

    .content {
      width: 81%;
    }
  }

  @media only screen and (min-width: 1500px) {
    .left-nav {
      width: 17%;
    }

    .content {
      width: 83%;
    }
  }
</style>
