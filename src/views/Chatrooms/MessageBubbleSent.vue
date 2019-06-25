<template>
  <div class="message-container">
    <div class="message-content"><p>{{ message }}</p></div>
    <div class="message-time"> {{ convertClock() }}</div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'MessageBubbleSent',
  props: {
    message: String,
    clock: Number
  },
  methods: {
    convertClock () {
      return moment(this.clock).format('HH:mm')
    }
  }
}
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
  }

  .message-time {
    display: flex;
    align-items: flex-end;
    font-size: 0.8rem;
  }
</style>
