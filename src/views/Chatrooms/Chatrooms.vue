<template>
  <div class="chatroom-outer">
    <BaseCard class="chatroom-card">
      <div class="chatroom-container">
        <div class="chatroom-left">
          <SearchBar @input="changeText"/>
          <div @click="changeTypeChoosen('PUBLIC')" class="chatroom-menu" :class="{'chatroom-menu-blue': typeChoosen === 'PUBLIC'}">
            <h3>Public Chatroom</h3>
          </div>
          <div @click="changeTypeChoosen('GROUP')" class="chatroom-menu" :class="{'chatroom-menu-blue': typeChoosen === 'GROUP'}">
            <h3>Group Chatroom</h3>
          </div>
          <div @scroll="scrollGroup" v-if="typeChoosen === 'GROUP'" class="chatroom-card-wrapper">
            <ChatroomCard v-for="i in 10"/>
          </div>
          <div @click="changeTypeChoosen('PRIVATE')" class="chatroom-menu" :class="{'chatroom-menu-blue': typeChoosen === 'PRIVATE'}">
            <h3>Private Chatroom</h3>
          </div>
          <div @scroll="scrollPrivate" v-if="typeChoosen === 'PRIVATE'" class="chatroom-card-wrapper">
            <ChatroomCard v-for="i in 10" avatar="https://www.w3schools.com/howto/img_avatar.png"/>
          </div>
          <font-awesome-icon icon="plus"/>
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
        console.log(value);
        this.text = value;
      },
      changeTypeChoosen(type) {
        this.typeChoosen = type
      },
      scrollGroup(event) {
        console.log(event);
      },
      scrollPrivate(event) {
        console.log(event);
      }
    }
  }
</script>

<style scoped>

  .chatroom-card-wrapper {
    height: 50%;
    overflow: auto;
    padding: 10px;
  }

  .chatroom-outer {
    display: flex;
    justify-content: center;
    height: 90%;
  }

  .chatroom-card {
    width: 900px;
    padding: 0;
    height: 100%;
  }

  .chatroom-container {
    display: grid;
    grid-template-columns: 33% 5px auto;
    margin-left: 0;
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
    padding: 10px 15px 10px 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    height: 100%;
  }

  .chatroom-right {
    grid-column: 3;
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    height: 100%;
  }
  
  .chatroom-menu-blue {
    color: #02AAF3;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #FFF;
    -webkit-box-shadow: inset 1px 1px 2px rgba(0,0,0,0.1);
  }
  ::-webkit-scrollbar-thumb {
    background: #CCC;
    -webkit-box-shadow: inset 1px 1px 2px rgba(0,0,0,0.2);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #AAA;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #888;
    -webkit-box-shadow: inset 1px 1px 2px rgba(0,0,0,0.3);
  }
</style>
