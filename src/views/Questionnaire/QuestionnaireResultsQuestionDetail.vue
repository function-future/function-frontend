<template>
  <div class="questionnaire-results-question-detail__outer">
    <div class="questionnaire-results-question-detail__container">
      <span class="questionnaire-results-question-detail__title">Question</span>
      <div v-if="Object.keys(currentResultQuestionDetail).length" class="questionnaire-results-question-detail__content-question">
        <div class="questionnaire-results-question-detail__content-question__description">
          {{currentResultQuestionDetail.question.description}}
        </div>
        <div class="questionnaire-results-question-detail__content-question__score">
          <span><font-awesome-icon icon="star" size="2x" class="star-icon"></font-awesome-icon></span>
          <span class="score-number"><strong>{{currentResultQuestionDetail.score.toFixed(1)}}/6.0</strong></span>
        </div>
      </div>
      <span class="questionnaire-results-question-detail__title">Appraised By</span>
      <div class="questionnaire-results-question-list">
        <QuestionnaireParticipantSimpleCard v-for="appraiser in currentResultsQuestionDetailResponsesList"
                                            :name="appraiser.name"
                                            :avatar="appraiser.avatar"
                                            :score="appraiser.score"
                                            :comment="appraiser.comment"
        ></QuestionnaireParticipantSimpleCard>
      </div>
    </div>
  </div>
</template>

<script src="./js/questionnaire-results-question-detail.js">
</script>

<style lang="scss" scoped>
  .questionnaire-results-question-detail {
    &__outer {
      display: flex;
      justify-content: center;
      overflow: auto;
    }

    &__container {
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 40vw;
      @media only screen and (max-width: 1023px) {
        width: 100vw;
      }
    }
    &__content-question{
      display: flex;
      justify-content: space-between;
      padding : 0px 10px;

      &__description {
        text-align: left;
        width: 100%;
      }
      &__score{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #f1c40f;
      }
    }

    &__title {
      font-weight: bold;
      font-size: 1.2rem;
      margin: 5px 0px;
      padding: 0px 10px;
    }
  }


  .questionnaire-results-question-list {
    overflow: auto;
    display: flex;
    flex-direction: column;
    height: 30vh;
  }

</style>
