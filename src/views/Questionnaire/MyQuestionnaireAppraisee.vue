<template>
    <div class="my-questionnaire-appraisees-outer">
      <div class="my-questionnaire-appraisees-containter">
        <div class="questionnaire-detail">
<!--          <QuestionnaireCard v-bind="myQuestionnaire"-->
<!--                             :key="myQuestionnaire.id"-->
<!--                             :title="myQuestionnaire.title"-->
<!--                             :desc="myQuestionnaire.description"-->
<!--                             :startDate="myQuestionnaire.startDate"-->
<!--                             :dueDate="myQuestionnaire.dueDate"-->
<!--                             :isDisable="myQuestionnaire.dueDate < Date.now()"-->
<!--          ></QuestionnaireCard>-->
          <p class="questionnaire-title"><strong>{{ myQuestionnaire.title }}</strong></p>
          <p class="questionnaire-description">
            {{ myQuestionnaire.description }}
          </p>
          <div class="questionnaire-date">
            <div class="placeholder-start-date">
              Start Date : {{ computedDate(myQuestionnaire.startDate) }}
            </div>
            <div class="placeholder-due-date">
              Due Date : {{ computedDate(myQuestionnaire.dueDate) }}
            </div>
          </div>
        </div>
        <div class="my-appraisees-list-containner">
          <QuestionnaireParticipantCard v-bind="appraisee"
                                        :key="appraisee.id"
                                        :name="appraisee.name"
                                        :avatar="appraisee.avatar"
                                        :role="appraisee.role"
                                        :university="appraisee.university"
                                        :batch="appraisee.batch.name"
          ></QuestionnaireParticipantCard>
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
  .my-questionnaire-appraisees-outer {
    display: flex;
    justify-content: center;
    height: 80vh;
  }
  .my-questionnaire-appraisees-containter {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 30px;
  }

  .questionnaire-detail {
    display: flex;
    min-width: 700px;
    align-items: start;
    flex-direction: column;
  }

  .questionnaire-title {
    padding: 10px 0px 10px 0px;
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
    min-width: 600px;
    min-height: 800vh;
    align-self: start;
  }
</style>
