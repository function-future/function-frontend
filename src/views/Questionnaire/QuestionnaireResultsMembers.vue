<template>
    <div class="questionnaire-results-member-outer">
      <div class="questionnaire-results-member-container">
        <div class="top-bar">
          <div class="title-bar">
            <h2><strong>Members</strong></h2>
          </div>
          <div class="search-bar">
            <SearchBar/>
          </div>
        </div>
        <div class="participant-list-container">
          <QuestionnaireCard v-for="myQuestionnaire in myQuestionnaires"
                             :key="myQuestionnaire.id"
                             :title="myQuestionnaire.title"
                             :desc="myQuestionnaire.description"
                             :startDate="myQuestionnaire.startDate"
                             :dueDate="myQuestionnaire.dueDate"
                             :isDisable="myQuestionnaire.dueDate < Date.now()"
                             v-on:click="goToListAppraisees(myQuestionnaire.id, myQuestionnaire.dueDate < Date.now())"
          ></QuestionnaireCard>
        </div>
      </div>
    </div>
</template>

<script src="./js/QuestionnaireResultsMembers.js">
</script>

<style scoped>

  .questionnaire-results-member-outer {
    display: flex;
    justify-content: center;
    height: 80vh;
  }

  @media only screen and (min-height: 800px) {
    .questionnaire-results-member-container {
      width: 100%;
    }
  }

  .questionnaire-results-member-container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .top-bar {
    display: flex;
    width: 500px;
    align-items: baseline;
    justify-content: space-between;
  }

  .search-bar {
    align-self: flex-end;
    width: 300px;
  }

</style>
