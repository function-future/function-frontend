  <template>
  <div class="message-container">
    <div class="message-avatar"><img :src="avatar" onerror="this.src='@/assets/avatar.png'"></div>
    <div class="message-content">
      <p>{{ name }}</p>
      <div class="message-card">
        <p>{{ message }}</p>
        <div class="message-time">
          {{ convertClock() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script src="js/message-bubble-received.js">

</script>

<style scoped>
  p {
    margin: 0;
  }

  .message-container {
    display: flex;
  }

  .message-content {
    display: flex;
    flex-direction: column;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0 10px;
  }

  .message-card {
    display: flex;
  }

  .message-card > p {
    font-size: 0.9rem;
  }

  .message-content > p {
    font-size: 0.8rem;
  }

  .message-card > p {
    padding: 10px;
    margin-top: 5px;
    background: #F2F2F2;
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
    margin-left: 10px;
  }
</style>
