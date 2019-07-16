<template>
  <div class="questionnaire-results-question-detail-outer">
    <div class="questionnaire-results-question-detail-container">
      <QuestionnaireCard class="without-border-and-shadow"
                         :key="currentQuestionnaire.id"
                         :title="currentQuestionnaire.title"
                         :desc="currentQuestionnaire.description"
                         :startDate="currentQuestionnaire.startDate"
                         :dueDate="currentQuestionnaire.dueDate"
                         :score="currentQuestionnaire.score"
                         :isResult="true"
                         :isDetail="true"
                         v-on:click="goToQuestionnaireResult(currentQuestionnaire.id)"
      ></QuestionnaireCard>
      <h2><i>Appraisals for {{currentUser.name}}</i></h2>
      <QuestionCard class="without-border-and-shadow"
                    :key="currentQuestion.id"
                    :description="currentQuestion.description"
                    :score="currentQuestion.score"
                    :isResult="true"
      ></QuestionCard>
      <div class="questionnaire-results-question-list">
        <QuestionnaireParticipantSimpleCard v-for="appraiser in appraisers"
                                            :name="appraiser.name"
                                            :avatar="appraiser.avatar"
                                            :score="appraiser.score"
        ></QuestionnaireParticipantSimpleCard>
      </div>
    </div>
  </div>
</template>

<script src="./js/QuestionnaireResultsQuestionDetail.js">
</script>

<style scoped>
  @media only screen and (min-width: 900px){
    .questionnaire-results-question-detail-outer {
      min-width: 650px;
    }
  }

  .questionnaire-results-question-detail-outer {
    display: flex;
    justify-content: center;
  }

  .questionnaire-results-question-detail-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-width: 80%;
    max-width: 800px;
  }

  .without-border-and-shadow {
    background: none;
    border: none;
    -webkit-box-sizing: unset;
    box-sizing: unset;
    -webkit-box-sizing: unset;
    border-radius: unset;
    box-shadow: none;
    -webkit-box-sizing: unset;
    cursor: default;
    margin: 0px;
  }

  h2 {
    margin: 0px;
    text-align: left;
    padding-left: 10px;
  }

  h2 > i{
    color: #02AAF3;
  }

</style>
