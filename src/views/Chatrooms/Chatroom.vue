<template>
  <div class="auto-overflow-container chatroom__container">
    <div class="chatroom__left">
      <ChatroomList
        :activeChatroomId="activeChatroomId"
        @clickAdd="showCreateModal = true"
        @onClickChatroom="onClickChatroom"></ChatroomList>
    </div>
    <div v-if="!isMobile" class="chatroom__separator"></div>
    <div v-if="!isMobile" class="chatroom_right">
      <ChatroomContent v-if="activeChatroomId" :chatroomId="activeChatroomId"></ChatroomContent>
    </div>
    <ModalChatroom v-if="showCreateModal" @close="showCreateModal = false"
                   @submit="onSubmitNewChatroom"></ModalChatroom>
  </div>

</template>

<script src="./js/chatroom.js">
</script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .chatroom {
    &__container {
      display: grid;
      grid-template-columns: auto 2px 65%;
      @media only screen and (max-width: 1023px) {
        grid-template-columns: 100%;
      }
    }

    &__left {
      grid-column: 1;
    }

    &__right {
      grid-column: 3;
    }

    &__separator {
      background-color: #bfbfbf;
      height: 100%;
    }
  }
</style>
