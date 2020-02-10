<template>
  <div class="participant-card__outer">
    <div class="participant-card__container">
      <div class="participant-card__content-left">
        <img :src="avatar" onerror="this.src='@/assets/avatar.png'">
      </div>
      <div class="participant-card__content-center">
        <p class="participant-card__content-center__name"><strong>{{ name }}</strong></p>
        <p class="participant-card__content-center__university">{{ university }}</p>
      </div>
      <div class="participant-card__content-right">
        <p class="participant-card__content-right__role">{{ computedRole }} - {{ batch }}</p>
      </div>
    </div>
  </div>
</template>

<script src="./js/participant-card.js">
</script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  * {
    padding: 0px;
    margin: 0px;
  }

  .participant-card {
    &__outer {
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 2px 2.5%;
      @media only screen and (max-width: 1023px) {
        padding: 0px;
        margin: 0px 2px;
      }
    }

    &__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      background: #FFFFFF;
      border: 1px solid #F2F2F2;
      box-sizing: border-box;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      text-align: left;
      margin: 5px 10px;
      padding: 10px;
      cursor: pointer;
      height: auto;
    }

    &__content-left {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
    }

    &__content-left > img {
      border-radius: 100%;
      height: 40px;
      width: 40px;
    }

    &__content-center {
      flex-grow: 10;
      text-align: left;
    }

    &__content-right {
      flex-grow: 2;
    }
  }
</style>
