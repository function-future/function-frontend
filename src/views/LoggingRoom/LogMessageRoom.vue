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
          <div v-for="logMessage in logMessages" class="log-message__messages-room__message">
            <log-message :message="logMessage.text"
                         :clock="logMessage.createdAt"
                         :name="logMessage.senderName"
                         :avatar="logMessage.senderAvatar"
            ></log-message>
          </div>
        </div>
        <div class="log-message__input-bar">
          <div class="log-message__input-bar__text-area">
            <BaseInput class="text-area"
                          v-model="messageText"
                          placeholder="Type a message"
                          inputType="message-box">
            </BaseInput>
          </div>
          <div class="log-message__input-bar__btn-send">
            <BaseButton type="submit" buttonClass="button-save" @click="submitMessage">
              <font-awesome-icon icon="arrow-circle-right" class="icon"/> Send
            </BaseButton>
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
     overflow: auto;

     &__message {
       display: flex;
       align-items: center;
       flex-direction: column;
       padding: 5px 0px;
     }
   }

   &__input-bar {
     display: flex;
     align-items: center;
     width: 80%;
     justify-content: space-between;

     &__text-area {
       padding-left: 5%;
       padding-right: 2%;
       width: 100%;
     }
   }

   .text-area {

   }

   .btn-send{
     margin-left: 5px;
     height: 4vh;
   }
 }
</style>
