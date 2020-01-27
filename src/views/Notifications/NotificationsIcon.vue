<template>
  <b-icon
    @click.native="goToNotifications"
    class="icon"
    v-if="loggedIn"
    icon="bell"
    size="is-medium"
    :style="notification">
  </b-icon>
</template>

<script src="./notifications-icon.js">
</script>

<style scoped>

</style>
