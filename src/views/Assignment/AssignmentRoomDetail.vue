<template>
  <div class="auto-overflow-container">
    <div class="room-detail__container">
      <div class="room-detail__container__header">
        <div class="room-detail__container__header-title">
          <span class="is-size-5 has-text-weight-bold">
            {{ roomDetail.assignment.title }}
          </span>
        </div>
        <div class="room-detail__container__header__info">
          <div class="room-detail__container__header__info-date">
            <span class="is-size-7">
              {{ roomDetail.assignment.uploadedDate | moment("dddd, MMMM Do YYYY") }}
            </span>
          </div>
        </div>
      </div>
      <div class="room-detail__container__content wrap-word">
        <div class="room-detail__container__content-download">
          <span class="content" v-html="descriptionCompiledMarkdown"></span>
          <a class="button is-primary is-outlined"
             v-if="roomDetail.assignment.file"
             :href="roomDetail.assignment.file"
             download>
            Download material
          </a>
        </div>
      </div>
      <template>
        <b-field label="Deadline" label-position="on-border" v-if="!!roomDetail.assignment && !!roomDetail.assignment.deadline">
          <b-datepicker
            v-model="deadline"
            placeholder="Assignment deadline"
            :mobile-native="false"
            disabled>
          </b-datepicker>
        </b-field>
      </template>
      <b-collapse class="card room-detail__container__discussion" aria-id="contentIdForA11y3" v-if="accessList.add && accessList.add.score" :open="false">
        <div
          slot="trigger"
          slot-scope="props"
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3">
          <p class="card-header-title">
            Score
          </p>
          <a class="card-header-icon">
            <b-icon
              :icon="props.open ? 'chevron-down' : 'chevron-up'">
            </b-icon>
          </a>
        </div>
        <div class="card-content">
          <div class="content">
            <b-field>
              <b-input placeholder="Score"
                       type="number"
                       min="0"
                       max="100"
                       v-model="roomDetail.point">
              </b-input>
            </b-field>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="updateScore">Submit</a>
        </footer>
      </b-collapse>
      <b-collapse class="card room-detail__container__discussion" aria-id="contentIdForA11y3">
        <div
          slot="trigger"
          slot-scope="props"
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3">
          <p class="card-header-title">
            Discussions
          </p>
          <a class="card-header-icon">
            <b-icon
              :icon="props.open ? 'chevron-down' : 'chevron-up'">
            </b-icon>
          </a>
        </div>
        <div class="card-content">
          <div class="content">
            <div class="room-detail__container__discussion-container">
              <article class="media room-detail__container__discussion__list"
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
                      {{ discussion.createdAt | moment("dddd, MMMM Do YYYY - h:mm") }}
                    </div>
                    <div class="room-detail__container__discussion__list-content">
                      {{ discussion.comment }}
                    </div>
                  </div>
                </div>
              </article>
              <infinite-loading @infinite="initDiscussion" :distance="4" direction="top"
                                spinner="spiral">
                <div slot="no-more"></div>
                <div slot="no-results"></div>
              </infinite-loading>
            </div>
          </div>
        </div>
      </b-collapse>
      <article class="media room-detail__container__discussion__box">
        <div class="media-content">
          <div class="field">
            <p class="control">
                  <textarea class="textarea"
                            v-model="discussion.comment"
                            placeholder="Say something..."
                            :disabled="!accessList.add">
                  </textarea>
            </p>
          </div>
          <div class="field has-text-right" v-if="accessList.add">
            <b-button type="is-primary"
                      @click="submitComment">
              Post discussion
            </b-button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/assignment-room-detail.js">
</script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";
  .room-detail {
    &__container {
      padding: 1rem 1.25rem;
      @media only screen and (max-width: 1024px) {
        margin-bottom: 10vh;
      }

      &__header {
        margin-bottom: 0.5rem;

        &__info {
          border-left: 1px solid #BDBDBD;
          padding-left: 0.5rem;
        }
      }

      &__content {
        margin-bottom: 0.75rem;
      }

      &-title {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
      }

      &-description {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
      }

      &-upload {
        margin-top: 0.5rem;
        margin-bottom: 1rem;
      }

      &-date {
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
      }

      &-actions {
        display: flex;
        justify-content: flex-end;
      }

      &__discussion {
        margin-top: 1rem;
        @media only screen and (max-width: 1023px) {
          &__list {
            padding: 0.5rem;
          }
        }
        &__box {
          margin-top: 1rem;
        }
      }
    }
  }

  /deep/ figure {
    margin-right: 0!important;
    margin-left: 0!important;
  }

  .card-content {
    @media only screen and (min-width: 1023px) {
      max-height: 35vh;
      overflow-y: auto;
    }
    @media only screen and (max-width: 1023px) {
      padding: 0;
    }

    &-action {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }
</style>
