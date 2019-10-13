<template>
  <div class="auto-overflow-container">
    <section class="hero is-primary is-hidden-desktop">
      <div class="hero-body-container">
        <div class="container has-text-centered">
          <img src="@/assets/logo.png"
               class="logo is-center"
               alt="function">
        </div>
      </div>
      <div class="overlap-header-background"></div>
    </section>
    <div class="floating-sticky-note">
      <div class="card is-rounded">
        <div class="card-content is-flex">
          <b-icon icon="info-circle" size="is-small" class="icon"></b-icon>
          <div class="is-size-7-mobile">
            Sticky Note
          </div>
        </div>
      </div>
    </div>
    <div class="app-menu is-size-7-mobile is-hidden-desktop">
      <div class="app-menu__title">
        <span>Menus</span>
      </div>
      <div class="columns is-mobile is-vcentered">
        <div class="column is-3">
          <div class="card is-rounded">
            <div class="card-content">
              Announcement
            </div>
          </div>
        </div>
        <div class="column is-3">
          <div class="card is-rounded">
            <div class="card-content">
              Blogs
            </div>
          </div>
        </div>
        <div class="column is-3">
          <div class="card is-rounded">
            <div class="card-content">
              Course
            </div>
          </div>
        </div>
        <div class="column is-3">
          <div class="card is-rounded">
            <div class="card-content">
              Files
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="announcements">
      <div class="announcements__title">
        <span>Announcements</span>
      </div>
      <div class="columns is-multiline is-vcentered">
        <div class="column is-12 is-bordered announcements__item">
          <div class="announcements__item-title">
            Title Title Title
          </div>
          <div class="announcements__item-description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
        <div class="column is-12 is-bordered announcements__item">
          <div class="announcements__item-title">
            Title Title Title
          </div>
          <div class="announcements__item-description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
        <div class="column is-12 is-bordered announcements__item">
          <div class="announcements__item-title">
            Title Title Title
          </div>
          <div class="announcements__item-description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
        <div class="column is-12 is-bordered announcements__item">
          <div class="announcements__item-title">
            Title Title Title
          </div>
          <div class="announcements__item-description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
        <div class="column is-12 is-bordered announcements__item">
          <div class="announcements__item-title">
            Title Title Title
          </div>
          <div class="announcements__item-description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
        <div class="column is-12 is-bordered announcements__item">
          <div class="announcements__item-title">
            Title Title Title
          </div>
          <div class="announcements__item-description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
        <div class="column is-12 is-bordered announcements__item">
          <div class="announcements__item-title">
            Title Title Title
          </div>
          <div class="announcements__item-description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/feeds-v2.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .logo {
    width: 8rem;
  }

  .overlap-header-background {
    background-color: #02AAF3;
    top: 0;
    height: 50px;
    margin-bottom: -45px;
  }

  .is-rounded {
    border-radius: 0.5rem;
  }

  .hero-body-container {
    padding: 1.5rem 3rem 0 3rem;
  }

  .floating-sticky-note {
    padding: 1rem 1.5rem;
  }

  .icon {
    margin-right: 1rem;
    margin-top: 0.2rem;

    @media only screen and (max-width: 768px) {
      margin-top: 0;
    }
  }

  .app-menu {
    margin-bottom: 1rem;
    padding: 0 1rem 1.5rem 1rem;
    box-shadow: 0 15px 15px -10px rgba(0, 0, 0, 0.1);

    &__title {
      span {
        font-size: 1rem;
        font-weight: bold;
      }

      margin-bottom: 0.75rem;
    }

    .column {
      padding: 0.5rem;
    }

    .card-content {
      padding: 1.5rem 0;
      font-size: 0.5rem;
      text-align: center;
    }
  }

  .announcements {
    padding: 1rem;

    &__title {
      span {
        font-size: 1rem;
        font-weight: bold;
      }

      margin-bottom: 0.75rem;
    }

    &__item {
      font-size: 0.75rem;

      &-title {
        font-weight: bold;
      }

      &-description {
        margin-top: 0.25rem;
      }
    }

    .is-bordered {
      border-bottom: #E7E7E7 1px solid;
    }
  }
</style>
