<template>
  <div class="container">
    <div class="quiz-question__question-label" v-if="!isLoading">Question {{currentNumber + 1}}</div>
    <div class="quiz" v-if="!isLoading">
      <div class="quiz-content" v-for="(question, idx) in studentQuizQuestions" :key="question.number" v-if="currentNumber === idx">
        <div class="quiz-content-question">
          <BaseCard :style="{ margin: 0, height: '100%' }">
            {{question.text}}
          </BaseCard>
        </div>
        <div class="quiz-content-option">
          <label class="quiz-content-option__item" v-for="(option, idx) in question.options" :key="option.id">
            <input type="radio" v-model="answers[currentNumber]" :value="option.id"/>
            <BaseCard class="quiz-content-option__item-button" :class="highlightedOption(option.id)" :style="{ 'margin': '0 0 5px 0'}">
              {{option.label}}
            </BaseCard>
          </label>
        </div>
      </div>
      <div class="quiz-action">
        <div class="quiz-action-button">
          <BaseButton :style="{ width: '100%', height: '100%' }" buttonClass="button-save" @click="submitQuiz">Finish</BaseButton>
        </div>
        <div class="quiz-action-legend">
          <BaseCard :style="{ 'margin': '15px 0 0 0', 'padding': '15px 0 15px 0', 'height': '100%' }">
            <div class="quiz-action-legend__title-area">
              Go To
            </div>
            <div class="quiz-action-legend__content-area">
              <div class="quiz-action-legend__content-area-row">
                <label style="width: 100%" v-for="question in studentQuizQuestions">
                  <BaseCard class="quiz-action-legend__content-area-row-item" :style="{ 'padding': '10px', 'margin': '15px 0 15px 0', 'width': '100%' }">
                      <input type="radio" @click="viewQuestion(question.number)">
                      <span class="radio" :class="{active: question.number - 1 === currentNumber}">
                        <font-awesome-icon icon="check" class="check" size="xs" v-if="question.number - 1 === currentNumber"/>
                      </span>
                      <span class="quiz-action-legend__content-area-row-item-text">
                        Question {{question.number}}
                      </span>
                  </BaseCard>
                </label>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
    <div class="navigation" v-if="!isLoading">
      <BaseButton class="navigation__button" :style="{ height: '100%' }" buttonClass="button-save" @click="viewPreviousQuestion">Previous</BaseButton>
      <BaseButton class="navigation__button" :style="{ height: '100%' }" buttonClass="button-save" @click="viewNextQuestion" :disabled="this.currentNumber === this.studentQuizQuestions.length - 1">Next</BaseButton>
    </div>
    <Modal v-if="showPointModal">
      <div slot="title">Finished</div>
      <p slot="body">You earned {{result}} for this quiz</p>
      <div slot="footer">
        <BaseButton @click="restart">Retry</BaseButton>
        <BaseButton @click="finish">Done</BaseButton>
      </div>
    </Modal>
  </div>
</template>

<script type="text/javascript" src="./js/quiz-questions.js">
</script>

<style lang="scss" scoped>
  .container {
    text-align: left;
    max-height: 80%;
  }

  .quiz {
    display: flex;
    flex-direction: row;
    height: 75vh;
    &-question__question-label {
      font-weight: bold;
      font-size: 20px;
      margin-top: 5px;
    }
    &-content {
      margin: 10px 25px 0 0;
      width: 80%;
      &-question {
        height: 40%;
      }
      &-option {
        height: 50%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 30px;
        &__item {
          height: 45%;
          width: 49%;
          &-button {
            width: 100%;
            height: 100%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: x-large;
            font-weight: bold;
          }
        }
      }
    }
    &-action {
      width: 15%;
      &-button {
        height: 5vh;
      }
      &-legend {
        height: 85%;
        &__title-area {
          width: 100%;
          border-bottom: 1px solid black;
          padding-bottom: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bolder;
        }
        &__content-area {
          padding: 0 15px 25px 15px;
          /*scrollable*/
          &-row {
            margin: 0 0 5px 0;
            cursor: pointer;
            &-item {
              display: flex;
              align-items: center;
              cursor: pointer;
              &-text {
                width: calc(100% - 20px);
                text-align: center;
              }
            }
          }
        }
      }
    }
  }

  .active {
    background-color: black;
    color: white;
  }

  .navigation {
    height: 8vh;
    width: 100%;
    display: flex;
    justify-content: space-between;
    &__button {
      width: 49%;
    }
  }

  input[type=radio] {
    display: none;
  }

  .radio {
    display: flex;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    height: 20px;
    width: 20px;
  }

  .radio.active {
    border: 0;
  }

  .check {
    margin: auto;
  }

  .selected {
    background-color: rgb(2, 170, 243);
    color: white;
  }

  .active {
    background-color: rgba(2, 170, 243, 0.8);
    color: white;
  }

  .modal-footer {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
</style>
