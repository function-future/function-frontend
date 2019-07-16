<template>
    <div class="questionnaire-results-questionnaire-detail-outer">
      <div class="questionnaire-results-questionnaire-detail-container">
        <QuestionnaireCard class="without-border-and-shadow"
                           :key="currentQuestionnaire.id"
                           :title="currentQuestionnaire.title"
                           :desc="currentQuestionnaire.description"
                           :startDate="currentQuestionnaire.startDate"
                           :dueDate="currentQuestionnaire.dueDate"
                           :score="currentQuestionnaire.score"
                           :isResult="true"
                           :isDetail="true"
        ></QuestionnaireCard>
        <h2><i>Appraisals for {{currentUser.name}}</i></h2>
        <br>
        <h2>Questions</h2>
        <div class="questionnaire-results-question-list">
          <QuestionCard v-for="question in questions"
                        :key="question.id"
                        :number="i++"
                        :description="question.description"
                        :score="question.score"
                        :isResult="true"
                        v-on:click="goToQuestionDetail(question.id)"
          ></QuestionCard>
        </div>
      </div>
    </div>
</template>

<script src="./js/QuestionnaireResultsQuestionnaireDetail.js">
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
