<template>
  <div class="my-questionnaire__outer">
    <div class="my-questionnaire__container">
      <div class="my-questionnaire__top-bar">
        <SearchBar/>
      </div>
      <div class="my-questionnaire__content">
        <QuestionnaireCard v-for="myQuestionnaire in myQuestionnaires"
                           :key="myQuestionnaire.id"
                           :title="myQuestionnaire.title"
                           :description="myQuestionnaire.description"
                           :startDate="myQuestionnaire.startDate"
                           :dueDate="myQuestionnaire.dueDate"
                           :isDisable="myQuestionnaire.dueDate < Date.now() || myQuestionnaire.startDate > Date.now()"
                           v-on:click="goToListAppraisees(myQuestionnaire.id, myQuestionnaire.dueDate < Date.now() || myQuestionnaire.startDate > Date.now())"
        ></QuestionnaireCard>
        <infinite-loading ref="infiniteLoading" @infinite="infiniteHandler">
          <div slot="no-more"></div>
          <div slot="no-results"></div>
        </infinite-loading>
      </div>
    </div>
  </div>
</template>

<script src="./js/my-questionnaire.js">

</script>
<style lang="scss" scoped>
  .my-questionnaire {
    &__outer {
      display: flex;
      justify-content: center;
      height: 80vh;
    }

    &__container {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
    }

    &__top-bar{
      align-self: flex-end;
      width: 100%;
      padding: 0px 10px;

      @media only screen and (min-width: 1024px){
        width: 300px;
        align-self: flex-end;
      }
    }

    &__content {
      overflow: auto;
      width: 100%;
      padding: 10px;

      @media only screen and (min-width: 1024px){
        overflow: auto;
        padding: 10px;
      }
    }
  }

</style>
