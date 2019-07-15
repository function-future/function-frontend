<template>
    <div class="questionnaire-results-member-detail-outer">
      <div class="questionnaire-results-detail-card-container">
        <QuestionnaireParticipantDetailCard :avatar="appraisee.avatar"
                                            :nameParticipant="appraisee.name"
                                            :university="appraisee.university"
                                            :batch="appraisee.batch.name"
                                            :role="appraisee.role"
                                            :score="appraisee.score"
        ></QuestionnaireParticipantDetailCard>
      </div>
    </div>
</template>

<script src="./js/QuestionnaireResultsMemberDetail.js">
</script>

<style scoped>

  .questionnaire-results-member-detail-outer
  .questionnaire-results-detail-card-container {
    width: 300px;
  }
</style>
