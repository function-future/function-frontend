<template>
  <div class="account__container container auto-overflow-container">
    <div class="account__summary columns is-multiline is-mobile">
      <div class="column">
        <article class="media">
          <figure class="media-left image is-64x64 is-image-horizontal-center">
            <img class="is-rounded" :src="currentUser.avatar">
          </figure>
          <div class="media-content">
            <div class="content">
              <div class="account__summary-name is-size-6">
                <div class="has-text-weight-bold">{{ currentUser.name }}</div>
                <div>{{ role }}</div>
              </div>
              <b-button type="is-primary"
                        outlined class="button"
                        @click="goToProfile">
                View Profile
              </b-button>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div class="columns is-multiline is-vcentered is-size-7-mobile">
      <div class="column is-12 is-bordered-bottom is-flex is-flex-content-centered account__menu"
           @click="goToChangePassword">
        <b-icon icon="key"></b-icon> Change Password
      </div>
      <div class="column is-12 is-bordered-bottom is-flex is-flex-content-centered account__menu"
           @click="logout">
        <b-icon icon="sign-out-alt"></b-icon> Logout
      </div>
    </div>
  </div>
</template>

<script src="./js/account.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .is-bordered-bottom {
    border-bottom: #E7E7E7 1px solid;
  }

  .is-flex-content-centered {
    align-items: center;
  }

  .account {
    &__container {
      padding: 1rem 1.25rem;
    }

    &__summary {
      padding: 1rem;

      &-name {
        margin-bottom: 0.5rem;
      }
    }

    &__menu {
      cursor: pointer;
    }
  }
</style>
