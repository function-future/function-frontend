<template>
  <div class="mobile-navbar__wrapper" v-if="breadcrumbAvailable">
    <div class="mobile-navbar__container">
      <div class="mobile-navbar__back"
           @click="routeTo(breadcrumb.link)">
        <b-icon icon="arrow-left"></b-icon>
      </div>
      <div class="mobile-navbar__title">
        <span>{{ title }}</span>
      </div>
    </div>
  </div>
</template>

<script src="./js/mobile-nav-bar.js"></script>

<style lang="scss" scoped>
  .mobile-navbar {
    &__wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      padding: 1rem;
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.15);
      margin-bottom: 0.5rem;
    }

    &__back {
      position: absolute;
      float: left;
      left: 25px;
      margin-top: 2px;
      transition: all .2s ease;

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
