<template>
  <div class="container">
    Question Number {{ currentNumber + 1}}<!--IF POSSIBLE!-->
    <div class="quiz">
      <div class="quiz-content">
        <div class="quiz-content-question">
          <BaseCard :style="{ margin: 0, height: '100%' }">
            {{studentQuizQuestions[currentNumber].text}}
          </BaseCard>
        </div>
        <div class="quiz-content-option">
          <BaseButton class="quiz-content-option__item" :style="{ 'margin': '0 0 5px 0'}" buttonClass="button-white" @click="selectOption(studentQuizQuestions[currentNumber].options[0].optionId)">{{studentQuizQuestions[currentNumber].options[0].label}}</BaseButton>
          <BaseButton class="quiz-content-option__item" :style="{ 'margin': '0 0 5px 0'}" buttonClass="button-white" @click="selectOption(studentQuizQuestions[currentNumber].options[1].optionId)">{{studentQuizQuestions[currentNumber].options[1].label}}</BaseButton>
          <BaseButton class="quiz-content-option__item" :style="{ 'margin': '10px 0 5px 0'}" buttonClass="button-white" @click="selectOption(studentQuizQuestions[currentNumber].options[2].optionId)">{{studentQuizQuestions[currentNumber].options[2].label}}</BaseButton>
          <BaseButton class="quiz-content-option__item" :style="{ 'margin': '10px 0 5px 0'}" buttonClass="button-white" @click="selectOption(studentQuizQuestions[currentNumber].options[3].optionId)">{{studentQuizQuestions[currentNumber].options[3].label}}</BaseButton>
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
              <div v-for="question in studentQuizQuestions" class="quiz-action-legend__content-area-row">
                <BaseCard :style="{ 'padding': '10px', 'margin': '15px 0 15px 0' }" @click.native="currentNumber = question.number-1">
                  <label class="quiz-action-legend__content-area-row-item">
                    <input type="radio" v-model="currentNumber" @click="viewQuestion(question.number)">
                    <span class="radio">
                      <font-awesome-icon icon="check" class="blue check" size="xs" v-if="question.number - 1 === currentNumber"/>
                    </span>
                    <span class="quiz-action-legend__content-area-row-item-text">
                      Question {{question.number}}
                    </span>
                  </label>
                </BaseCard>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
    <div class="navigation">
      <BaseButton class="navigation__button" :style="{ height: '100%' }" buttonClass="button-save" @click="viewPreviousQuestion">Previous</BaseButton>
      <BaseButton class="navigation__button" :style="{ height: '100%' }" buttonClass="button-save" @click="viewNextQuestion">Next</BaseButton>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/quiz-questions.js">
</script>

<style lang="scss" scoped>
  .container {
    text-align: left;
  }

  .quiz {
    display: flex;
    flex-direction: row;
    height: 75vh;
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

  .check {
    margin: auto;
  }
</style>
