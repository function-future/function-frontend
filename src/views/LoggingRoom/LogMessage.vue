<template>
  <div class="message__outer">
    <div class="message__container">
      <div class="message__content">
        <div class="message__content__avatar"><img :src="avatar" onerror="this.src='@/assets/avatar.png'"></div>
        <div class="message__content__description">
          <span>{{ name }}</span>
          <div class="message__content__description__text">
            <span>{{ message }}</span>
          </div>
        </div>
        <div class="message__content__time">
          {{ convertClock() }}
        </div>
      </div>

    </div>
  </div>
</template>

<script src="./js/log-message.js">
</script>

<style lang="scss" scoped>
  .message {
    &__outer {
      width: 100%;
      display: flex;
      align-items: center;
    }

    &__container {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 10px;
    }

    &__content {
      font-size: 0.8rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &__avatar {
        align-self: flex-start;
      }
      &__avatar > img {
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        border-radius: 100%;
        height: 30px;
        width: 30px;
        min-width: 30px;
      }

      &__description{
        display: flex;
        flex-direction: column;
        width: 100%;
        text-align: left;
        padding: 0px 5px;
        font-size: 0.8rem;

        &__text {
          background: #F2F2F2;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          border-radius: 10px;
          font-size: 0.6rem;
          padding: 10px 5px;
          word-break: break-all;
        }
      }

      &__time {
        display: flex;
        align-items: flex-end;
        font-size: 0.8rem;
      }
    }

  }
</style>
