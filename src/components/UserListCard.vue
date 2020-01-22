<template>
  <div :class="customClass" class="box is-marginless user-list-card__container" @click="$emit('click')">
    <img class="user-list-card__avatar" :src="avatar || require('@/assets/profile-picture-placeholder.png')" alt="">
    <div class="user-list-card__info">
      <p class="user-list-card__info__name"><strong>{{ name }}</strong></p>
      <p class="user-list-card__info__university" v-if="this.role === 'STUDENT'">{{ university }}</p>
      <p class="user-list-card__info__role">{{ userType }}</p>
    </div>
    <slot></slot>
  </div>
</template>

<script src="./js/user-list-card.js">

</script>

<style scoped>
  p {
    margin: 0;
  }

  .user-list-card__container {
    display: flex;
    padding: 5px;
    align-items: center;
    border: 1px solid #F2F2F2;
    box-sizing: border-box;
    margin: 0;
    border-radius: 0;
  }

  .user-list-card__avatar {
    border-radius: 100%;
    object-fit: cover;
    height: 42px;
    width: 42px;
  }

  .user-list-card__info {
    margin-left: 10px;
  }

  .user-list-card__info__role, .user-list-card__info__university {
    font-size: 0.7rem;
  }

  .user-list-card__info__university {
    font-style: italic;
  }
</style>
