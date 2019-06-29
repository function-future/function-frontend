<template>
  <div class="quiz-detail-container">
    <div class="description-container">
      <BaseInput v-model="quizDetail.title"
                 :placeholder="'Quiz Title'">
      </BaseInput>
      <BaseTextArea v-model="quizDetail.description"
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
                   v-model="quizDetail.timeLimit"/>
          </BaseCard>
        </div>
        <div class="detail-container__info-deadline">
          <BaseCard :style="{height: '100%', margin: 0}"
                    class="detail-card">
            <div class="detail-card__caption">Due Date</div>
            <v-date-picker v-model="quizDetail.endDate"
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
                   v-model="quizDetail.trials"/>
          </BaseCard>
        </div>
        <div class="detail-container__info-batch">
          <BaseCard :style="{height: '100%', margin: 0}"
                    class="detail-card">
            <div class="detail-card__caption">Participant</div>
            <input type="text"
                   class="detail-card__content"
                   v-model="quizDetail.batch"/>
          </BaseCard>
          <!--TODO Change this to baseSelect after core team made API call for batches-->
        </div>
      </div>
      <div class="detail-container__question">
        <div class="detail-container__question-card">
          <BaseCard :style="{height: '100%', margin: 0}"
                    class="question-info">
            <div class="question-info__caption">Question</div>
            <input type="text"
                   class="question-info__content"
                   v-model="quizDetail.questionCount"/>
          </BaseCard>
        </div>
        <div class="detail-container__action">
          <BaseButton buttonClass="button-cancel" @click="returnButtonClicked()">Cancel</BaseButton>
          <BaseButton buttonClass="button-save" @click="actionButtonClicked()">Save</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/add-quiz-detail.js">
</script>

<style lang="scss" scoped>
  .quiz-detail-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 20px 20px 200px 20px;
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
     width: 30%;
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
     width: 70%;
     border: none;
     font-weight: bolder;
     font-size: 15rem;
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
