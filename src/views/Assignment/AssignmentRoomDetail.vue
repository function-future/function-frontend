<template>
  <div class="auto-overflow-container">
    <div class="room-detail__container">
      <div class="room-detail__container__header">
        <div class="room-detail__container__header-title">
          <span class="is-size-5 has-text-weight-bold">
            {{ roomDetail.assignment.title }}
          </span>
        </div>
      </div>
      <div class="room-detail__container__content wrap-word">
        <div class="room-detail__container__content-download">
          <span class="content" v-html="descriptionCompiledMarkdown"></span>
          <a class="button is-primary is-outlined"
             v-if="roomDetail.assignment.file"
             :href="roomDetail.assignment.file"
             target="_blank">
            Download material
          </a>
        </div>
      </div>
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
                      {{ discussion.createdAt | moment("dddd, MMMM Do YYYY") }}
                    </div>
                    <div class="room-detail__container__discussion__list-content">
                      {{ discussion.comment }}
                    </div>
                  </div>
                </div>
              </article>
              <infinite-loading @infinite="initDiscussion" :distance="4"
                                spinner="spiral">
                <div slot="no-more"></div>
                <div slot="no-results"></div>
              </infinite-loading>
              <article class="media room-detail__container__discussion__list">
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
        </div>
      </b-collapse>
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
      margin-bottom: 2rem;

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
      }
    }
  }

  /deep/ figure {
    margin-right: 0!important;
    margin-left: 0!important;
  }

  .card-content {
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
