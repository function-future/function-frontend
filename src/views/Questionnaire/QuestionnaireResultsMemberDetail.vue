<template>
    <div class="questionnaire-results-member-detail-outer">
      <div class="questionnaire-results-participant-detail-card-container">

        <QuestionnaireParticipantDetailCard
          v-if="currentAppraiseeResult"
          :avatar="currentAppraiseeResult.member.avatar"
                                            :nameParticipant="currentAppraiseeResult.member.name"
                                            :university="currentAppraiseeResult.member.university"
                                            :batch="currentAppraiseeResult.member.batch.name"
                                            :role="currentAppraiseeResult.member.role"
                                            :score="currentAppraiseeResult.rating"
        ></QuestionnaireParticipantDetailCard>
      </div>
      <div class="questionnaire-results-questionnaire-detail-card-container">
        <h3>Appraised on</h3>
        <div class="questionnaire-card-list">
          <QuestionnaireCard v-for="myQuestionnaire in currentAppraiseeResultQuetionnaires"
                             :key="myQuestionnaire.id"
                             :title="myQuestionnaire.title"
                             :description="myQuestionnaire.description"
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

<script src="./js/questionnaire-results-member-detail.js">
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
