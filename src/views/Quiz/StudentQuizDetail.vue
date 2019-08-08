<template>
  <div class="quiz-detail-container">
    <div class="description-container">
      <BaseInput :value="studentQuizDetail.quiz.title"
                 :placeholder="'Quiz Title'"
                 :disabled="true">
      </BaseInput>
      <BaseTextArea :value="studentQuizDetail.quiz.description"
                    :disabled="true"
                    placeholder="Description here"
                    :style="{height: '70%'}"
                    :placeholder="'Quiz description'">
      </BaseTextArea>
    </div>
    <div class="detail-container">
      <div class="detail-container__info">
        <div class="detail-container__info-time">
          <BaseCard :style="{height: '100%', margin: 0}"
                    class="detail-card">
            <div class="detail-card__caption">Given Time</div>
            <input type="number"
                   class="detail-card__content"
                   :value="studentQuizDetail.quiz.timeLimit"
                   :disabled="true"/>
          </BaseCard>
        </div>
        <div class="detail-container__info-deadline">
          <BaseCard :style="{height: '100%', margin: 0}"
                    class="detail-card">
            <div class="detail-card__caption">Due Date</div>
            <div class="detail-card__content"
                 style="width: 330px; height: 60px;"
                 v-if="studentQuizDetail.quiz.endDate">
              {{studentQuizDetail.quiz.endDate | moment('MMM, Do YYYY')}}</div>
          </BaseCard>
        </div>
        <div class="detail-container__info-trials">
          <BaseCard :style="{height: '100%', margin: 0}"
                    class="detail-card">
            <div class="detail-card__caption">Trials</div>
            <input type="number"
                   class="detail-card__content"
                   :value="studentQuizDetail.trials"
                   :disabled="true"/>
          </BaseCard>
        </div>
      </div>
      <div class="detail-container__question">
        <div class="detail-container__question-card">
          <BaseCard :style="{height: '100%', margin: 0}"
                    class="question-info">
            <div class="question-info__caption">Question</div>
            <input type="text"
                   class="question-info__content"
                   :value="studentQuizDetail.quiz.questionCount"
                   :disabled="true"/>
          </BaseCard>
        </div>
        <div class="detail-container__action">
          <BaseButton buttonClass="button-cancel" @click="returnButtonClicked()">Return</BaseButton>
          <BaseButton buttonClass="button-save" @click="actionButtonClicked()" :disabled="studentQuizDetail.trials === 0">Start</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/student-quiz-detail.js">
</script>



<style lang="scss" scoped>
  .quiz-detail-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .description-container {
    width: 100%;
    height: 40%;
  }

  .detail-container {
    height: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    &__info {
      width: 33%;
      height: 100%;
      display: flex;
      flex-direction: column;
      &-time, &-deadline, &-trials, &-batch {
        height: 20%;
        margin: 10px 0;
      }
    }
    &__question {
      width: 65%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &-card {
        margin-top: 10px;
        height: 80%;
      }
    }
    &__action {
      margin-top: 15px;
      align-self: flex-end;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      height: 15%;
      width: 35%;
      align-items: center;
    }
  }

  .detail-card {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    &__caption {
      width: 30%;
    }
    &__content {
      font-weight: bolder;
      font-size: xx-large;
      border: none;
      width: 100%;
      text-align: right;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      &:focus {
        outline: none;
      }
      &:disabled {
        background-color: #ffffff;
      }
      &:enabled {
        &:hover {
          cursor: pointer;
        }
      }
      /* TODO Find good font */
    }
  }

  .question-info {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    &__caption {
      width: 30%;
      font-size: xx-large;
      align-self: flex-start;
    }
    &__content {
      background-color: transparent !important;
      width: 70%;
      border: none;
      font-weight: bolder;
      font-size: 13rem;
      display: flex;
      justify-content: flex-end;
      text-align: right;
      &:focus {
        outline: none;
      }
      &:disabled {
        background-color: #ffffff;
      }
      &:enabled {
        &:hover {
          cursor: pointer;
        }
      }
      /* TODO Find good font */
    }
  }

  .quiz-calendar {
    cursor: default;
    &__editable {
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
