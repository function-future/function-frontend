<template>
  <b-navbar class="is-primary is-spaced is-navbar">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="@/assets/logo.png" alt="Function">
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="span">
        <Breadcrumbs></Breadcrumbs>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item v-if="!loggedIn"
                     tag="div">
        <div class="buttons" @click="login">
          <a class="button is-light">Login</a>
        </div>
      </b-navbar-item>
      <b-dropdown class="buttons" v-if="loggedIn"
                  position="is-bottom-left"
                  aria-role="menu">
        <button class="button is-primary navbar-item"
           slot="trigger"
           role="button"
           outlined>
          <span>{{ firstName }}</span>
          <b-icon icon="menu-down"></b-icon>
        </button>
        <b-dropdown-item custom aria-role="menuitem">
          Logged as <b>{{ role }}</b>
        </b-dropdown-item>
        <hr class="dropdown-divider">
        <b-dropdown-item aria-role="menuitem" @click="goToNotifications">
          Notifications
        </b-dropdown-item>
        <b-dropdown-item aria-role="menuitem" @click="goToProfile">
          Profile
        </b-dropdown-item>
        <hr class="dropdown-divider" aria-role="menuitem">
        <b-dropdown-item aria-role="menuitem" @click="logout">
          Logout
        </b-dropdown-item>
      </b-dropdown>
    </template>
  </b-navbar>
</template>

<script src="./js/nav-bar.js"></script>

<style lang="scss" scoped></style>
