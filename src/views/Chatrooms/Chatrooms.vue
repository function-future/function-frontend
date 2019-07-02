<template>
  <div class="chatroom-outer">
    <BaseCard class="chatroom-card">
      <div class="chatroom-container">
        <div class="chatroom-left">
          <div class="chatroom-left-container">
            <SearchBar @input="changeSearchText"/>
            <template v-if="!isSearching">
              <div @click="changeTypeChoosen('PUBLIC')" class="chatroom-menu" :class="{'chatroom-menu-blue': typeChoosen === 'PUBLIC'}">
                <h3>Public Chatroom</h3>
              </div>
              <div @click="changeTypeChoosen('GROUP')" class="chatroom-menu" :class="{'chatroom-menu-blue': typeChoosen === 'GROUP'}">
                <h3>Group Chatroom</h3>
              </div>
              <div id="group-chatroom-container" v-if="typeChoosen === 'GROUP'" class="chatroom-card-wrapper">
                <ChatroomCard v-for="chatroom in chatrooms"
                              :type="chatroom.type"
                              :name="chatroom.name"
                              :is-choosen="chatroom.id === activeChatroomId"
                              :is-seen="chatroom.lastMessage ? chatroom.lastMessage.seen : true"
                              :time="chatroom.lastMessage ? chatroom.lastMessage.time : null"
                              :last-message="chatroom.lastMessage ? chatroom.lastMessage.message : 'No Message'"
                              :key="chatroom.id"
                              @click="selectChatroom(chatroom)"></ChatroomCard>
                <infinite-loading ref="chatroomInfiniteLoading" :identifier="typeChoosen" @infinite="infiniteChatroomHandler">
                  <div slot="no-more"></div>
                  <div slot="no-results"></div>
                </infinite-loading>
              </div>
              <div @click="changeTypeChoosen('PRIVATE')" class="chatroom-menu" :class="{'chatroom-menu-blue': typeChoosen === 'PRIVATE'}">
                <h3>Private Chatroom</h3>
              </div>
              <div id="private-chatroom-container" v-if="typeChoosen === 'PRIVATE' && !isSearching" class="chatroom-card-wrapper">
                <ChatroomCard v-for="chatroom in chatrooms"
                              :avatar="getAvatarAndName(chatroom.participants).avatar"
                              :type="chatroom.type"
                              :is-choosen="chatroom.id === activeChatroomId"
                              :name="getAvatarAndName(chatroom.participants).name"
                              :is-seen="chatroom.lastMessage ? chatroom.lastMessage.seen : true"
                              :time="chatroom.lastMessage ? chatroom.lastMessage.time : null"
                              :last-message="chatroom.lastMessage ? chatroom.lastMessage.message : 'No Message'"
                              @click="selectChatroom(chatroom)"
                              :key="chatroom.id"></ChatroomCard>
                <infinite-loading ref="chatroomInfiniteLoading" :identifier="typeChoosen" @infinite="infiniteChatroomHandler">
                  <div slot="no-more"></div>
                  <div slot="no-results"></div>
                </infinite-loading>
              </div>
            </template>
            <template v-else>
              <div class="chatroom-card-searching-wrapper">
                <ChatroomCard v-for="chatroom in privateChatrooms"
                              :avatar="getAvatarAndName(chatroom.participants).avatar"
                              :type="chatroom.type"
                              :is-choosen="chatroom.id === activeChatroomId"
                              :name="getAvatarAndName(chatroom.participants).name"
                              :is-seen="chatroom.lastMessage ? chatroom.lastMessage.seen : true"
                              :time="chatroom.lastMessage ? chatroom.lastMessage.time : null"
                              :last-message="chatroom.lastMessage ? chatroom.lastMessage.message : 'No Message'"
                              @click="selectChatroom(chatroom)"
                              :key="chatroom.id"></ChatroomCard>
                <ChatroomCard v-for="chatroom in groupChatrooms"
                              :type="chatroom.type"
                              :name="chatroom.name"
                              :is-choosen="chatroom.id === activeChatroomId"
                              :is-seen="chatroom.lastMessage ? chatroom.lastMessage.seen : true"
                              :time="chatroom.lastMessage ? chatroom.lastMessage.time : null"
                              :last-message="chatroom.lastMessage ? chatroom.lastMessage.message : 'No Message'"
                              :key="chatroom.id"
                              @click="selectChatroom(chatroom)"></ChatroomCard>
              </div>
            </template>
          </div>
          <div class="chatroom-button-add-container">
            <font-awesome-icon icon="plus" class="chatroom-button-add"/>
          </div>
        </div>
        <div class="chatroom-separator"></div>
        <div class="chatroom-right">
          <div class="chatroom-title"><h2>{{ chatroomTitle }}</h2></div>
          <div id="messages-container" class="chatroom-messages">
            <infinite-loading :identifier="activeChatroomId" direction="top" @infinite="infiniteMessageHandler">
              <div slot="no-more"></div>
              <div slot="no-results"></div>
            </infinite-loading>
            <div v-for="message in computeMessagesDate(messages)" :key="message.id">
              <template v-if="message.isNewDate">
                <p class="chatroom-messages-dateseparator">{{ printDateSeparator(message) }}</p>
              </template>
              <MessageBubbleSent v-if="message.sender.id === userId"
                                 :message="message.text"
                                 :clock="message.time"
                                 class="chatroom-message-bubble"></MessageBubbleSent>

              <MessageBubbleReceived v-else
                                     :message="message.text"
                                     :clock="message.time"
                                     :name="message.sender.name"
                                     :avatar="message.sender.avatar"
                                     class="chatroom-message-bubble"></MessageBubbleReceived>
            </div>
          </div>
          <BaseInput v-model="messageText" @keyup="submitMessage" placeholder="Type a message" inputType="message-box"></BaseInput>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script src="./js/Chatrooms.js">
</script>

<style scoped>

  .chatroom-search-notfound {
    margin: 0;
    color: #AAAAAA;
    font-size: 0.9rem;
  }

  .chatroom-card-wrapper {
    max-height: 40vh;
    overflow: auto;
    padding: 10px;
  }

  .chatroom-card-searching-wrapper {
    max-height: 60vh;
    overflow: auto;
    padding: 10px;
  }

  .chatroom-outer {
    display: flex;
    justify-content: center;
    height: 80vh;
  }

  .chatroom-card {
    width: 900px;
    padding: 0;
    height: 80vh;
  }

  .chatroom-container {
    display: grid;
    grid-template-columns: 33% 5px auto;
    margin-left: 0;
    height: 80vh;
  }

  .chatroom-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0;
    cursor: pointer;
  }

  .chatroom-menu > h3, .chatroom-menu > font-awesome-icon {
    margin: 0
  }

  .chatroom-separator {
    background-color: #E7E7E7;
    height: 100%;
  }

  .chatroom-left {
    grid-column: 1;
    padding: 10px 15px 10px 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .chatroom-right {
    grid-column: 3;
    padding: 15px;
    height: 80vh;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .chatroom-title {
    height: 6vh;
  }

  .chatroom-title > h2 {
    margin: 1vh 0 0 0;
  }

  .chatroom-messages {
    height: calc(68vh - 30px);
    margin: 10px 0;
    padding: 0 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    overflow: auto;
  }

  .chatroom-messages-dateseparator {
    text-align: center;
    font-size: 0.8rem;
  }

  .chatroom-message-bubble {
    margin: 15px 0;
  }

  .chatroom-menu-blue {
    color: #02AAF3;
  }

  .chatroom-button-add {
    color: #02AAF3;
    font-size: 1.4rem;
    cursor: pointer;
  }

  .chatroom-button-add-container {
    display: flex;
    justify-content: center;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #FFF;
    -webkit-box-shadow: inset 1px 1px 2px rgba(0,0,0,0.1);
  }
  ::-webkit-scrollbar-thumb {
    background: #CCC;
    -webkit-box-shadow: inset 1px 1px 2px rgba(0,0,0,0.2);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #AAA;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #888;
    -webkit-box-shadow: inset 1px 1px 2px rgba(0,0,0,0.3);
  }
</style>
