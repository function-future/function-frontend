<template>
  <div class="auto-overflow-container">
    <div class="auto-overflow-container">
      <div class="quiz-detail__container">
        <div class="quiz-detail__container__actions">
          <b-button rounded
                    icon-left="pen"
                    type="is-primary"
                    @click="goToEditQuiz"
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
        </div>
        <div class="quiz-detail__container__header">
          <div class="quiz-detail__container__header-title">
            <span class="is-size-5 has-text-weight-bold">
              {{ quizDetail.title }}
            </span>
          </div>
          <div class="quiz-detail__container__content wrap-word">
            <span class="quiz-detail__container__content-description content" v-html="descriptionCompiledMarkdown"></span>
            <div class="tile is-ancestor">
              <div class="tile is-parent">
                <article class="tile is-child box">
                  <p>Start Date</p>
                  <p class="subtitle has-text-weight-bold">{{ quizDetail.startDate | moment("MMMM Do YYYY") }}</p>
                </article>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child box">
                  <p>End Date</p>
                  <p class="subtitle has-text-weight-bold">{{ quizDetail.endDate | moment("MMMM Do YYYY") }}</p>
                </article>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child box">
                  <span>Time Limit </span>
                  <span style="font-size: 0.6rem">({{isMinutes ? 'Minutes' : 'Hours'}})</span>
                  <p class="subtitle has-text-weight-bold">{{ quizDetail.timeLimit }}</p>
                </article>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child box">
                  <p>Trials</p>
                  <p class="subtitle has-text-weight-bold">{{ quizDetail.trials }}</p>
                </article>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child box">
                  <p>Question Count</p>
                  <p class="subtitle has-text-weight-bold">{{ quizDetail.questionCount }}</p>
                </article>
              </div>
            </div>
          </div>
          <template>
            <section>
              <b-collapse class="card" aria-id="contentIdForA11y3">
                <div
                  slot="trigger"
                  slot-scope="props"
                  class="card-header"
                  role="button"
                  aria-controls="contentIdForA11y3">
                  <p class="card-header-title">
                    Question Banks
                  </p>
                  <a class="card-header-icon">
                    <b-icon
                      :icon="props.open ? 'chevron-down' : 'chevron-up'">
                    </b-icon>
                  </a>
                </div>
                <div class="card-content">
                  <div class="content">
                    <div v-for="bank in quizDetail.questionBanks" :key="bank.id">
                      <ListItem>
                        <template #title>
                          {{ bank.title }}
                        </template>
                      </ListItem>
                    </div>
                  </div>
                </div>
              </b-collapse>
            </section>
          </template>
        </div>
        <div class="quiz-detail__container__footer" v-if="!!currentUser && currentUser.role === 'STUDENT'">
          <b-button type="is-primary"
                    @click="goToStudentQuiz"
                    :disabled="!trialsExist">
            Start
          </b-button>
        </div>
      </div>
      <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                                 @close="showDeleteConfirmationModal = false"
                                 @clickDelete="deleteThisQuiz">
        <div slot="description">Are you sure you want to delete this quiz?</div>
      </modal-delete-confirmation>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/quiz-detail.js">
</script>




<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .quiz-detail {
    &__container {
      display: flex;
      flex-direction: column;
      padding: 1rem 1.25rem;
      @media only screen and (max-width: 1023px) {
        margin-bottom: 10vh;
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
        margin-bottom: 1rem;

        &-description {
          /deep/ p {
            margin-bottom: 0.5rem;
          }
        }
      }

      &__footer {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
