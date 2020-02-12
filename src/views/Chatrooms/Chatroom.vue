<template>
  <div class="chatroom__container">
    <div class="chatroom__left">
      <ChatroomList
        :activeChatroomId="activeChatroomId"
        @clickAdd="showCreateModal = true"
        @onClickChatroom="onClickChatroom"></ChatroomList>
    </div>
    <div v-if="!isMobile" class="chatroom__right">
      <ChatroomContent v-if="activeChatroomId" :chatroomId="activeChatroomId"></ChatroomContent>
      <div v-else class="chatroom__empty-state__wrapper">
        <EmptyState class="chatroom__empty-state" src="empty-chatrooms"></EmptyState>
      </div>
    </div>
    <ModalChatroom v-if="showCreateModal" @close="showCreateModal = false"
                   @submit="onSubmitNewChatroom"></ModalChatroom>
  </div>

</template>

<script src="./js/chatroom.js">
</script>

<style lang="scss" scoped>
  .auto-overflow-container {
    height: 85vh;
    overflow-y: auto;
    overflow-x: hidden;

    @media only screen and (max-width: 1023px) {
      height: calc(100vh - 60px - 0.5rem - 3.25rem);
    }
  }

  .chatroom {
    &__container {
      display: flex;
      @media only screen and (max-width: 1023px) {
        flex-direction: column;
        height: calc(100vh - 60px - 0.5rem - 3.25rem);

      }
    }

    &__left {
      flex-grow: 1;
      @media only screen and (max-width: 1023px) {
        height: calc(100% - 0.5rem);
      }
    }

    &__right {
      flex-basis: 70%;
      flex-grow: 3;
    }

    &__empty-state {
      align-items: center;

      &__wrapper {
        display: flex;
        height: 100%
      }
    }
  }
</style>
