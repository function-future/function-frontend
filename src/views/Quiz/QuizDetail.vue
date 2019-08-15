<template>
  <div class="quiz-detail-container">
    <div class="quiz-detail-section">
      <div class="description-container">
        <BaseInput v-model="quizDetail.title"
                   :placeholder="'Quiz Title'"
                   :disabled="!editMode">
        </BaseInput>
        <BaseTextArea v-model="quizDetail.description"
                      :disabled="!editMode"
                      placeholder="Description here"
                      :style="{height: '70%'}"
                      :placeholder="'Quiz description'">
        </BaseTextArea>
      </div>
      <BaseCard class="banks-container" :style="{'margin': '0 15px', 'padding': '10px'}">
        <div class="banks-container__header">
          <span>Question Banks</span>
          <font-awesome-icon v-if="editMode" icon="edit" class="icon blue"></font-awesome-icon>
        </div>
        <div class="scrollable-container">
          <BaseCard v-for="bank in quizDetail.questionBanks" :style="{'margin': '15px 10px'}" class="banks-container__item">
            <div class="banks-container__item-content">
              {{bank.title}}
            </div>
          </BaseCard>
        </div>
      </BaseCard>
    </div>
    <div class="detail-container">
      <div class="detail-container__info">
        <div class="detail-container__info-time">
          <BaseCard :style="{height: '100%', margin: 0}"
                    class="detail-card">
            <div class="detail-card__caption">
              <div>Given Time</div>
              <div style="font-size: smaller">(Minutes)</div>
            </div>
            <input type="number"
                   class="detail-card__content"
                   v-model="quizDetail.timeLimit"
                   :disabled="!editMode"/>
          </BaseCard>
        </div>
        <div class="detail-container__info-deadline">
          <BaseCard :style="{height: '100%', margin: 0}"
                    class="detail-card">
            <div class="detail-card__caption">Due Date</div>
            <v-date-picker :class="editMode ? 'quiz-calendar__editable' : 'quiz-calendar'"
                           :popover="isCalendarDisabled"
                           v-model="quizDetail.endDate"
                           v-if="quizDetail.endDate"
                           :value="quizDetail.endDate">
              <div class="detail-card__content"
                   style="width: 250px; height: 60px;"
                   v-if="quizDetail.endDate">
                {{quizDetail.endDate | moment('MMM, Do YYYY')}}</div>
            </v-date-picker>
          </BaseCard>
        </div>
        <div class="detail-container__info-trials">
          <BaseCard :style="{height: '100%', margin: 0}"
                    class="detail-card">
            <div class="detail-card__caption">Trials</div>
            <input type="number"
                   class="detail-card__content"
                   v-model="quizDetail.trials"
                   :disabled="!editMode"/>
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
                   v-model="quizDetail.questionCount"
                   :disabled="!editMode"/>
          </BaseCard>
        </div>
        <div class="detail-container__action">
          <BaseButton buttonClass="button-cancel" @click="returnButtonClicked()">{{ cancelButtonText }}</BaseButton>
          <BaseButton buttonClass="button-save" @click="actionButtonClicked()">{{ actionButtonText }}</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/quiz-detail.js">
</script>




<style lang="scss" scoped>
  .quiz-detail-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .quiz-detail-section {
    display: flex;
    flex-direction: row;
    height: 40%;
    max-height: 40%;
    width: 100%;
  }

  .description-container {
    flex-grow: 3;
  }

  .banks-container {
    flex-grow: 1;
    max-height: 100%;
    max-width: 25%;
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    &__item {
      &-content {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }

  .detail-container {
    height: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    &__info {
      width: 32%;
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
      width: 50%;
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
