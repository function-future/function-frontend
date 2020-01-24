<template>
  <div class="menu-card__wrapper" v-on:click="$emit('click')">
    <div class="menu-card__container">
      <font-awesome-icon :icon="iconMenu" size="3x" class="icon blue"></font-awesome-icon>
      <span class="menu-title">{{iconTitle}}</span>
    </div>
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
      display: flex;
      background: #FFFFFF;
      border: 1px solid #F2F2F2;
      box-sizing: border-box;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      text-align: left;
      padding: 20px 10px;
      cursor: pointer;
      height: auto;
      align-items: center;
    }

    &__container:hover {
      cursor: pointer;
    }
  }
  .icon {
    margin : 0px;
  }

  .blue {
    color: #02AAF3;
  }

  .menu-title {
    align-self: center;
    font-weight: bold;
    font-size: 1.2rem;
  }
</style>
