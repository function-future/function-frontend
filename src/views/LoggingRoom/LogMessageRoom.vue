<template>
    <div class="log-message">
      <div class="log-message__container">
        <div class="log-message__title">
          {{title}}
          <br>
        </div>
        <div class="log-message__messages-room">
          <infinite-loading direction="top" ref="infiniteLoading" @infinite="infiniteHandler">
            <div slot="no-more"></div>
            <div slot="no-results"></div>
          </infinite-loading>
          <div v-for="logMessage in computedLogMessagesDate(logMessages)" class="log-message__messages-room__message">
            <template class="log-message__messages-room__date-separator" v-if="logMessage.isNewDate">
              <p>{{ printDateSeparator(logMessage) }}</p>
            </template>
            <log-message :message="logMessage.text"
                         :clock="logMessage.createdAt"
                         :name="logMessage.senderName"
                         :avatar="logMessage.senderAvatar"
            ></log-message>
          </div>
        </div>
        <div class="log-message__input-bar" v-if="accessList.add">
          <div class="log-message__input-bar__text-area">
            <b-input v-model="messageText"
                     placeholder="Type a message"
                     @keyup.native="submitMessageButton"
            ></b-input>
          </div>
          <div class="log-message__input-bar__btn-send">
            <font-awesome-icon icon="arrow-circle-up" class="icon button-save" @click="submitMessage"/>
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
   height: calc(100vh - 60px - 0.5rem);
   width: 100%;

   &__title{
     font-size: 1.2rem;
     font-weight: bold;
   }

   &__container {
     display: flex;
     flex-direction: column;
     align-items: center;
     width: 40vw;

     @media only screen and (max-width: 1023px) {
       width: 100vw;
     }
   }

   &__messages-room {
     width: 100%;
     height: 78vh;
     overflow: auto;
     &__message {
       display: flex;
       align-items: center;
       flex-direction: column;
       padding: 5px 0px;
     }

     &__date-separator {
       text-align: center;
       font-size: 0.8rem;
     }
   }

   &__input-bar {
     display: flex;
     align-items: center;
     justify-content: space-between;
     width: 100%;
     padding-left: 2%;
     padding-right: 2%;

     &__text-area {
       width: 100%;
     }

     &__btn-send {
       margin-left: 2%;
       font-size: 2rem;
       cursor: pointer;
     }

   }

   .button-save {
     display: flex;
     align-self: center;
     height: 100%;
     vertical-align: 0em;
     color: #02AAF3;
   }
   .button-save:hover {
     box-shadow: 2px 2px 8px rgba(0,0,0,0.08), 2px 2px 10px rgba(0,0,0,0.15);
     border-radius: 50%;
   }

 }
</style>
