<template>
  <div class="my-questionnaire-outer">
    <BaseCard class="my-questionnaire-card">
      <div class="search-bar-my-questionnaire">
        <SearchBar class="search-bar"/>
      </div>
      <div class="my-questionnaire-list-container">
        <QuestionnaireCard v-for="item in 20"
                           :title="item.toString().concat('asdkljaslkdjaslkdjalskjd')"
                           :desc="description"
                           :startDate="startdate"
                           :dueDate="duedate"
                           :isDisable="duedate > Date.now()"
        ></QuestionnaireCard>
      </div>
    </BaseCard>
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

  .my-questionnaire-card {
    display: flex;
    width: 900px;
    padding: 0;
    height: 80vh;
    flex-direction: column;
  }
  .search-bar-my-questionnaire {
    display: flex;
    justify-content: flex-end;
  }
  .search-bar {
    flex-basis: 50%;
  }
  .my-questionnaire-list-container{
    overflow: auto;
    padding: 10px;
  }

</style>
