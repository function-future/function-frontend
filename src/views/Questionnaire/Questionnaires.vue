<template>
  <div class="questionnaires__outer">
    <div class="questionnaires__container">
      <div class="questionnaires__top-bar">
        <div class="questionnaires__top-bar__create-button">
          <b-button class="is-rounded is-primary create-button"
                    icon-left="plus"
                    type="submit"
                    @click="goToCreate">
            <span>New</span>
          </b-button>
        </div>
        <div class="questionnaires__top-bar__search-bar">
          <b-input
            @input="searchHandler"
            icon="search"
            placeholder="Search..."
            class="is-rounded"/>
        </div>
      </div>
      <div class="questionnaires__content">
        <div v-if="Object.keys(questionnaires).length === 0" class="questionnaires__content__empty-wrapper">
          <EmptyState class="questionnaires__empty-state" src="questionnaires-empty">
            <template #title>
              Looks like there is no questionnaire was made!
            </template>
          </EmptyState>
        </div>
        <div v-else class="questionnaires__content__wrapper">
          <QuestionnaireCard v-for="myQuestionnaire in questionnaires"
                             :id="myQuestionnaire.id"
                             :title="myQuestionnaire.title"
                             :description="myQuestionnaire.description"
                             :startDate="myQuestionnaire.startDate"
                             :dueDate="myQuestionnaire.dueDate"
                             :isEdit="true"
                             :isDisable="Date.now() > myQuestionnaire.startDate"
                             @clickDelete="openDeleteModal(myQuestionnaire)"
          ></QuestionnaireCard>
        </div>
        <infinite-loading ref="infiniteLoading" :identifier="keyword" @infinite="infiniteHandler">
          <div slot="no-more"></div>
          <div slot="no-results"></div>
        </infinite-loading>
        <modal-delete-confirmation
          v-if="deleteConfirmationModal.show"
          @close="closeDeleteModal"
          @clickDelete="deleteQuestionnaireWithId">
          <div slot="description">
            to delete questionnaire "{{deleteConfirmationModal.title}} "
          </div>></modal-delete-confirmation>
      </div>
    </div>
  </div>
</template>

<script src="./js/questionnaires.js">

</script>

<style lang="scss" scoped >

  .questionnaires {
    &__outer {
      display: flex;
      justify-content: center;
      height: 80vh;
      width: 100%;
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
      padding: 0px 10px;

      &__create-button {
        padding-top: 12px;
        align-self: flex-start;
      }

      &__search-bar {
        width: 300px;
        align-self: flex-end;
        @media only screen and (max-width: 1023px) {
          flex-grow: 1;
        }
      }
    }
    &__content {
      overflow: auto;
      padding: 10px;
      width: 100%;
    }
  }

  .create-button {
    @media only screen and (max-width: 1023px) {
      position: fixed;
      right: 5vw;
      bottom: 75px;
      transition: all 0.1s ease-in-out;
      box-shadow: 2px 2px 16px 4px rgba(0, 0, 0, 0.2);
      z-index: 1;
    }
  }
</style>
