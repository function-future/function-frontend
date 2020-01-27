<template>
  <div>
    <CustomMobileNavBar :title="chatroomName">
      <b-icon icon="cog"
              class="chatroom-content__header__settings--icon"
              @click.native="showModal"
              v-if="chatroomId !== 'public' && chatroom.type && chatroom.type === chatroomType.GROUP"></b-icon>
    </CustomMobileNavBar>
    <div class="auto-overflow-container">
      <div v-if="!isMobile" class="chatroom-content__header">
        <div class="chatroom-content__header__chatroom-name"><p>{{ chatroomName }}</p></div>
        <div class="chatroom-content__header__settings">
          <b-icon icon="cog"
                  class="chatroom-content__header__settings--icon"
                  @click.native="showModal"
                  v-if="chatroomId !== 'public' && chatroom.type && chatroom.type === chatroomType.GROUP"></b-icon>
        </div>
      </div>
      <div class="chatroom-content__container">
        <div id="messages-container" class="chatroom-content__container__messages">
          <infinite-loading :identifier="chatroomId" direction="top" @infinite="infiniteMessageHandler">
            <div slot="no-more"></div>
            <div slot="no-results"></div>
            <div slot="no-loading"></div>
          </infinite-loading>
          <div v-for="message in computedMessagesDate" :key="message.id">
            <template v-if="message.isNewDate">
              <p class="chatroom-content__dateseparator">{{ printDateSeparator(message) }}</p>
            </template>
            <MessageBubbleSent v-if="message.sender.id === currentUser.id"
                               :message="message.text"
                               :clock="message.time"
                               class="chatroom-content__message-bubble"></MessageBubbleSent>

            <MessageBubbleReceived v-else
                                   :message="message.text"
                                   :clock="message.time"
                                   :name="message.sender.name"
                                   :avatar="message.sender.avatar"
                                   class="chatroom-content__message-bubble"></MessageBubbleReceived>
          </div>
        </div>
        <div class="chatroom-content__container__input">
          <b-field>
            <b-input type="is-primary" v-model="inputMessage" @keyup.native="onKeyup" placeholder="Type your message.." expanded></b-input>
            <p class="control">
              <button class="button is-primary" @click="sendMessage">Send</button>
            </p>
          </b-field>
        </div>
      </div>
    </div>
    <ModalChatroom v-if="showUpdateModal" @close="showUpdateModal = false"
                   @submit="onSubmitUpdateChatroom" :chatroomId="chatroomId"></ModalChatroom>
  </div>
</template>

<script src="./js/chatroom-content.js">
</script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .chatroom-content {
    &__container {
      padding: 0 0.5rem;
      height: calc(100% - 3.5rem);
      @media only screen and (max-width: 1023px) {
        height: calc(100vh - 60px - 3.25rem - 0.5rem)
      }

      &__messages {
        height: calc(100% - 2.5rem - 0.5rem - 5px);
        overflow: auto;
      }

      &__input {
        margin-top: 5px;
        height: 2.5rem;
        @media only screen and (max-width: 1023px) {
          position: fixed;
          bottom: 3.5rem;
          width: calc(100% - 1rem);
          padding: 0;
          z-index: 50;
        }
      }
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 1.25rem;
      height: 3.5rem;

      &__chatroom-name {
        p {
          font-size: 1.5rem;
        }
      }

      &__settings {
        &--icon {
          cursor: pointer;
        }
      }
    }

    &__dateseparator {
      text-align: center;
      font-size: 0.8rem;
    }

    &__message-bubble {
      margin: 15px 0;
    }
  }
</style>
