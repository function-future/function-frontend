<template>
  <div class="box is-marginless is-paddingless chatroom-card__wrapper"
       :class="{'chatroom-card__outer--blue-border': isChoosen}">
    <div class="chatroom-card__container">
      <div class="media chatroom-card__content"
           @click="$emit('click')">
        <div v-if="avatar" class="media-left">
          <figure class="image is-32x32">
            <img :src="avatar.file.thumbnail" class="image is-32x32 is-rounded">
          </figure>
        </div>
        <div class="media-content">
          <p><strong>{{ computedName }} {{ type === chatroomType.GROUP ? `(${totalMembers})` : '' }}</strong></p>
          <p class="chatroom-card__content--message">{{ computedLastMessage }}</p>
        </div>
        <div class="media-right">
          <p>{{ convertClock }}</p>
          <div class="chatroom-card__status__seen-wrapper">
            <div v-if="!isSeen" class="chatroom-card__status--seen-status"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script src="./js/chatroom-card.js">
</script>

<style lang="scss" scoped>
  .chatroom-card {
    &__wrapper {
      border-radius: 0;
    }

    &__container {
      padding: 20px 15px;
     }

    &__content {
      align-items: center;
    }

    &__outer--blue-border {
      border: 1px solid #02AAF3;
    }

    &__status--seen-status {
      -webkit-border-radius: 100%;
      -moz-border-radius: 100%;
      border-radius: 100%;
      background-color: #02AAF3;
      height: 10px;
      width: 10px;
      margin-top: 10px;
    }

    &__status__seen-wrapper {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
    }
  }

  .chatroom-card__outer {
    display: grid;
    grid-template-columns: auto 45px;
    background: #FFFFFF;
    border: 1px solid #F2F2F2;
    box-sizing: border-box;
    -webkit-box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.1);
    -moz-box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.1);
    box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.1);
    border-radius: 0.5rem;
    padding: 5px 5px 5px 5px;
    text-align: left;
    height: 55px;
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

  .chatroom-card__content {
    margin-left: 5px;
    margin-right: 5px;
  }

  .chatroom-card__content--message {
    font-size: 0.9rem;
  }

  p {
    margin: 0;
    font-size: 1rem;
  }

  .chatroom-card__status {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .chatroom-card__status > p {
    font-size: 0.7em;
  }
</style>
