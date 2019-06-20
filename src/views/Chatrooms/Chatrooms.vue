<template>
  <div class="chatroom-outer">
    <BaseCard class="chatroom-card">
      <div class="chatroom-container">
        <div class="chatroom-left"><SearchBar @click="changeText" class="search"></SearchBar></div>
        <div class="chatroom-separator"></div>
        <div class="chatroom-right">{{ text }}</div>
      </div>
    </BaseCard>
  </div>
</template>

<script>
  import BaseCard from '@/components/BaseCard'
  import SearchBar from '@/components/SearchBar'
  export default {
    name: 'Chatrooms',
    components: {
      BaseCard,
      SearchBar
    },
    data() {
      return {
        text: ''
      }
    },
    methods: {
      changeText(value) {
        this.text = value;
      }
    }
  }
</script>

<style scoped>

  .chatroom-outer {
    display: flex;
    justify-content: center;
    height: 90%;
  }

  .chatroom-card {
    width: 900px;
    padding: 0;
  }

  .chatroom-container {
    display: grid;
    grid-template-columns: 30% 5px auto;
    height: 100%;
  }

  .chatroom-separator {
    background-color: #E7E7E7;
    height: 100%;
  }

  .chatroom-left {
    grid-column: 1;
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .chatroom-right {
    grid-column: 3;
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
