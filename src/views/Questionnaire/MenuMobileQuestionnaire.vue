<template>
    <div class="menu-mobile-questionnaire__outer">
      <div class="menu-mobile-questionnaire__container">
        <div class="menu-mobile-questionnaire__content">
          <MenuCard  class="menu-mobile-questionnaire__content__menu"
                     v-if="!menuList.questionnaireAdmin"
                     :iconMenu="menuMyQuestionnaireIcon"
                     :iconTitle="menuMyQuestionnaireTitle"
                     @click="goToPage('myQuestionnaire')"
          ></MenuCard>
          <MenuCard  class="menu-mobile-questionnaire__content__menu"
                     v-if="menuList.questionnaireAdmin"
                     :iconMenu="menuQuestionnairesIcon"
                     :iconTitle="menuQuestionnairesTitle"
                     @click="goToPage('questionnaires')"
          ></MenuCard>
          <MenuCard  class="menu-mobile-questionnaire__content__menu"
                     v-if="menuList.questionnaireAdmin"
                     :iconMenu="menuQuestionnaireResultsIcon"
                     :iconTitle="menuQuestionnaireResultsTitle"
                     @click="goToPage('questionnaireResults')"
          ></MenuCard>
        </div>
      </div>
    </div>
</template>

<script src="./js/menu-mobile-questionnaire.js">
</script>

<style lang="scss" scoped>
  .menu-mobile-questionnaire {
    &__outer {
      display: flex;
      align-items: center;
      flex-direction: column;
      height: 90vh;
      @media only screen and (max-width: 1023px) {
        height: calc(100vh - 60px - 0.5rem - 62px);
      }
      width: 100%;
    }

    &__container {
      display: flex;
      flex-direction: column;
      width: 100%;
      @media only screen and (max-width: 1023px) {
        width: 100vw;
        padding: 10px;
      }
    }

    &__content {
      margin: 5px 0px;
      &__menu {
        margin: 5px 0px;
      }
    }
  }
</style>
