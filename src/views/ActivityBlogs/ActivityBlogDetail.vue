<template>
  <div class="auto-overflow-container">
    <div class="activity-blog-detail__container">
      <div class="activity-blog-detail__container__actions">
        <b-button rounded
                  icon-left="pen"
                  type="is-primary"
                  @click="goToEditActivityBlog"
                  v-if="accessList.edit && (currentUser.id === activityBlog.author.id || currentUser.role === 'ADMIN')">
          Edit
        </b-button>
        <b-button rounded
                  icon-left="trash"
                  type="is-danger"
                  @click="openDeleteConfirmationModal"
                  v-if="accessList.delete && (currentUser.id === activityBlog.author.id || currentUser.role === 'ADMIN')">
          Delete
        </b-button>
      </div>
      <div class="activity-blog-detail__container__header">
        <div class="activity-blog-detail__container__header-title">
          <span class="is-size-5 has-text-weight-bold">
            {{ activityBlog.title }}
          </span>
        </div>
        <div class="activity-blog-detail__container__header-info">
          <div class="activity-blog-detail__container__header-info-author">
            by <span class="has-text-weight-bold">{{ activityBlog.author.name }}</span>
          </div>
          <div class="activity-blog-detail__container__header-info-date">
            <span class="is-size-7">
              {{ activityBlog.updatedAt | moment("dddd, MMMM Do YYYY") }}
            </span>
          </div>
        </div>
      </div>
      <div class="activity-blog-detail__container__content wrap-word">
        <span v-html="descriptionCompiledMarkdown"></span>
      </div>
    </div>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="showDeleteConfirmationModal = false"
                               @clickDelete="deleteThisActivityBlog">
      <div slot="description">Are you sure you want to delete this activity blog?</div>
    </modal-delete-confirmation>
  </div>
</template>

<script type="text/javascript" src="./js/activity-blog-detail.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .activity-blog-detail {
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

        &-info {
          margin-top: 0.25rem;
          padding-left: 0.5rem;
          border-left: 1px solid #BDBDBD;
          line-height: 1.25rem;
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
