<template>
  <div :class="customClass" class="user-list-card__container" @click="$emit('click')">
    <img class="user-list-card__avatar" :src="avatar" alt="">
    <div class="user-list-card__info">
      <p class="user-list-card__info__name"><strong>{{ name }}</strong></p>
      <p class="user-list-card__info__university" v-if="this.role === 'STUDENT'">{{ university }}</p>
      <p class="user-list-card__info__role">{{ userType }}</p>
    </div>
    <slot></slot>
  </div>
</template>

<script src="js/user-list-card.js">

</script>

<style scoped>
  p {
    margin: 0;
  }

  .user-list-card__container {
    display: flex;
    padding: 10px;
    align-items: center;
    border: 1px solid #F2F2F2;
    box-sizing: border-box;
    -webkit-box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.1);
    -moz-box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.1);
    box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.1);
    height: 72px;
    margin: 5px 0;
    border-radius: 10px;
  }

  .user-list-card__avatar {
    border-radius: 100%;
    height: 40px;
    width: 40px;
  }

  .user-list-card__info {
    margin-left: 10px;
  }

  .user-list-card__info > p {
    margin: 2px 0;
  }

  .user-list-card__info__role, .user-list-card__info__university {
    font-size: 0.7rem;
  }

  .user-list-card__info__university {
    font-style: italic;
  }
</style>
