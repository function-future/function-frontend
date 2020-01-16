<template>
  <div class="chatroom-list__container">
    <b-input
      icon="search"
      v-model="searchKeyword"
      placeholder="Search..."
      class="is-rounded chatroom-list__search" />
    <div class="chatroom-list__content">
      <div class="chatroom-list__element">
        <ChatroomCard
          :isSeen="true"
          lastMessage=""
          :avatar="require('@/assets/profile-picture-placeholder.png')"
          type="PRIVATE"
          :isChoosen="true"
          name="Public Chatroom"></ChatroomCard>
      </div>
      <div class="chatroom-list__element" v-for="i in 10" :key="i">
        <ChatroomCard
          :isSeen="false"
          :time="Date.now()"
          lastMessage="Hahahahaha"
          avatar="./favicon.ico"
          type="PRIVATE"
          :isChoosen="false"
          name="Public Chatroom"></ChatroomCard>
      </div>
    </div>
    <b-button class="chatroom-list__actions" size="is-medium" type="is-primary" @click="onClickAdd">
      <b-icon icon="plus" size="is-medium"></b-icon>
    </b-button>
  </div>
</template>

<script src="./js/chatroom-list.js">
</script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .chatroom-list {
    &__container {
      position: relative;
    }

    &__element {
      margin: 5px 10px;
    }

    &__actions {
      z-index: 5;
      transition: all 0.1s ease-in-out;
      box-shadow: 2px 2px 16px 4px rgba(0, 0, 0, 0.2);
      border-radius: 100%;
      position: absolute;
      right: 20px;
      bottom: 1vh;
    }

    &__content {
      height: 78vh;
      overflow-y: auto;
      overflow-x: hidden;
      @media only screen and (max-width: 1023px) {
        height: 78vh;
        padding-bottom: 1.25rem;
      }
    }

    &__search {
      margin: 10px;
    }
  }

</style>
