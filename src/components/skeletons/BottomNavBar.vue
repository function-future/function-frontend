<template>
  <nav class="is-primary navbar is-link is-fixed-bottom has-shadow" role="navigation">
    <div class="navbar-brand">
      <a @click="goToPage('feeds')" class="navbar-item is-expanded is-block has-text-centered mobile-router-link" exact>
          <b-icon icon="home"></b-icon>
          <div class="is-size-7 menu-title">Home</div>
      </a>
      <a @click="goToPage('points')" class="navbar-item is-expanded is-block has-text-centered mobile-router-link">
        <b-icon icon="tasks"></b-icon>
        <p class="is-size-7 menu-title">Scoring</p>
      </a>
      <a @click="goToPage('chatrooms')" class="navbar-item is-expanded is-block has-text-centered mobile-router-link">
        <b-icon icon="comments"></b-icon>
        <p class="is-size-7 menu-title">Chatroom</p>
      </a>
      <a @click="goToPage('menuMobileQuestionnaire')" class="navbar-item is-expanded is-block has-text-centered mobile-router-link">
        <b-icon icon="chart-bar"></b-icon>
        <p class="is-size-7 menu-title">PA</p>
      </a>
      <a @click="goToPage('loggingRoom')" class="navbar-item is-expanded is-block has-text-centered mobile-router-link">
        <b-icon icon="clipboard-list"></b-icon>
        <p class="is-size-7 menu-title">LogRoom</p>
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
