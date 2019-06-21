<template>
  <div class="search-outer" :class="searchClass">
    <BaseInput inputType="search-box" class="search-input" @input="updateValue"/>
    <div @click="emitClick" class="search-button"><font-awesome-icon icon="search" class="search-icon" /></div>
  </div>
</template>

<script>
  import BaseInput from './BaseInput'
  export default {
    name: "SearchBar",
    components: {
      BaseInput
    },
    props: {
      searchClass: {
        type: String
      }
    },
    data() {
      return {
        value: ''
      }
    },
    methods: {
      updateValue (value) {
        this.value = value
      },
      emitClick() {
        this.$emit('click', this.value)
      }
    }
  }
</script>

<style scoped>
  .search-input {
    position: absolute;
    z-index: 1;
    width: 83%;
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
  .search-button {
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    position: absolute;
    z-index: 2;
    height: 55px;
    width: 55px;
    background-color: #02AAF3;
    border-radius: 50%;
    margin-right: 0;
    margin-left: auto;
    cursor: pointer;
  }

  .search-icon {
    color: white;
    font-size: 1.3rem;
  }
</style>
