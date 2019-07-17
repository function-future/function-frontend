<template>
  <div class="questionnaires-outer">
    <div class="questionnaires-container">
      <div class="questionnaire-top-bar">
        <div class="button-create">
          <BaseButton type="submit" buttonClass="button-save" @click="goToCreate">New</BaseButton>
        </div>
        <div class="search-bar-questionnaire">
          <SearchBar/>
        </div>
      </div>
      <div class="questionnaire-list-container">
        <QuestionnaireCard v-for="myQuestionnaire in listQuestionnaires"
                           :id="myQuestionnaire.id"
                           :title="myQuestionnaire.title"
                           :description="myQuestionnaire.description"
                           :startDate="myQuestionnaire.startDate"
                           :dueDate="myQuestionnaire.dueDate"
                           :isEdit="true"
                           :isDisable="false"
                           @clickDelete="deleteQuestionnaireWithId(myQuestionnaire.id)"
        ></QuestionnaireCard>
      </div>
    </div>
  </div>
</template>

<script src="./js/Questionnaires.js">

</script>

<style scoped>
  .questionnaires-outer {
    display: flex;
    justify-content: center;
    height: 80vh;
  }

  .questionnaires-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 800px;
  }

  .search-bar-questionnaire {
    width: 300px;
    align-self: flex-end;
  }

  .questionnaire-top-bar {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    width: 100%;
  }

  .button-create {
    padding-top: 12px;
    align-self: flex-start;
  }

  .search-bar-questionnaire {
    align-self: flex-end;
  }

  .questionnaire-list-container {
    overflow: auto;
    padding: 10px;
    width: 100%;
  }
</style>
