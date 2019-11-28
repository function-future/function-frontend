<template>
  <div class="auto-overflow-container">
    <div class="assignment-detail__container">
      <div class="assignment-detail__container__actions">
        <b-button rounded
                  icon-left="pen"
                  type="is-primary"
                  @click="goToEditAssignment"
                  v-if="accessList.edit">
          Edit
        </b-button>
        <b-button rounded
                  icon-left="trash"
                  type="is-danger"
                  @click="showDeleteConfirmationModal = true"
                  v-if="accessList.delete">
          Delete
        </b-button>
        <b-button rounded
                  class="is-pulled-right is-hidden-mobile"
                  icon-left="eye"
                  type="is-primary"
                  @click="goToRoomList"
                  v-if="accessList.edit">
          Rooms
        </b-button>
      </div>
      <div class="assignment-detail__container__header">
        <div class="assignment-detail__container__header-title">
          <span class="is-size-5 has-text-weight-bold">
            {{ assignmentDetail.title }}
          </span>
          <b-button rounded
                    class="is-pulled-right is-hidden-desktop is-small"
                    icon-left="eye"
                    type="is-primary"
                    @click="goToRoomList"
                    v-if="accessList.edit">
            Rooms
          </b-button>
        </div>
        <div class="assignment-detail__container__header__info">
          <div class="assignment-detail__container-header__info-date">
            <template>
              <b-field label="Deadline" label-position="on-border">
                <b-datepicker
                  v-model="dates"
                  :min-date="minDate"
                  range>
                </b-datepicker>
              </b-field>
            </template>
          </div>
        </div>
      </div>
      <div class="assignment-detail__container__content wrap-word">
        <span class="content" v-html="descriptionCompiledMarkdown"></span>
        <div class="assignment-detail__container__content-download">
          <a class="button is-primary is-outlined"
             v-if="assignmentDetail.file"
             :href="assignmentDetail.file"
             target="_blank">
            Download material
          </a>
        </div>
      </div>
    </div>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="showDeleteConfirmationModal = false"
                               @clickDelete="deleteThis">
      <div slot="description">Are you sure you want to delete this assignment?</div>
    </modal-delete-confirmation>
  </div>
</template>

<script type="text/javascript" src="./js/assignment-detail.js">
</script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";
  .assignment-detail {
    &__container {
      display: flex;
      flex-direction: column;
      padding: 1rem 1.25rem;
      @media only screen and (max-width: 1023px) {
        margin-bottom: 20vh;
      }

      &__actions {
        z-index: 5;
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
        margin-bottom: 0.5rem;

        &__info {
          margin-top: 0.5rem;
          &-date {

          }
        }
      }

      &__content {
        &-download {
          margin-top: 1rem;
        }
      }

      &__discussion {
        &-wrapper {
          margin-top: 1rem;
        }

        &-title {
          padding: 0.25rem 0.5rem;
          margin-bottom: 0.25rem;
        }

        &-container {
          padding: 0.5rem;
          border-radius: 0.25rem;
          background-color: #f9f9f9;
        }

        &__list {
          padding: 0.5rem 0.75rem 0.5rem 0.5rem;

          &-content {
            margin-top: 0.5rem;
          }
        }
      }
    }
  }
</style>
