<template>
  <nav class="is-primary navbar is-link is-fixed-bottom has-shadow" role="navigation">
    <div class="navbar-brand">
      <router-link :to="{ name: 'feeds' }" class="navbar-item is-expanded is-block has-text-centered mobile-router-link" exact>
          <b-icon icon="home"></b-icon>
          <div class="is-size-7 menu-title">Home</div>
      </router-link>
      <router-link :to="{ name: 'points' }" class="navbar-item is-expanded is-block has-text-centered mobile-router-link">
        <b-icon icon="tasks"></b-icon>
        <p class="is-size-7 menu-title">Scoring</p>
      </router-link>
      <router-link :to="{ name: 'chatrooms' }" class="navbar-item is-expanded is-block has-text-centered mobile-router-link">
        <b-icon icon="comments"></b-icon>
        <p class="is-size-7 menu-title">Chatroom</p>
      </router-link>
      <router-link :to="{ name: 'loggingRoom' }" class="navbar-item is-expanded is-block has-text-centered mobile-router-link">
        <b-icon icon="star"></b-icon>
        <p class="is-size-7 menu-title">PA</p>
      </router-link>
    </div>
  </nav>
</template>

<script src="./js/bottom-nav-bar.js"></script>

<style lang="scss" scoped>
  .menu-title {
    line-height: 0.5rem;
  }

  .mobile-router-link {
    color: #FFFFFF;
  }
</style>
