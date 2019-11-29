<template>
  <div class="auto-overflow-container">
    <section class="hero is-primary is-hidden-desktop">
      <div class="hero-body-container"
           :class="{'no-sticky-note__hero': !stickyNotesAvailable}">
        <img src="@/assets/logo.png"
             class="logo is-center"
             alt="function">
        <b-icon :icon="profileIcon"
                class="is-right"
                @click.native="goToProfile">
        </b-icon>
      </div>
      <div class="has-text-centered user-greeting"
           :class="{'no-sticky-note__greeting': !stickyNotesAvailable}"
           v-if="loggedIn">
        Hi, {{ currentUser.name }}!
      </div>
      <div class="overlap-header-background"></div>
    </section>
    <div class="floating-sticky-note">
      <div class="card is-rounded"
           @click="goToStickyNotesDetail">
        <div class="card-content is-flex">
          <b-icon icon="info-circle"
                  size="is-small"
                  class="info-icon">
          </b-icon>
          <div class="sticky-note-text">
            <div>
              <span class="has-text-weight-bold">
              {{ stickyNote.title || 'Sticky Notes' }}
            </span>
            </div>
            <div>
              <span class="content" v-html="stickyNotesDescriptionPreview(stickyNote.description)"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="app-menu is-size-7-mobile is-hidden-desktop">
      <div class="columns is-mobile is-vcentered is-multiline is-gapless is-centered">
        <div class="column is-4" @click="goToPage('announcements')">
          <div class="card-content">
            <div><b-icon icon="bullhorn" class="menu-icon"></b-icon></div>
            <div>Announcements</div>
          </div>
        </div>
        <div class="column is-4" @click="goToPage('activityBlogs')">
          <div class="card-content">
            <div><b-icon icon="newspaper" class="menu-icon"></b-icon></div>
            <div>Activity Blogs</div>
          </div>
        </div>
        <div class="column is-4" v-if="menuList.files" @click="goToPage('files')">
          <div class="card-content">
            <div><b-icon icon="file-alt" class="menu-icon"></b-icon></div>
            <div>Files</div>
          </div>
        </div>
        <div class="column is-4" v-if="menuList.batches" @click="goToPage('batches')">
          <div class="card-content">
            <div><b-icon icon="school" class="menu-icon"></b-icon></div>
            <div>Batches</div>
          </div>
        </div>
        <div class="column is-4" v-if="menuList.courses" @click="goToPage('courses')">
          <div class="card-content">
            <div><b-icon icon="chalkboard" class="menu-icon"></b-icon></div>
            <div>Courses</div>
          </div>
        </div>
        <div class="column is-4" v-if="menuList.users" @click="goToPage('users')">
          <div class="card-content">
            <div><b-icon icon="users" class="menu-icon"></b-icon></div>
            <div>Users</div>
          </div>
        </div>
      </div>
    </div>
    <div class="announcements">
      <div v-if="isLoadingAnnouncement">
        <ListItem v-for="n in 3" v-bind:key="n" :loading="isLoadingAnnouncement"></ListItem>
      </div>
      <div v-else>
        <div class="announcements__title is-size-5"
             @click="goToAnnouncementPage">
          <span>Announcements</span>
        </div>
        <div v-if="!announcementEmpty">
          <ListItem v-for="announcement in announcements"
                    v-bind:key="announcement.id"
                    @click="goToAnnouncementDetail(announcement.id)">
            <template #title>
              {{ announcement.title }}
            </template>
            <template #info>
              {{ announcement.updatedAt |  moment("MMMM Do, YYYY") }}
            </template>
            <template #content>
              <div class="wrap-word ellipsis">
                <span class="content" v-html="announcementPreview(announcement)"></span>
              </div>
            </template>
          </ListItem>
        </div>
        <div v-if="announcementEmpty && !failLoadAnnouncement">
          <EmptyState src="announcements-feeds">
            <template #title>
              Looks like there is no announcements!
            </template>
          </EmptyState>
        </div>
        <div v-if="announcementEmpty && failLoadAnnouncement">
          <EmptyState src="error" :errorState="true"></EmptyState>
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

  .sticky-note-text {
    font-size: 0.875rem;
  }

  .info-icon {
    margin-right: 1rem;
    margin-top: 0.2rem;
  }

  .menu-icon {
    margin-right: 0;
    margin-top: 0;
  }

  .app-menu {
    margin-bottom: 1rem;
    padding: 0.25rem 1rem 1rem 1rem;
    box-shadow: 0 15px 15px -10px rgba(0, 0, 0, 0.1);

    &__title {
      span {
        font-size: 1rem;
        font-weight: bold;
      }

      margin-top: 0.5rem;
      margin-bottom: 0.25rem;
    }

    .column {
      padding: 0.5rem;
    }

    .card-content {
      padding: 0.75rem 0;
      font-size: 0.75rem;
      text-align: center;
    }
  }

  .announcements {
    padding: 0.75rem 1.25rem;

    &__title {
      margin-left: 0.5rem;

      span {
        cursor: pointer;
        font-weight: bold;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
