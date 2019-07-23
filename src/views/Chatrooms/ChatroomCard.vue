<template>
  <div class="chatroom-card__outer"
       :class="{'chatroom-card__outer--with-avatar': avatar, 'chatroom-card__outer--blue-border': isChoosen}"
        @click="$emit('click')">
    <div v-if="avatar" class="chatroom-card__avatar">
      <img :src="avatar">
    </div>
    <div class="chatroom-card__content">
      <p><strong>{{ computedName }}</strong></p>
      <p class="chatroom-card__content--message">{{ computedLastMessage }}</p>
    </div>
    <div class="chatroom-card__status">
      <p>{{ convertClock }}</p>
      <div class="chatroom-card__status__seen-wrapper">
        <div v-if="!isSeen" class="chatroom-card__status--seen-status"></div>
      </div>
    </div>
  </div>
</template>

<script src="./js/chatroom-card.js">
</script>

<style scoped>
  .chatroom-card__outer {
    display: grid;
    grid-template-columns: auto 45px;
    background: #FFFFFF;
    border: 1px solid #F2F2F2;
    box-sizing: border-box;
    -webkit-box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.1);
    -moz-box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.1);
    box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.1);
    border-radius: 10px;
    padding: 5px 5px 5px 5px;
    text-align: left;
    height: 50px;
    margin: 5px 0;
    cursor: pointer;
  }

  .chatroom-card__outer--with-avatar {
    grid-template-columns: 40px auto 45px;
  }

  .chatroom-card__avatar {
    grid-column: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .chatroom-card__avatar > img {
    border-radius: 100%;
    height: 35px;
    width: 35px;
  }

  .chatroom-card__outer--blue-border {
    border: 2px solid #02AAF3
  }

  .chatroom-card__content {
    margin-left: 5px;
    margin-right: 5px;
  }

  .chatroom-card__content--message {
    font-size: 0.8em;
    margin-top: 5px;
  }

  p {
    margin: 0;
    font-size: 0.9em;
  }

  .chatroom-card__status {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .chatroom-card__status__seen-wrapper {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  .chatroom-card__status--seen-status {
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    background-color: #02AAF3;
    height: 8px;
    width: 8px;
  }

  .chatroom-card__status > p {
    font-size: 0.7em;
  }
</style>
