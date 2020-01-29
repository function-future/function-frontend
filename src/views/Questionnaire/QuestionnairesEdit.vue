<template>
    <div class="questionnaire-edit__outer">
      <div class="questionnaire-edit__container">
        <div class="questionnaire-edit__progress-bar">
          <b-progress :value="progressValue" :max="maxValue" type="is-info" show-value>
            <span>{{progressValue}} out of 4</span>
          </b-progress>
        </div>
        <div class="questionnaire-edit__progress-action">
          <div class="questionnaire-edit__progress-action__back-button">
            <b-button v-if="progressValue > 1"
                      class="is-primary is-rounded"
                      @click="prevProgress">
              <span>Back</span>
            </b-button>
          </div>
          <div class="questionnaire-edit__progress-action__next-button">
            <b-button
              class="is-primary is-rounded"
              @click="nextProgress">
              <span v-if="progressValue != 4">Next</span>
              <span v-if="progressValue == 4">Finish</span>
            </b-button>
          </div>
        </div>
        <div class="questionnaire-edit__container__content-description" v-if="progressValue == 1 || progressValue == 4">
          <div class="title-placeholder">
            <span class="questionnaire-edit__container__content-description__progress-title">
              Description
            </span>
          </div>
          <QuestionnaireForm class="questionnaire-edit__container__content-description__form"
                             :value="currentQuestionnaireAdmin"
                             :isReview="progressValue == 4"
                             @input="(newValue) => { setCurrentQuestionnaire(newValue) }"
          />
        </div>
        <div class="questionnaire-edit__container__content-question" v-if="progressValue == 2 || progressValue == 4">
          <div class="title-placeholder" >
            <span class="questionnaire-edit__container__content-description__progress-title">
              Questions
            </span>
            <b-button v-if="progressValue == 2"
              button-class="button-save"
              class="button-save is-primary is-rounded"
              @click="questionModal = true">
              <span>Add</span>
            </b-button>
          </div>
          <div class="question-container-list">
            <QuestionCard v-for="(question, index) in currentQuestionsTemp"
                          :id="question.id"
                          :number="index+1"
                          :description="question.description"
                          :score="question.score"
                          :isEdit="progressValue != 4"
                          @clickEdit="openEditModal(question, index)"
                          @clickDelete="openDeleteConfirmationModalQuestion(index, question)"
            ></QuestionCard>
          </div>
        </div>
        <div class="questionnaire-edit__container__content-appraisee" v-if="progressValue == 3 || progressValue == 4">
          <div class="title-placeholder">
            <span class="questionnaire-edit__container__content-description__progress-title">Participant - Appraisee</span>
            <b-button v-if="progressValue == 3"
              button-class="button-save"
              class="button-save is-rounded is-primary"
              @click="participantModal = true">
              <span>Add</span>
            </b-button>
          </div>
          <div class="appraiser-container-list">
            <template v-for="appraisee in currentAppraiseeTemp">
              <UserSimpleCard
                :user="appraisee"
                :showRemove="progressValue != 4"
                @remove="openDeleteConfirmationModalParticipantAppraisee(appraisee)">
              </UserSimpleCard>
            </template>
          </div>
        </div>
        <div class="questionnaire-edit__container__content-appraiser" v-if="progressValue == 3 || progressValue == 4">
          <div class="title-placeholder">
            <span class="questionnaire-edit__container__content-description__progress-title">Participant - Appraiser</span>
            <b-button v-if="progressValue == 3"
              button-class="button-save"
              class="button-save is-primary is-rounded"
              @click="participantModalAppraiser = true">
              <span>Add</span>
            </b-button>
          </div>
          <div class="appraisee-container-list">
            <template v-for="appraiser in currentAppraiserTemp">
              <UserSimpleCard
                :user="appraiser"
                :showRemove="progressValue != 4"
                @remove="openDeleteConfirmationModalParticipantAppraiser(appraiser)">
              </UserSimpleCard>
            </template>
          </div>
        </div>
      </div>
      <modal-add-question :type="question.type" :description="question.description" :isUpdate="question.isUpdate" v-if="questionModal"
             @close="closeQuestionModal"
             @submit="submitAddQuestion"
             @update="updateTheQuestionQuestionnaire"
      ></modal-add-question>
      <modal-delete-confirmation
          v-if="deleteConfirmationModalQuestion.show"
          @close="resetDeleteConfirmationModalQuestion"
          @clickDelete="deleteTheQuestionQuestionnaire">
        <div slot="description">
          to delete question Number {{this.deleteConfirmationModalQuestion.selectedIndex}}
          <br>
          " {{ this.deleteConfirmationModalQuestion.description}} "
        </div>></modal-delete-confirmation>
      <ReminderMemberModal
        @addMember="addAppraisee"
        :selectedUsers="currentAppraiseeTemp"
        :isQuestionnaireSearch="true"
        @close="participantModal = false"
        v-if="participantModal"></ReminderMemberModal>
      <ReminderMemberModal
        @addMember="addAppraiser"
        :selectedUsers="currentAppraiserTemp"
        :isQuestionnaireSearch="true"
        @close="participantModalAppraiser = false"
        v-if="participantModalAppraiser"></ReminderMemberModal>
      <modal-delete-confirmation
        v-if="deleteConfirmationModalParticipant.show"
        @close="closeDeleteConfirmationModalParticipant"
        @clickDelete="deleteTheParticipant">
        <div slot="description">
          to delete {{deleteConfirmationModalParticipant.participant.name}} as participant
        </div>></modal-delete-confirmation>
    </div>
</template>

<script src="./js/questionnaires-edit.js">
</script>

<style lang="scss" scoped>

  .questionnaire-edit {
    &__outer {
      display: flex;
      justify-content: center;
      height: 80vh;
      padding : 10px;
    }

    &__container {
      overflow: auto;
      width: 40vw;
      @media only screen and (max-width: 1023px) {
        width: 100vw;
      }

      &__content-description {
        width: 100%;

        &__progress-title {
          text-align: left;
          font-weight: bold;
          font-size: 1.5rem;
        }

        &__form {
          padding: 5px;
        }
      }

      &__content-quesiton {
        width: 100%;
        max-width: 800px;
      }

      &__content-appraisee {
        width: 100%;
        max-width: 800px;
      }

      &__content-appraiser {
        width: 100%;
        max-width: 800px;
      }
    }

    &__progress-action {
      margin-top: 10px;
      display: flex;
      align-items: baseline;

      &__back-button {
        display: flex;
        flex-grow: 1;
      }

      &__next-button {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        align-items: flex-end;
      }
    }
  }

  h2 {
    text-align: left;
    margin: 10px 0px;
  }

  .questionnaire-edit-outer {
    display: flex;
    justify-content: center;
    height: 80vh;
  }

  .questionnaire-edit-container {
    overflow: auto;
    padding: 10px;
    width: 100%;
    max-width: 800px;
  }

  .question-container-list
   {
    height: auto;
    max-height: 75vh;
    overflow: auto;
  }

  .appraiser-container-list,
  .appraisee-container-list {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
  }

  .title-placeholder {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
  }

  .button-save {
    align-items: flex-end;
  }

  .button-save-desc {
    font-size: small;
  }
</style>
