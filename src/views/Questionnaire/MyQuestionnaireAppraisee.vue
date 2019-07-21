<template>
    <div class="my-questionnaire-appraisees-outer">
      <div class="my-questionnaire-appraisees-containter">
        <div class="questionnaire-detail">
          <p class="questionnaire-title"><strong>{{ currentQuestionnaire.title }}</strong></p>
          <p class="questionnaire-description">
            {{ currentQuestionnaire.description }}
          </p>
          <div class="questionnaire-date">
            <div class="placeholder-start-date">
              Start Date : {{ computedDate(currentQuestionnaire.startDate) }}
            </div>
            <div class="placeholder-due-date">
              Due Date : {{ computedDate(currentQuestionnaire.dueDate) }}
            </div>
          </div>
        </div>
        <div v-if="!this.$route.params.appraiseeId" class="my-appraisees-list-containner">
          <div class="title-appraisee">
            <p><strong>Appraisee</strong></p>
          </div>
          <QuestionnaireParticipantCard v-for="appraisee in myListAppraisees"
                                        :key="appraisee.id"
                                        :name="appraisee.name"
                                        :avatar="appraisee.avatar"
                                        :role="appraisee.role"
                                        :university="appraisee.university"
                                        :batch="appraisee.batch.name"
                                        v-on:click="goToInputQuestionnaireAnswer(appraisee)"
          ></QuestionnaireParticipantCard>
        </div>
        <div v-else class="form-questionnaire">
          <div class="title-questionnaire">
            <p><i>Questionnaire for {{ currentAppraiseeToScore }}</i></p>
          </div>
          <div class="form-questionnaire-content">
            <MyQuestionnaireForm v-for="(question, index) in currentQuestionsQuestionnaire"
                                  :noQuestion="index+1"
                                  :question="question"
            ></MyQuestionnaireForm>
          </div>
          <div class="submit-button">
            <BaseButton type="submit" buttonClass="button-save" @click="printScore">Submit</BaseButton>
          </div>
        </div>
      </div>
    </div>
</template>

<script src="./js/MyQuestionnaireAppraisee.js">
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }

  @media only screen and (min-width: 1050px ) {
    .my-questionnaire-appraisees-outer {
      width: 100%;
    }

    .questionnaire-detail {
      width: 800px;
      max-height: 30vh;
    }

    .form-questionnaire {
      width: 800px;
    }

    .my-appraisees-list-containner, .form-questionnaire{
      min-width: 600px;
    }
  }

  .my-questionnaire-appraisees-outer {
    display: flex;
    justify-content: center;
    height: 80vh;
  }
  .my-questionnaire-appraisees-containter {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .questionnaire-detail {
    display: flex;
    align-items: start;
    flex-direction: column;
    padding-left: 10px;
  }

  .questionnaire-title {
  }

  .questionnaire-title > strong {
    font-weight: bold;
    font-size: x-large;
  }

  .questionnaire-description {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    word-break: break-all;
    font-size: large;
    padding: 10px 0px 10px 0px;
  }

  .questionnaire-date {
    display: flex;
    width: 100%;
  }

  .placeholder-start-date {
    flex-grow: 1;
    color: green;
    font-weight: bold;
    display: flex;
    align-self: flex-start;
  }

  .placeholder-due-date {
    flex-grow: 1;
    color: red;
    font-weight: bold;
    display: flex;
    align-self: flex-start;
  }

  .my-appraisees-list-containner {
    overflow: auto;
    padding: 10px;
    height: 100%;
    align-self: start;
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
  }

  .title-appraisee, .title-questionnaire {
    padding: 5px 0px 5px 0px;
    display: flex;
    align-items: flex-start;
    font-size: x-large;
  }

  .title-questionnaire {
    color: #02aaf3;
  }

  .submit-button {
    display: flex;
    align-self: flex-end;
  }
</style>
