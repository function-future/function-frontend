<template>
  <div class="auto-overflow-container">
    <div class="quiz-questions__container">
      <div class="quiz-questions__container__header">
        <div>
          <Timer class="quiz-questions__container__header-timer" :timeLimit="quiz.timeLimit" @finish="submitQuiz" ref="timer"></Timer>
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
        <h1 class="title has-text-centered">{{question.text}}</h1>
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
            outlined
            type="is-danger"
            icon-pack="fas"
            icon-left="backward"
            :disabled="previous.disabled"
            @click.prevent="previous.action">
            Previous
          </b-button>
          <b-button
            outlined
            type="is-success"
            icon-pack="fas"
            icon-right="forward"
            :disabled="next.disabled"
            @click.prevent="next.action">
            Next
          </b-button>
          <b-button
            outlined
            type="is-primary"
            icon-pack="fas"
            icon-right="check-circle" class="quiz-questions__container__actions-submit"
            @click="submitQuiz"
            :disabled="isSubmitting">
            Submit
          </b-button>
        </div>
      </template>
    </b-steps>
    <QuizModal v-if="showPointModal" :result="result" :trialsLeft="trialsLeft" @retry="restart" @finish="finish">

    </QuizModal>
  </div>

  <!--<div class="scrollable-container">-->
    <!--<div class="quiz" v-if="!isLoading">-->
      <!--<div class="quiz-content" v-for="(question, idx) in studentQuizQuestions" :key="question.number" v-if="currentNumber === idx">-->
        <!--<div class="quiz-content-question">-->
          <!--<BaseCard :style="{ margin: 0, height: '100%' }">-->
            <!--{{question.text}}-->
          <!--</BaseCard>-->
        <!--</div>-->
        <!--<div class="quiz-content-option">-->
          <!--<label class="quiz-content-option__item" v-for="(option, idx) in question.options" :key="option.id">-->
            <!--<input type="radio" v-model="answers[currentNumber]" :value="option.id"/>-->
            <!--<BaseCard class="quiz-content-option__item-button" :class="highlightedOption(option.id)" :style="{ 'margin': '0 0 5px 0'}">-->
              <!--{{option.label}}-->
            <!--</BaseCard>-->
          <!--</label>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="quiz-action">-->
        <!--<div class="quiz-action-button">-->
          <!--<BaseButton :style="{ width: '100%', height: '100%' }" buttonClass="button-save" @click="submitQuiz">Finish</BaseButton>-->
        <!--</div>-->
        <!--<div class="quiz-action-legend">-->
          <!--<BaseCard :style="{ 'margin': '15px 0 0 0', 'padding': '15px 0 15px 0', 'height': '100%' }">-->
            <!--<div class="quiz-action-legend__title-area">-->
              <!--Go To-->
            <!--</div>-->
            <!--<div class="quiz-action-legend__content-area scrollable-container" style="max-height: 85%;">-->
              <!--<div class="quiz-action-legend__content-area-row scrollable-container">-->
                <!--<label style="width: 100%" v-for="question in studentQuizQuestions">-->
                  <!--<BaseCard class="quiz-action-legend__content-area-row-item" :style="{ 'padding': '10px', 'margin': '15px 0 15px 0', 'width': '100%' }">-->
                      <!--<input type="radio" @click="viewQuestion(question.number)">-->
                      <!--<span class="radio" :class="{active: question.number - 1 === currentNumber}">-->
                        <!--<font-awesome-icon icon="check" class="check" size="xs" v-if="question.number - 1 === currentNumber"/>-->
                      <!--</span>-->
                      <!--<span class="quiz-action-legend__content-area-row-item-text">-->
                        <!--Question {{question.number}}-->
                      <!--</span>-->
                  <!--</BaseCard>-->
                <!--</label>-->
              <!--</div>-->
            <!--</div>-->
          <!--</BaseCard>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="navigation" v-if="!isLoading">-->
      <!--<BaseButton class="navigation__button" :style="{ height: '100%' }" buttonClass="button-save" @click="viewPreviousQuestion" :disabled="currentNumber === 0">Previous</BaseButton>-->
      <!--<BaseButton class="navigation__button" :style="{ height: '100%' }" buttonClass="button-save" @click="viewNextQuestion" :disabled="currentNumber === studentQuizQuestions.length - 1">Next</BaseButton>-->
    <!--</div>-->
    <!--<QuizModal v-if="showPointModal">-->
      <!--<div slot="title">Finished</div>-->
      <!--<p slot="body">You earned {{result}} for this quiz</p>-->
      <!--<div slot="footer">-->
        <!--<BaseButton @click="restart" class="button-save" v-if="trialsLeft > 0">Retry</BaseButton>-->
        <!--<BaseButton @click="finish" class="button-save">Done</BaseButton>-->
      <!--</div>-->
    <!--</QuizModal>-->
  <!--</div>-->
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
        padding: 0 16px;
        &-submit {
          float: right;
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
