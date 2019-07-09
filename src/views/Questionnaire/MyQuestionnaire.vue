<template>
  <div class="my-questionnaire-outer">
    <div class="my-questionnaire-container">
      <div class="search-bar-my-questionnaire">
        <SearchBar/>
      </div>
      <div class="my-questionnaire-list-container">
        <QuestionnaireCard v-for="myQuestionnaire in myQuestionnaires"
                           :key="myQuestionnaire.id"
                           :title="myQuestionnaire.title"
                           :desc="myQuestionnaire.description"
                           :startDate="myQuestionnaire.startDate"
                           :dueDate="myQuestionnaire.dueDate"
                           :isDisable="myQuestionnaire.dueDate < Date.now()"
                           v-on:click="goToListAppraisees(myQuestionnaire.id)"
        ></QuestionnaireCard>
      </div>
    </div>
  </div>
</template>

<script src="./js/MyQuestionnaire.js">

</script>

<style scoped>
  .my-questionnaire-outer {
    display: flex;
    justify-content: center;
    height: 80vh;
  }

  .search-bar-my-questionnaire {
    width: 300px;
    align-self: flex-end;
  }

  .my-questionnaire-container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .my-questionnaire-list-container {
    overflow: auto;
    padding: 10px;
    min-width: 600px;
  }

</style>
