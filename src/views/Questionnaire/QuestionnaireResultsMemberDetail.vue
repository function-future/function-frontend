<template>
    <div class="questionnaire-results-member-detail-outer">
      <div class="questionnaire-results-participant-detail-card-container">
        <QuestionnaireParticipantDetailCard :avatar="appraisee.avatar"
                                            :nameParticipant="appraisee.name"
                                            :university="appraisee.university"
                                            :batch="appraisee.batch.name"
                                            :role="appraisee.role"
                                            :score="appraisee.score"
        ></QuestionnaireParticipantDetailCard>
      </div>
      <div class="questionnaire-results-questionnaire-detail-card-container">
        <h3>Appraised on</h3>
        <div class="questionnaire-card-list">
          <QuestionnaireCard v-for="myQuestionnaire in myQuestionnairesDummy"
                             :key="myQuestionnaire.id"
                             :title="myQuestionnaire.title"
                             :desc="myQuestionnaire.description"
                             :startDate="myQuestionnaire.startDate"
                             :dueDate="myQuestionnaire.dueDate"
                             :score="myQuestionnaire.score"
                             :isResult="true"
                             v-on:click="goToQuestionnaireResult(myQuestionnaire.id)"
          ></QuestionnaireCard>
        </div>
      </div>
    </div>
</template>

<script src="./js/QuestionnaireResultsMemberDetail.js">
</script>

<style scoped>

  h3 {
    padding: 0px;
    margin: 0px;
  }

  .questionnaire-results-member-detail-outer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .questionnaire-results-participant-detail-card-container {
    width: 300px;
  }

  .questionnaire-results-questionnaire-detail-card-container {
    min-width: 600px;
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .questionnaire-card-list {
    width: 100%;
    height: 40vh;
    overflow: auto;
  }
</style>
