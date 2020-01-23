<template>
    <div class="questionnaire-results-member__outer">
      <div class="questionnaire-results-member__container">
        <div class="questionnaire-results-member__top-bar">
          <div class="questionnaire-results-member__top-bar__title">
            <span>Members : </span>
          </div>
        </div>
        <div class="questionnaire-results-member__content">
          <QuestionnaireParticipantCard v-for="appraisee in appraiseeResults"
                                        :id="appraisee.id"
                                        :name="appraisee.member.name"
                                        :avatar="appraisee.member.avatar"
                                        :role="appraisee.member.role"
                                        :university="appraisee.university"
                                        :batch="appraisee.member.batch.code"
                                        :score="appraisee.rating"
                                        :isResult="true"
                                        v-on:click="goToMemberDetail(appraisee.id)"
          ></QuestionnaireParticipantCard>
          <infinite-loading ref="infiniteLoading" @infinite="infiniteHandler">
            <div slot="no-more"></div>
            <div slot="no-results"></div>
          </infinite-loading>
        </div>
      </div>
    </div>
</template>

<script src="./js/questionnaire-results-members.js">
</script>

<style lang="scss" scoped>

  .questionnaire-results-member {
    &__outer {
      display: flex;
      justify-content: center;
      height: 80vh;
    }

    &__container {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 40vw;
      @media only screen and (max-width: 1023px) {
        width: 100vw;
      }
    }

    &__top-bar {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      width: 100%;
      padding: 10px 10px 10px 10px;

      &__title {
        font-weight: bold;
        font-size: 1.2rem;
      }
    }

    &__content {
      height: 75vh;
      overflow: auto;
      width: 100%;
    }
  }
</style>
