<template>
  <div v-if="isMobile" class="mobile-navbar__wrapper">
    <div class="mobile-navbar__back" @click="$router.push({ name: 'chatrooms' })">
      <b-icon icon="chevron-left"></b-icon>
    </div>
    <div class="mobile-navbar__title">
      <span>{{ title }}</span>
    </div>
    <div class="mobile-navbar__content">
      <slot></slot>
    </div>
  </div>
</template>

<script src="./js/custom-mobile-nav-bar.js">
</script>

<style lang="scss" scoped>
  .mobile-navbar {
    &__wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      padding: 1rem;
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.15);
      margin-bottom: 0.5rem;
    }

    &__content {
      display: flex;
      align-items: center;
    }

    &__back {
      margin-top: 2px;
      transition: all .2s ease;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        opacity: 0.9;
      }

      &:active {
        opacity: 0.8;
      }
    }

    &__title {
      span {
        font-size: 1.1rem;
        font-weight: bold;
      }
    }
  }
</style>
