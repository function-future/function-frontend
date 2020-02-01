<template>
  <div class="auto-overflow-container">
    <div class="course-detail__container">
      <div class="course-detail__container__actions">
        <b-button rounded
                  icon-left="pen"
                  type="is-primary"
                  @click="goToEditPage"
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
      <div class="course-detail__container__header">
        <span class="is-size-5 has-text-weight-bold">
          {{ courseDetail.title }}
        </span>
      </div>
      <div class="course-detail__container__content wrap-word">
        <span class="content" v-html="descriptionCompiledMarkdown"></span>
        <div class="course-detail__container__content-download">
            <a class="button is-primary is-outlined"
               v-if="courseDetail.material"
               :href="courseDetail.material"
               download>
              Download material
            </a>
        </div>
      </div>
      <div class="course-detail__container__discussion-wrapper" v-if="!master">
        <div class="course-detail__container__discussion-title">
          <span class="has-text-grey has-text-weight-bold" v-if="discussionPaging.totalRecords">
            {{ discussionPaging.totalRecords }} discussions
          </span>
          <span class="has-text-grey" v-else>
            No discussions
          </span>
        </div>
        <div class="course-detail__container__discussion-container">
          <article class="media course-detail__container__discussion__list">
            <figure class="media-left">
              <p class="image is-32x32">
                <img class="is-rounded" :src="require('@/assets/profile-picture-placeholder.png')">
              </p>
            </figure>
            <div class="media-content">
              <div class="field">
                <p class="control">
                  <textarea class="textarea"
                            v-model="discussion.comment"
                            placeholder="Start a discussion...">
                  </textarea>
                </p>
              </div>
              <div class="field has-text-right">
                <b-button type="is-primary"
                          @click="postDiscussion"
                          :loading="submittingDiscussion"
                          :disabled="disableDiscussion">
                  Post discussion
                </b-button>
              </div>
            </div>
          </article>
          <article class="media course-detail__container__discussion__list"
                   v-for="discussion in discussions" :key="discussion.id">
            <figure class="media-left">
              <p class="image is-32x32">
                <img class="is-rounded" :src="require('@/assets/profile-picture-placeholder.png')">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <div class="has-text-weight-bold">
                  {{ discussion.author.name }}
                </div>
                <div class="is-size-7">
                  {{ discussion.createdAt | moment("dddd, MMMM Do YYYY") }}
                </div>
                <div class="course-detail__container__discussion__list-content">
                  {{ discussion.comment }}
                </div>
              </div>
            </div>
          </article>
          <infinite-loading @infinite="initDiscussion"
                            spinner="spiral">
            <div slot="no-more"></div>
            <div slot="no-results"></div>
          </infinite-loading>
        </div>
      </div>
    </div>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="showDeleteConfirmationModal = false"
                               @clickDelete="deleteThis">
      <div slot="description">Are you sure you want to delete this course?</div>
    </modal-delete-confirmation>
  </div>
</template>

<script src="./js/course-detail-revamp.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .course-detail {
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
