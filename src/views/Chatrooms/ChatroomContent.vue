<template>
  <div>
    <CustomMobileNavBar :title="chatroomName">
      <b-icon icon="cog"
              v-if="chatroomId !== 'public' && chatroom.type && chatroom.type === chatroomType.GROUP"></b-icon>
    </CustomMobileNavBar>
    <div class="auto-overflow-container">
      <div v-if="!isMobile" class="chatroom-content__header">
        <div class="chatroom-content__header__chatroom-name"><p>{{ chatroomName }}</p></div>
        <div class="chatroom-content__header__settings">
          <b-icon icon="cog"
                  v-if="chatroomId !== 'public' && chatroom.type && chatroom.type === chatroomType.GROUP"></b-icon>
        </div>
      </div>
      <div class="chatroom-content__container">
        <div class="chatroom-content__container__messages"></div>
        <div class="chatroom-content__container__input">
          <b-field>
            <b-input type="is-primary" placeholder="Type your message.." expanded></b-input>
            <p class="control">
              <button class="button is-primary">Send</button>
            </p>
          </b-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/chatroom-content.js">
</script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .chatroom-content {
    &__container {
      padding: 1rem 1.25rem 0 1.25rem;
      height: calc(100% - 3.5rem);
      @media only screen and (max-width: 1023px) {
        height: 100%;
      }

      &__messages {
        height: calc(100% - 3rem)
      }

      &__input {
        height: 3rem;
        @media only screen and (max-width: 1023px) {
          position: fixed;
          bottom: 3.5rem;
          width: calc(100% - 2.5rem);
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
    }
  }
</style>
