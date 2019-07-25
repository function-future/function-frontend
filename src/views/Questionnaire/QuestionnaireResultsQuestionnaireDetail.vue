<template>
    <div class="questionnaire-results-questionnaire-detail-outer">
      <div class="questionnaire-results-questionnaire-detail-container">
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
        ></QuestionnaireCard>
        <h2 v-if="Object.keys(currentResultQuestionnaireDetail).length"><i>Appraisals for {{currentResultQuestionnaireDetail.appraisee.name}}</i></h2>
        <br>
        <h2>Questions</h2>
        <div class="questionnaire-results-question-list">
          <QuestionCard v-for="(questionResponse, index) in currentResultQuestionResponsesList"
                        :number="index+1"
                        :description="questionResponse.question.description"
                        :score="questionResponse.score"
                        :isResult="true"
                        v-on:click="goToQuestionDetail(questionResponse.id)"
          ></QuestionCard>
        </div>
      </div>
    </div>
</template>

<script src="./js/questionnaire-results-questionnaire-detail.js">
</script>

<style scoped>
  @media only screen and (min-width: 900px){
    .questionnaire-results-questionnaire-detail-outer {
      min-width: 650px;
    }

    .questionnaire-results-questionnaire-detail-container {
      min-width: 650px;
    }
  }

  .questionnaire-results-questionnaire-detail-outer {
    display: flex;
    justify-content: center;
  }

  .questionnaire-results-questionnaire-detail-container {
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
    padding: 10px 0px 0px 10px;
  }

  h2 > i{
    color: #02AAF3;
  }

  .questionnaire-results-question-list {
    padding-top: 10px;
    height: 55vh;
    overflow: auto;
  }
</style>
