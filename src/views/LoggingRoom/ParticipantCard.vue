<template>
  <div class="participant-card">
    <BaseCard class="participant-card__container">
      <div v-if="avatar" class="participant-card__content-left">
        <img :src="avatar">
      </div>
      <div class="participant-card__content-center">
        <p class="participant-card__content-center__name"><strong>{{ name }}</strong></p>
        <p class="participant-card__content-center__university">{{ university }}</p>
      </div>
      <div class="participant-card__content-right">
        <p class="participant-card__content-right__role">{{ computedRole }} - {{ batch }}</p>
      </div>
    </BaseCard>
  </div>
</template>

<script src="./js/participant-card.js">
</script>

<style lang="scss" scoped>
  * {
    padding: 0px;
    margin: 0px;
  }

  .participant-card {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 95%;
    padding: 2px 2.5%;

    &__container {
      display: flex;
      justify-content: space-between;
      padding: 0px;
      margin: 0px;
      width: 100%;
    }

    &__content-left {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 10px;
      flex-grow: 1;
    }

    &__content-left > img {
      border-radius: 100%;
      height: 40px;
      width: 40px;
      padding: 10px;
    }

    &__content-center {
      padding-top: 10px;
      flex-grow: 10;
      text-align: left;
    }

    &__content-right {
      flex-grow: 2;
      padding: 20px 10px 0px 0px;
    }
  }
</style>
