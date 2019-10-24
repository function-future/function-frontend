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
        <div class="card is-rounded announcements__card-container"
             v-for="announcement in announcementList"
             v-bind:key="announcement.id"
             @click.stop="goToAnnouncementDetail(announcement.id)">
          <div class="announcements__card__header">
            <div class="announcements__card__header-info">
              <div class="announcements__card__header-info-title ellipsis">
                <span class="has-text-weight-bold">
                  {{ announcement.title }}
                </span>
              </div>
              <div class="announcements__card__header-info-date">
                {{ announcement.updatedAt |  moment("MMMM Do, YYYY") }}
              </div>
            </div>
            <div class="announcements__card__header-actions">
              <span class="announcements__card__header-actions-desktop">
                  <b-button icon-left="edit"
                            type="is-text"
                            @click.stop="goToEditAnnouncement(announcement.id)"
                            v-if="accessList.edit">
                  </b-button>
                  <b-button icon-left="trash-alt"
                            type="is-text"
                            @click.stop="openDeleteConfirmationModal(announcement.id)"
                            v-if="accessList.delete">
                  </b-button>
                </span>
              <b-button icon-left="ellipsis-v"
                        type="is-text"
                        @click.stop="openActionModal(announcement.id)"
                        v-if="accessList.delete">
              </b-button>
            </div>
          </div>
          <div class="announcement__card-content wrap-word">
            <span v-html="textPreview(announcement)"></span>
          </div>
        </div>
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

    &__card {
      &-container {
        padding: 0.75rem 1rem;
        margin: 0.75rem 0;
        min-height: 100px;
        cursor: pointer;
      }

      &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &-info {
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

        &-actions {
          margin-left: 0.5rem;

          &-desktop {
            @media only screen and (max-width: 1023px) {
              display: none;
            }
          }
        }
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
