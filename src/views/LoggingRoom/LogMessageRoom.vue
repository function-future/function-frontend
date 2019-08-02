<template>
    <div class="log-message">
      <div class="log-message__container">
        <div class="log-messsage__title">
          <h2>{{title}}</h2>
        </div>
        <div class="log-message__messages-room">
        <infinite-loading direction="top" @infinite="infiniteHandler">
          <div slot="no-more"></div>
          <div slot="no-results"></div>
        </infinite-loading>
          <div class="log-message__messages-room__message">
            <log-message v-for="logMessage in logMessages"
                         :message="logMessage.text"
                         :clock="logMessage.createdAt"
                         :name="logMessage.senderName"
                         :avatar="logMessage.senderAvatar"
            ></log-message>
          </div>
        </div>
      </div>
    </div>
</template>

<script src="./js/log-message-room.js">
</script>

<style lang="scss" scoped>
  * {
    padding: 0px;
    margin: 0px;
  }

 .log-message {
   display: flex;
   align-items: center;
   flex-direction: column;
   height: 90vh;
   width: 100%;

   &__container {
     display: flex;
     flex-direction: column;
     align-items: center;

     @media only screen and (min-width: 800px) {
       width: 500px;
     }

     @media only screen and (min-width: 1300px) {
       width: 800px;
     }
   }

   &__messages-room {
     width: 80%;
     height: 75vh;
   }
 }
</style>
