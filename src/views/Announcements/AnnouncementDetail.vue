<template>
  <div class="auto-overflow-container">
    <div class="announcement__container">
      <div class="announcement__container__actions">
        <b-button rounded
                  icon-left="pen"
                  type="is-primary"
                  @click="goToEditAnnouncement"
                  v-if="accessList.edit">
          Edit
        </b-button>
        <b-button rounded
                  icon-left="trash"
                  type="is-danger"
                  @click="openDeleteConfirmationModal"
                  v-if="accessList.delete">
          Delete
        </b-button>
      </div>
      <div class="announcement__container__header">
        <div class="announcement__container__header-title">
          <span class="is-size-5 has-text-weight-bold">
            {{ announcement.title }}
          </span>
        </div>
        <div class="announcement__container__header__info">
          <div class="announcement__container-header__info-date">
            <span class="is-size-7">
              {{ announcement.updatedAt | moment("dddd, MMMM Do YYYY") }}
            </span>
          </div>
        </div>
      </div>
      <div class="announcement__container__content wrap-word">
        <span class="content" v-html="descriptionCompiledMarkdown"></span>
      </div>
    </div>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="showDeleteConfirmationModal = false"
                               @clickDelete="deleteThisAnnouncement">
      <div slot="description">Are you sure you want to delete this announcement?</div>
    </modal-delete-confirmation>
  </div>
</template>

<script type="text/javascript" src="./js/announcement-detail.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .announcement {
    &__container {
      display: flex;
      flex-direction: column;
      padding: 1rem 1.25rem;

      &__actions {
        margin-bottom: 0.75rem;

        button {
          margin-left: 0.25rem;
          margin-right: 0.25rem;

          &:first-child {
            margin-left: 0;
          }
        }

        @media only screen and (max-width: 1023px) {
          margin-bottom: 0;
          display: flex;
          flex-direction: column;
          position: fixed;
          right: 5vw;
          bottom: 75px;
          transition: all 0.1s ease-in-out;
          border-radius: 50%;

          button {
            margin: 0.25rem 0;
            box-shadow: 2px 2px 16px 4px rgba(0, 0, 0, 0.1);
          }
        }
      }

      &__header {
        margin-bottom: 0.75rem;

        &__info {
          border-left: 1px solid #BDBDBD;
          padding-left: 0.5rem;
        }
      }

      &__content {
        @media only screen and (max-width: 1023px) {
          margin-bottom: 15vh;
        }
      }
    }
  }

  /deep/ img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-height: 300px;
  }
</style>
