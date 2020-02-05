<template>
    <div class="questionnaire-results-questionnaire-detail__outer">
      <div class="questionnaire-results-questionnaire-detail__container">
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
        <div class="questionnaire-results-questionnaire-detail__container__placeholder">
          <span class="questionnaire-results-questionnaire-detail__container__placeholder__name"
                v-if="Object.keys(currentResultQuestionnaireDetail).length">
            Appraisals for {{currentResultQuestionnaireDetail.appraisee.name}}
          </span>
          <span class="questionnaire-results-questionnaire-detail__container__placeholder__title">
            Questions
          </span>
        </div>
        <div class="questionnaire-results-questionnaire-detail__container__question-list">
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

<style lang="scss" scoped>

  .questionnaire-results-questionnaire-detail{
    &__outer {
      display: flex;
      justify-content: center;
      overflow: auto;
    }

    &__container {
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      @media only screen and (max-width: 1023px) {
        width: 100vw;
      }

      &__question-list {
        height: 55vh;
        overflow: auto;
      }

      &__placeholder {
        display: flex;
        flex-direction: column;
        padding: 0px 10px;

        &__name {
          font-weight: bold;
          font-style: italic;
        }
        &__title{
          font-weight: bold;
          margin: 10px 0px;
          font-size: 1.2rem;
        }
      }
    }
  }

  .without-border-and-shadow {
    background: none;
    border: none;
    -webkit-box-sizing: unset;
    box-sizing: unset;
    border-radius: unset;
    box-shadow: none;
    cursor: default;
    margin: 0px;
  }
</style>
