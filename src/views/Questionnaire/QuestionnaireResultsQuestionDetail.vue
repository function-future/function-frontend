<template>
  <div class="questionnaire-results-question-detail-outer">
    <div class="questionnaire-results-question-detail-container">
      <QuestionnaireCard class="without-border-and-shadow"
                         v-if="Object.keys(currentResultQuestionnaireDetail).length"
                         :key="currentResultQuestionnaireDetail.questionnaireDetail.id"
                         :title="currentResultQuestionnaireDetail.questionnaireDetail.title"
                         :description="currentResultQuestionnaireDetail.questionnaireDetail.description"
                         :startDate="currentResultQuestionnaireDetail.questionnaireDetail.startDate"
                         :dueDate="currentResultQuestionnaireDetail.questionnaireDetail.dueDate"
                         :score="currentResultQuestionnaireDetail.rating"
                         :isResult="true"
                         :isDetail="true"
                         v-on:click="goToQuestionnaireResult(currentResultQuestionnaireDetail.id)"
      ></QuestionnaireCard>
      <h2 v-if="Object.keys(currentResultQuestionnaireDetail).length"><i>Appraisals for {{currentResultQuestionnaireDetail.appraisee.name}}</i></h2>
      <br>
      <h2>Question</h2>
      <QuestionCard class="without-border-and-shadow"
                    v-if="Object.keys(currentResultQuestionDetail).length"
                    :key="currentResultQuestionDetail.id"
                    :description="currentResultQuestionDetail.question.description"
                    :score="currentResultQuestionDetail.score"
                    :isResult="true"
      ></QuestionCard>
      <br>
      <h2>Appraised By</h2>
      <div class="questionnaire-results-question-list">
        <QuestionnaireParticipantSimpleCard v-for="appraiser in currentResultsQuestionDetailResponsesList"
                                            :name="appraiser.name"
                                            :avatar="appraiser.avatar"
                                            :score="appraiser.score"
        ></QuestionnaireParticipantSimpleCard>
      </div>
    </div>
  </div>
</template>

<script src="./js/questionnaire-results-question-detail.js">
</script>

<style scoped>
  @media only screen and (min-width: 900px){
    .questionnaire-results-question-detail-outer {
      min-width: 650px;
    }

    .questionnaire-results-question-detail-container {
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
    max-width: 700px;
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

  .questionnaire-results-question-list {
    overflow: auto;
    display: flex;
    flex-direction: column;
    height: 45vh;
  }

</style>
