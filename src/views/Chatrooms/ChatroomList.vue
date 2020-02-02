<template>
  <div class="chatroom-list__container">
    <b-input
      icon="search"
      v-model="search"
      placeholder="Search..."
      class="is-rounded chatroom-list__search"/>
    <div class="chatroom-list__content">
      <div v-if="isLoading">
        <ListItem v-for="n in 4" v-bind:key="n" :loading="isLoading"></ListItem>
      </div>
      <template v-else>
        <template v-if="search">
          <div class="chatroom-list__element" @click="onChatroomCardClicked(chatroom.id)"
               v-for="chatroom in chatrooms" :key="chatroom.id">
            <ChatroomCard
              :isSeen="chatroom.lastMessage ? chatroom.lastMessage.seen : true"
              :time="chatroom.lastMessage && chatroom.lastMessage.time"
              :lastMessage="chatroom.lastMessage ? chatroom.lastMessage.message : ''"
              :avatar="chatroom.picture || { file: { thumbnail: require('@/assets/profile-picture-placeholder.png') } }"
              :isChoosen="!isMobile && chatroom.id === activeChatroomId"
              :type="chatroom.type"
              :totalMembers="chatroom.participants.length"
              :name="getChatroomName(chatroom)"></ChatroomCard>
          </div>
        </template>
        <template v-else>
          <div class="chatroom-list__element" @click="onChatroomCardClicked('public')"
          >
            <ChatroomCard
              :isSeen="true"
              lastMessage=""
              :avatar="{ file: { thumbnail: require('@/assets/profile-picture-placeholder.png') } }"
              :type="chatroomType.PUBLIC"
              :isChoosen="!isMobile && activeChatroomId === 'public'"
              name="Public Chatroom"></ChatroomCard>
          </div>
          <div class="chatroom-list__element" v-for="chatroom in chatrooms" @click="onChatroomCardClicked(chatroom.id)"
               :key="chatroom.id">
            <ChatroomCard
              :isSeen="chatroom.lastMessage ? chatroom.lastMessage.seen : true"
              :time="chatroom.lastMessage && chatroom.lastMessage.time"
              :lastMessage="chatroom.lastMessage ? chatroom.lastMessage.message : ''"
              :avatar="chatroom.picture || { file: { thumbnail: require('@/assets/profile-picture-placeholder.png') } }"
              :isChoosen="!isMobile && chatroom.id === activeChatroomId"
              :type="chatroom.type"
              :totalMembers="chatroom.participants.length"
              :name="getChatroomName(chatroom)"></ChatroomCard>
          </div>
          <infinite-loading ref="chatroomInfiniteLoading" :identifier="totalSize" @infinite="infiniteChatroomHandler">
            <div slot="no-more"></div>
            <div slot="no-results"></div>
            <div slot="spinner"></div>
          </infinite-loading>
        </template>
      </template>
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
      @media only screen and (max-width: 1023px) {
        height: 100%;
      }
    }

    &__element {
      margin: 0 10px;
      cursor: pointer;
      @media only screen and (max-width: 1023px) {
        margin: 0;
      }
    }

    &__actions {
      z-index: 5;
      transition: all 0.1s ease-in-out;
      box-shadow: 2px 2px 16px 4px rgba(0, 0, 0, 0.2);
      border-radius: 100%;
      position: absolute;
      right: 2rem;
      bottom: 2rem;
      @media only screen and (max-width: 1023px) {
        position: fixed;
        right: 2rem;
        bottom: 5.25rem;
      }
    }

    &__content {
      padding: 3px 0;
      height: 79vh;
      overflow-y: auto;
      overflow-x: hidden;
      @media only screen and (max-width: 1023px) {
        height: calc(100% - 50px);
      }
    }

    &__search {
      margin: 0 10px 10px 10px;
      box-sizing: border-box;
      @media only screen and (max-width: 1023px) {
        height: 30px;
      }
    }
  }

</style>
