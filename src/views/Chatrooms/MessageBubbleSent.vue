<template>
  <div class="message-container">
    <div class="message-content"><p>{{ message }}</p></div>
    <div class="message-time"> {{ convertClock() }}</div>
    <div></div>
  </div>
</template>

<script src="./js/message-bubble-sent.js">

</script>

<style scoped>
  p {
    margin: 0;
  }

  .message-container {
    display: flex;
    flex-direction: row-reverse;
  }

  .message-content {
    padding: 10px;
    margin-left: 10px;
    background: #02AAF3;
    color: #fff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
  }

  .message-content > p {
    font-size: 0.9rem;
    -ms-word-break: break-all;
    word-break: break-all;
  }

  .message-time {
    display: flex;
    align-items: flex-end;
    font-size: 0.8rem;
  }
</style>
