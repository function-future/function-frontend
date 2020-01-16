<template>
  <div class="auto-overflow-container chatroom__container">
    <div class="chatroom__left">
      <ChatroomList :mobile="isMobile" @clickAdd="showCreateModal = true"></ChatroomList>
    </div>
    <div v-if="!isMobile" class="chatroom__separator"></div>
    <div v-if="!isMobile" class="chatroom_right">
      <ChatroomContent></ChatroomContent>
    </div>
    <ModalChatroom v-if="showCreateModal" @close="showCreateModal = false" @submit="onSubmitNewChatroom"></ModalChatroom>
  </div>
</template>

<script src="./js/chatroom.js">
</script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";
  .chatroom {
    &__container {
      display: grid;
      grid-template-columns: auto 3px 70%;
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
      background-color: #E7E7E7;
      height: 100%;
    }
  }
</style>
