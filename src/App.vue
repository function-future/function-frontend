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
