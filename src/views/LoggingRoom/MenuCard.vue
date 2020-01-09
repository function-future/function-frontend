<template>
  <div class="menu-card__wrapper" v-on:click="$emit('click')">
    <BaseCard class="menu-card__container">
      <font-awesome-icon :icon="iconMenu" size="lg" class="icon blue"></font-awesome-icon>
      <span class="menu-title"><b>{{iconTitle}}</b></span>
    </BaseCard>
  </div>
</template>

<script src="./js/menu-card.js">
</script>

<style lang="scss" scoped>

  * {
    padding: 0;
    margin: 0;
  }
  .menu-card{
    &__container {
      margin: 0px;
      padding: 30px;
      display: flex;
      justify-content: flex-start;
    }

    &__container:hover {
      cursor: pointer;
    }
  }
  .icon {
    height: 4rem;
    width: 4rem;
    margin : 0px 10px;
  }

  .blue {
    color: #02AAF3;
  }

  .menu-title {
    align-self: center;
    font-size: 2rem;
  }
</style>
