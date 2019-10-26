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
      <div v-if="isLoading" class="loading">
        <font-awesome-icon icon="spinner" spin class="icon-loading" size="lg"></font-awesome-icon>
      </div>
      <div v-if="!isLoading">
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
              <span v-html="textPreview(announcement)"></span>
            </div>
          </template>
          <template #actions>
            <b-dropdown aria-role="list" position="is-bottom-left" @click.prevent.stop>
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
            </b-dropdown>
          </template>
        </ListItem>
      </div>
      <BasePagination :paging="paging"
                      @loadPage="loadPage"
                      @previousPage="loadPreviousPage"
                      @nextPage="loadNextPage">
      </BasePagination>
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

    &__list {
      &-wrapper {
        display: flex;
        justify-content: space-between;
        padding: 0.75rem 1rem;
        min-height: 100px;
        cursor: pointer;
        border-bottom: #E7E7E7 1px solid;
      }

      &-container {
        width: 100%;

        &__header {
          margin-bottom: 0.25rem;

          &-title {
            max-width: 55vw;

            @media only screen and (max-width: 1023px) {
              max-width: 65vw;
            }
          }

          &-date {
            border-left: 1px solid #BDBDBD;
            padding-left: 0.5rem;
            font-size: 0.75rem;
          }
        }

        &__content {
          max-height: 150px;
        }
      }

      &__actions {
        margin-left: 0.5rem;
      }
    }
  }

  .loading {
    margin-top: 50px;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
