<template>
  <div class="chatroom-outer">
    <BaseCard class="chatroom-card">
      <div class="chatroom-container">
        <div class="chatroom-left">
          <SearchBar @click="changeText"/>
          <div @click="changeTypeChoosen('PUBLIC')" class="chatroom-menu" :class="{'chatroom-menu-blue': typeChoosen === 'PUBLIC'}">
            <h3>Public Chatroom</h3>
          </div>
          <div @click="changeTypeChoosen('GROUP')" class="chatroom-menu" :class="{'chatroom-menu-blue': typeChoosen === 'GROUP'}">
            <h3>Group Chatroom</h3>
          </div>

          <ChatroomCard v-for="i in 5" avatar="https://www.w3schools.com/howto/img_avatar.png"/>
          <div @click="changeTypeChoosen('PRIVATE')" class="chatroom-menu" :class="{'chatroom-menu-blue': typeChoosen === 'PRIVATE'}">
            <h3>Private Chatroom</h3>
          </div>
        </div>
        <div class="chatroom-separator"></div>
        <div class="chatroom-right">{{ text }}</div>
      </div>
    </BaseCard>
  </div>
</template>

<script>
  import BaseCard from '@/components/BaseCard'
  import SearchBar from '@/components/SearchBar'
  import ChatroomCard from './ChatroomCard'
  export default {
    name: 'Chatrooms',
    components: {
      BaseCard,
      SearchBar,
      ChatroomCard
    },
    data() {
      return {
        text: '',
        typeChoosen: 'PUBLIC'
      }
    },
    methods: {
      changeText(value) {
        this.text = value;
      },
      changeTypeChoosen(type) {
        this.typeChoosen = type
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

  .chatroom-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0;
    cursor: pointer;
  }

  .chatroom-menu > h3, .chatroom-menu > font-awesome-icon {
    margin: 0
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
  
  .chatroom-menu-blue {
    color: #02AAF3;
  }
</style>
