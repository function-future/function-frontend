<template>
    <div class="my-questionnaire-appraisees__outer">
      <div class="my-questionnaire-appraisees__container">
        <div class="my-questionnaire-appraisees__content">
          <p class="my-questionnaire-appraisees__content__questionnaire-title"><strong>{{ currentQuestionnaire.title }}</strong></p>
          <p class="my-questionnaire-appraisees__content__questionnaire-description">
            {{ currentQuestionnaire.description }}
          </p>
          <div class="my-questionnaire-appraisees__content__questionnaire-date">
            <div class="my-questionnaire-appraisees__content__questionnaire-date__placeholder-start-date">
              Start Date :
              <span class="green">
                <br>
                {{ computedDate(currentQuestionnaire.startDate) }}
              </span>
            </div>
            <div class="my-questionnaire-appraisees__content__questionnaire-date__placeholder-due-date">
              Due Date :
              <span class="red">
                <br>
                {{ computedDate(currentQuestionnaire.dueDate) }}
              </span>
            </div>
          </div>
        </div>
        <div v-if="!this.$route.params.appraiseeId" class="my-questionnaire-appraisees__content__appraisees-list">
          <div class="my-questionnaire-appraisees__content__appraisees-list__title-appraisee">
            <p><strong>Appraisee</strong></p>
          </div>
          <div class="my-questionnaire-appraisees__content__appraisees-list__appraisee-card-container">
            <QuestionnaireParticipantCard v-for="appraisee in myListAppraisees"
                                          :key="appraisee.id"
                                          :name="appraisee.name"
                                          :avatar="appraisee.avatar"
                                          :role="appraisee.role"
                                          :university="appraisee.university"
                                          :batch="appraisee.batch.name"
                                          @click="goToInputQuestionnaireAnswer(appraisee)"
            ></QuestionnaireParticipantCard>
            <QuestionnaireParticipantCard
              v-for="appraisee in appraiseeDone"
              :name="appraisee.appraiseeResponse.name"
              :avatar="appraisee.appraiseeResponse.avatar"
              :role="appraisee.appraiseeResponse.role"
              :university="appraisee.appraiseeResponse.university"
              :batch="appraisee.appraiseeResponse.batch.name"
              :score="appraisee.score"
              :isResult="true"
              :isDisable="true"
            ></QuestionnaireParticipantCard>
          </div>
        </div>
        <div v-else class="my-questionnaire-appraisees__content__form-questionnaire">
          <div class="title-questionnaire">
            <span>Questionnaire for {{currentNameTemp}}</span>
          </div>
          <div class="form-questionnaire-content">
            <MyQuestionnaireForm v-for="(question, index) in currentQuestionsQuestionnaire"
                                  :noQuestion="index+1"
                                  :question="question"
                                  @input="updateCurrentQuestionanireForm"
            ></MyQuestionnaireForm>
          </div>
          <div class="submit-button">
            <b-button
              type="submit"
              class="is-primary is-rounded"
              buttonClass="button-save"
              @click="printScore">
              <span>Submit</span>
            </b-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script src="./js/my-questionnaire-appraisee.js">
</script>

<style lang="scss" scoped>
  *{
    margin: 0;
    padding: 0;
  }

  .my-questionnaire-appraisees {
    &__outer{
      width: 100%;
      display: flex;
      justify-content: center;
      overflow: auto;
      height: 80vh;
      @media only screen and (max-width: 1023px) {
        height: calc(100vh - 60px - 0.5rem - 62px);
      }
    }
    &__container {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      padding: 10px;
    }

    &__content {
      display: flex;
      align-items: start;
      flex-direction: column;
      width: 100%;

      &__questionnaire-title > strong {
        font-weight: bold;
        font-size: x-large;
      }

      &__questionnaire-description {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        word-break: break-all;
        font-size: large;
        padding: 5px 0px;
      }

      &__questionnaire-date {
        display: flex;
        width: 100%;
        justify-content: space-between;

        &__placeholder-start-date {
          padding: 0px 1px;
          flex-grow: 1;
          font-weight: bold;
          align-self: flex-start;
        }

        &__placeholder-due-date {
          padding: 0px 1px;
          flex-grow: 1;
          font-weight: bold;
          align-self: flex-start;
        }
      }

      &__appraisees-list{
        width: 100%;
        height: 100%;
        align-self: start;
        @media only screen and (max-width: 1023px) {
          height: calc(100% - 130px);
        }

        &__title-appraisee {
          padding: 5px 0px;
          display: flex;
          align-items: flex-start;
          font-size: 1.5rem;
        }

        &__appraisee-card-container {
          height: 55vh;
          overflow: auto;
          @media only screen and (max-width: 1023px) {
            height: auto;
            overflow: auto;
            max-height: calc(100% - 12px);
            padding: 10px 0px;
          }
        }
      }

      &__form-questionnaire{
        width: 100%;
        @media only screen and (max-height: 1023px) {
          height: calc(100% - 120px);
        }
      }
    }
  }

  @media only screen and (min-width: 1050px ) {

    .questionnaire-detail {
      width: 800px;
      max-height: 30vh;
    }

    .form-questionnaire {
      width: 800px;
    }
  }

  .red {
    color: red;
  }

  .green {
    color: green;
  }

  .form-questionnaire {
    display : flex;
    flex-direction: column;
    min-height: 80vh;
  }

  .form-questionnaire-content {
    max-height: 60vh;
    overflow: auto;
    padding-bottom: 5px;
    @media only screen and (max-width: 1023px) {
      height: auto;
      max-height: calc(100% - 65px);
    }
  }

  .title-questionnaire {
    font-style: italic;
    font-size: 0.8rem;
  }

  .submit-button {
    display: flex;
    align-self: flex-end;
    padding-top: 5px;
  }
</style>
