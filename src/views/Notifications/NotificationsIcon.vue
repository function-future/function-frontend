<template>
  <span class="notification-icon__container">
    <b-icon
      @click.native="goToNotifications"
      class="notification-icon__icon"
      icon="bell"
      size="is-medium"
      :style="notification">
    </b-icon>
    <span v-if="notification.total > 0" class="notification-icon__total" >{{ notification.total }}</span>
  </span>
</template>

<script src="./js/notifications-icon.js">
</script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .notification-icon {
    &__container {
      margin: 0 10px;
    }

    &__total {
      color: red;
      font-size: 0.9rem;
      font-weight: bold;
    }

    &__icon {
      margin: 0;
    }
  }
</style>
