<template>
    <div class="questionnaire-results-member-detail__outer">
      <div class="questionnaire-results-member-detail__container">
        <div v-if="isMobile" class="questionnaire-results-member-detail__content__user-mobile">
          <QuestionnaireParticipantCard v-if="currentAppraiseeResult"
                                        :name="currentAppraiseeResult.member.name"
                                        :avatar="currentAppraiseeResult.member.avatar"
                                        :role="currentAppraiseeResult.member.role"
                                        :university="currentAppraiseeResult.member.university"
                                        :batch="currentAppraiseeResult.member.batch.code"
                                        :score="currentAppraiseeResult.rating"
                                        :isResult="true"
          ></QuestionnaireParticipantCard>
        </div>
        <div v-else class="questionnaire-results-member-detail__content__user-desktop">
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
        <div class="questionnaire-results-member-detail__content__questionnaire">
          <span class="questionnaire-results-member-detail__content__questionnaire__title">Appraised on :</span>
          <div class="questionnaire-results-member-detail__content__questionnaire__questionnaire-card-list">
            <QuestionnaireCard  v-for="myQuestionnaire in appraiseeResultsQuestionnaires"
                               :key="myQuestionnaire.id"
                               :title="myQuestionnaire.title"
                               :description="myQuestionnaire.description"
                               :startDate="myQuestionnaire.startDate"
                               :dueDate="myQuestionnaire.dueDate"
                               :score="myQuestionnaire.score"
                               :isResult="true"
                               v-on:click="goToQuestionnaireResult(myQuestionnaire.id)"
            ></QuestionnaireCard>
            <infinite-loading ref="infiniteLoading" @infinite="infiniteHandler">
              <div slot="no-more"></div>
              <div slot="no-results"></div>
            </infinite-loading>
          </div>
        </div>
      </div>
    </div>
</template>

<script src="./js/questionnaire-results-member-detail.js">
</script>

<style lang="scss" scoped>

  h3 {
    padding: 0px;
    margin: 0px;
  }

  .questionnaire-results-member-detail{
    &__outer {
      display: flex;
      overflow: auto;
      flex-direction: column;
      align-items: center;
      @media only screen and (max-width: 1023px) {
        height: calc(100vh - 60px - 0.5rem - 62px);
      }
    }

    &__container {
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      @media only screen and (max-width: 1023px) {
        width: 100vw;
        height: 100%;
      }
    }

    &__content {
      &__user {
      }
      &__questionnaire{
        display: flex;
        flex-direction: column;
        text-align: left;
        @media only screen and (max-width: 1023px) {
          height: calc(100% - 133px);
        }

        &__title {
          font-size: 1rem;
          font-weight: bold;
          margin: 10px 10px;
        }
        &__questionnaire-card-list {
          width: 100%;
          overflow: auto;
        }
      }
    }
  }






</style>
