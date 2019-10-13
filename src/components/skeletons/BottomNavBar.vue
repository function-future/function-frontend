<template>
  <nav class="is-primary navbar is-link is-fixed-bottom has-shadow" role="navigation">
    <div class="navbar-brand">
      <a class="navbar-item is-expanded is-block has-text-centered">
        <router-link :to="{ name: 'feeds' }" class="mobile-router-link">
          <b-icon icon="home"></b-icon>
          <div class="is-size-7 menu-title">Home</div>
        </router-link>
      </a>
      <a class="navbar-item is-expanded is-block has-text-centered">
        <router-link :to="{ name: 'feeds' }" class="mobile-router-link">
          <b-icon icon="tasks"></b-icon>
          <p class="is-size-7 menu-title">Scoring</p>
        </router-link>
      </a>
      <a class="navbar-item is-expanded is-block has-text-centered">
        <router-link :to="{ name: 'chatrooms' }" class="mobile-router-link">
          <b-icon icon="comments"></b-icon>
          <p class="is-size-7 menu-title">Chatroom</p>
        </router-link>
      </a>
      <a class="navbar-item is-expanded is-block has-text-centered">
        <router-link :to="{ name: 'feeds' }" class="mobile-router-link">
          <b-icon icon="star"></b-icon>
          <p class="is-size-7 menu-title">PA</p>
        </router-link>
      </a>
      <a class="navbar-item is-expanded is-block has-text-centered">
        <router-link :to="{ name: 'profile' }" class="mobile-router-link">
          <!--TODO set this to account page that has list option: login, profile, change password-->
          <b-icon icon="user"></b-icon>
          <p class="is-size-7 menu-title">Account</p>
        </router-link>
      </a>
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
