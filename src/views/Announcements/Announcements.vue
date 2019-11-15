<template>
  <div class="auto-overflow-container">
    <div class="announcements__container">
      <div class="announcements__actions" v-if="accessList.add">
        <b-button rounded
                  icon-left="plus"
                  type="is-primary"
                  @click="goToAddAnnouncement">
          Add
        </b-button>
      </div>
      <div class="announcements__content">
        <div v-if="isLoading">
          <ListItem v-for="n in 4" v-bind:key="n" :loading="isLoading"></ListItem>
        </div>
        <div v-if="!isLoading && !announcementEmpty">
          <ListItem @click="goToAnnouncementDetail(announcement.id)"
                    v-for="announcement in announcementList"
                    v-bind:key="announcement.id">
            <template #title>
              {{ announcement.title }}
            </template>
            <template #info>
              {{ announcement.updatedAt |  moment("MMMM Do, YYYY") }}
            </template>
            <template #content>
              <div class="wrap-word ellipsis">
                <span class="content" v-html="textPreview(announcement)"></span>
              </div>
            </template>
            <template #actions>
              <b-dropdown aria-role="list"
                          position="is-bottom-left"
                          v-if="accessList.edit || accessList.delete"
                          @click.prevent.stop>
                <button class="button is-text" slot="trigger">
                  <b-icon icon="ellipsis-v" size="is-small" class="icon"></b-icon>
                </button>
                <b-dropdown-item
                  aria-role="listitem"
                  @click="goToEditAnnouncement(announcement.id)"
                  v-if="accessList.edit">
                <span class="icon-wrapper">
                  <b-icon icon="edit" class="icon" size="is-small"></b-icon>
                  Edit
                </span>
                </b-dropdown-item>
                <b-dropdown-item
                  aria-role="listitem"
                  @click="openDeleteConfirmationModal(announcement.id)"
                  v-if="accessList.delete">
                <span class="icon-wrapper">
                  <b-icon icon="trash-alt" class="icon" size="is-small"></b-icon>
                  Delete
                </span>
                </b-dropdown-item>
                <b-dropdown-item
                  aria-role="listitem"
                  class="is-hidden-desktop">
                  <b-button type="is-light" expanded>Cancel</b-button>
                </b-dropdown-item>
              </b-dropdown>
            </template>
          </ListItem>
        </div>
        <div v-if="!isLoading">
          <div v-if="announcementEmpty && !failLoadAnnouncement">
            <EmptyState src="announcements">
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
      <div class="announcements__pagination-wrapper" v-if="!isLoading && !announcementEmpty">
        <b-pagination
          :total="paging.totalRecords"
          :current.sync="paging.page"
          :per-page="paging.size"
          @change="loadPage"
          range-before="1"
          range-after="2"
          order="is-centered">
        </b-pagination>
      </div>
      <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                                 @close="closeDeleteConfirmationModal"
                                 @clickDelete="deleteThisAnnouncement">
        <div slot="description">Delete this announcement ?</div>
      </modal-delete-confirmation>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/announcements.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .announcements {
    &__container {
      padding: 1rem 1.25rem;
      margin-bottom: 10vh;
    }

    &__actions {
      z-index: 5;

      @media only screen and (max-width: 1023px) {
        position: fixed;
        right: 5vw;
        bottom: 75px;
        transition: all 0.1s ease-in-out;
        box-shadow: 2px 2px 16px 4px rgba(0, 0, 0, 0.2);
        border-radius: 50%;
      }
    }

    &__content {
      margin-top: 0.5rem;
    }

    &__pagination {
      &-wrapper {
        margin: 1rem 0.5rem;
      }
    }
  }
</style>
