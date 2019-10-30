<template>
  <div class="auto-overflow-container">
    <section class="hero is-primary is-hidden-desktop">
      <div class="hero-body-container"
           :class="{'no-sticky-note__hero': !stickyNotesAvailable}">
        <img src="@/assets/logo.png"
             class="logo is-center"
             alt="function">
        <b-icon icon="user-circle"
                class="is-right"
                @click.native="goToProfile">
        </b-icon>
      </div>
      <div class="has-text-centered user-greeting"
           :class="{'no-sticky-note__greeting': !stickyNotesAvailable}"
           v-if="loggedIn">
        Hi, {{ currentUser.name }}!
      </div>
      <div class="overlap-header-background"
           v-if="stickyNotesAvailable"></div>
    </section>
    <div class="floating-sticky-note"
         v-if="stickyNotesAvailable">
      <div class="card is-rounded"
           @click="goToStickyNotesDetail">
        <div class="card-content is-flex">
          <b-icon icon="info-circle"
                  size="is-small"
                  class="icon">
          </b-icon>
          <div class="is-size-6-mobile">
            <span class="has-text-weight-bold">
              {{ stickyNote.title }}
            </span>
            <span v-html="stickyNotesDescriptionPreview(stickyNote.description)"></span>
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
      <div v-if="isLoadingAnnouncement" class="loading">
        <font-awesome-icon icon="spinner"
                           spin class="icon-loading"
                           size="lg">
        </font-awesome-icon>
      </div>
      <div v-else>
        <div class="announcements__title is-size-5"
             @click="goToAnnouncementPage">
          <span>Announcements</span>
        </div>
        <div class="columns is-multiline is-vcentered is-size-7-mobile">
          <div class="column is-12 is-bordered announcements__item"
               v-for="announcement in announcements"
               v-bind:key="announcement.id"
               @click="goToAnnouncementDetail(announcement.id)">
            <div class="announcements__item-title is-size-6">
              {{ announcement.title }}
            </div>
            <div class="announcements__item-description is-size-6">
              {{ announcementPreview(announcement) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/feeds-revamp.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .logo {
    width: 6rem;
  }

  .overlap-header-background {
    background-color: #02AAF3;
    top: 0;
    height: 75px;
    margin-bottom: -70px;
  }

  .is-rounded {
    border-radius: 0.5rem;
  }

  .hero-body-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 1.5rem 0 1.5rem;
  }

  .user-greeting {
    margin: 0.75rem 0 0.25rem 0;
    font-weight: bold;
  }

  .no-sticky-note {
    &__hero {
      padding: 1.5rem 1.5rem 1rem 1.5rem;
    }

    &__greeting {
      margin: 0.25rem 0 1.5rem 0;
    }
  }

  .floating-sticky-note {
    padding: 1rem 1.5rem;

    .card-content {
      cursor: pointer;
      padding: 1rem;
    }
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

      margin-top: 0.5rem;
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
    padding: 1rem 1.25rem;

    &__title {
      span {
        cursor: pointer;
        font-weight: bold;

        &:hover {
          text-decoration: underline;
        }
      }

      margin-bottom: 0.75rem;
    }

    &__item {
      cursor: pointer;

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
