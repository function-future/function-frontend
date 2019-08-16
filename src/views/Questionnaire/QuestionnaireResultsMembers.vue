<template>
    <div class="questionnaire-results-member-outer">
      <div class="questionnaire-results-member-container">
        <div class="top-bar">
          <div class="title-bar">
            <h2><strong>Members</strong></h2>
          </div>
        </div>
        <div class="participant-list-container">
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

<style scoped>

  .questionnaire-results-member-outer {
    display: flex;
    justify-content: center;
    height: 80vh;
  }


  @media only screen and (min-width: 700px) {
    .questionnaire-results-member-container {
      width: 100%;
    }

    .top-bar, .participant-list-container {
      width: 500px;
    }

    .search-bar {
      width: 300px;
    }
  }

  @media only screen and (max-width: 700px) {
    .search-bar {
      width: 150px;
    }
  }

  .questionnaire-results-member-container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .top-bar {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  .search-bar {
    align-self: flex-end;
  }

  .participant-list-container {
    height: 75vh;
    overflow: auto;
  }

  h2 {
    margin: 0px;
  }

</style>
