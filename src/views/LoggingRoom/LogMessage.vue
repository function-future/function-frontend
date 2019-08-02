<template>
  <div class="message-container">
    <div class="message-content">
      <div class="message-content__user-info">
        <div class="message-avatar"><img :src="avatar" onerror="this.src='@/assets/avatar.png'"></div>
        <div class="message-name">
          <p>{{ name }}</p>
        </div>
        <div class="message-time">
          {{ convertClock() }}
        </div>
      </div>
      <div class="break-line">
        <hr>
      </div>
      <div class="message-card">
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script src="./js/log-message.js">
</script>

<style lang="scss" scoped>
  hr {
    padding: 0px;
    margin: 0px;
  }

  p {
    margin: 0;
  }

  .message-container {
    width: 90%;
    display: flex;
    align-items: center;
  }

  .message-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #F2F2F2;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 5px 10px;
    border-radius: 10px;
  }

  .message-card {
    display: flex;
  }

  .message-card > p {
    font-size: 0.9rem;
  }

  .message-content {

    &__user-info {
      font-size: 0.8rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      padding: 10px 0px 0px 10px;
      justify-content: space-between;
    }
  }

  .message-card > p {
    padding: 10px;
    margin-top: 5px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    -ms-word-break: break-all;
    word-break: break-all;
  }

  .message-avatar > img {
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    height: 35px;
    width: 35px;
  }

  .message-time {
    display: flex;
    align-items: flex-end;
    font-size: 0.8rem;
    margin-right: 10px;

  }

  .message-name {
    flex-grow: 5;
    text-align: left;
    padding-left: 5px;
    font-size: 1rem;
  }
</style>
