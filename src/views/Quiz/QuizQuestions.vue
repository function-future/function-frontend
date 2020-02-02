<template>
  <div class="auto-overflow-container">
    <div class="quiz-questions__container">
      <div class="quiz-questions__container__header">
        <div>
          <Timer class="quiz-questions__container__header-timer"
                 v-if="!isLoading"
                 :timeLimit="quizDetail.timeLimit"
                 @finish="submitQuiz"
                 ref="timer"></Timer>
        </div>
      </div>
    </div>
    <b-steps
      v-model="currentNumber"
      :animated="true"
      :has-navigation="true"
      :icon-prev="prevIcon"
      :icon-next="nextIcon">

      <b-step-item v-for="(question, idx) in studentQuizQuestions"
                   :key="question.number"
                   :label="(question.number) + ''"
                   :clickable="true" :type="{'is-primary': !!answers[idx], 'is-light': !answers[idx]}">
        <h1 class="title has-text-centered" v-html="question.text"></h1>
        <div class="columns is-mobile" v-for="(option) in question.options" :key="option.id">
          <div class="column is-flex">
            <b-radio-button class="quiz-questions__container__options" :native-value="option.id" v-model="answers[idx]">
              <ListItem :minHeight="'50px'">
                <template #title>{{ option.label }}</template>
              </ListItem>
            </b-radio-button>
          </div>
        </div>
      </b-step-item>
      <template
        v-if="customNavigation"
        slot="navigation"
        slot-scope="{previous, next}">
        <div class="quiz-questions__container__actions">
          <b-button
            class="quiz-questions__container__actions-prev"
            outlined
            type="is-danger"
            icon-pack="fas"
            icon-left="backward"
            :disabled="previous.disabled"
            @click.prevent="previous.action">
            Previous
          </b-button>
          <b-button
            class="quiz-questions__container__actions-next"
            outlined
            type="is-success"
            icon-pack="fas"
            icon-right="forward"
            :disabled="next.disabled"
            @click.prevent="next.action" v-if="!next.disabled">
            Next
          </b-button>
          <b-button
            outlined
            type="is-primary"
            icon-pack="fas"
            icon-right="check-circle" class="quiz-questions__container__actions-submit"
            @click="submitQuiz"
            :disabled="isSubmitting" v-if="!!next.disabled">
            Submit
          </b-button>
        </div>
      </template>
    </b-steps>
    <QuizModal v-if="showPointModal" :result="result" :trialsLeft="trialsLeft" @retry="restart" @finish="finish">

    </QuizModal>
  </div>
</template>

<script type="text/javascript" src="./js/quiz-questions.js">
</script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .quiz-questions {
    &__container {
      &__header {
        &-timer {
          margin: 0.5em 0 1em 0;
        }
      }
      &__options {
        width: 100%;
      }
      &__actions {
        @media only screen and (min-width: 769px) {
          float: right;
          padding: 0 16px;
        }
        @media only screen and (max-width: 768px) {
          display: flex;
          justify-content: space-around;
          &-prev, &-next, &-submit {
            min-width: 40vw;
          }
        }
        &-prev {
          margin-right: 0.5rem;
        }
      }
      &__modal {
        &-card {
          &-content {
            &-point {
              border-radius: 50%;
              width: 50px;
              height: 50px;
              padding: auto;
              display: flex;
              justify-content: center;
              align-items: center;
              border: 3px solid #BDBDBD;
            }
          }
        }
      }
    }
  }
</style>
