<template>
    <div class="questionnaire-edit-outer">
      <div class="questionnaire-edit-container">
        <div class="title-placeholder">
          <h2>Description</h2>
          <BaseButton button-class="button-save" class="button-save-desc" @click="goToUpdateDescription">Save Description</BaseButton>
        </div>
        <hr>
        <QuestionnaireForm :value="currentQuestionnaireAdmin"
                           @input="(newValue) => { setCurrentQuestionnaire(newValue) }"
        />
        <div class="title-placeholder">
          <h2>Questions</h2>
          <BaseButton button-class="button-save" class="button-save" @click="questionModal = true">Add</BaseButton>
        </div>
        <hr>
        <div class="question-container-list">
          <QuestionCard v-for="(question, index) in currentQuestions"
                        :id="question.id"
                        :number="index+1"
                        :description="question.description"
                        :score="question.score"
                        :isEdit="true"
                        @clickEdit="openEditModal(question)"
                        @clickDelete="openDeleteConfirmationModalQuestion(index, question)"
          ></QuestionCard>
        </div>
        <div class="title-placeholder">
          <h2>Participant - Appraisee</h2>
          <BaseButton button-class="button-save" class="button-save" @click="participantModal = true">Add</BaseButton>
        </div>
        <hr>
        <div class="appraiser-container-list">
          <template v-for="appraisee in currentAppraisee">
            <UserSimpleCard :user="appraisee" @remove="openDeleteConfirmationModalParticipantAppraisee(appraisee)"></UserSimpleCard>
          </template>
        </div>
        <div class="title-placeholder">
          <h2>Participant - Appraiser</h2>
          <BaseButton button-class="button-save" class="button-save" @click="participantModalAppraiser = true">Add</BaseButton>
        </div>
        <hr>
        <div class="appraisee-container-list">
          <template v-for="appraiser in currentAppraiser">
            <UserSimpleCard :user="appraiser" @remove="openDeleteConfirmationModalParticipantAppraiser(appraiser)"></UserSimpleCard>
          </template>
        </div>
      </div>
      <modal-add-question :description="question.description" :isUpdate="question.isUpdate" v-if="questionModal"
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
        @addMember="submitParticipant"
        :selectedUsers="currentAppraiseeTemp"
        :isQuestionnaireSearch="true"
        @close="participantModal = false"
        v-if="participantModal"></ReminderMemberModal>
      <ReminderMemberModal
        @addMember="submitParticipantAppraiser"
        :selectedUsers="currentAppraiserTemp"
        :isQuestionnaireSearch="true"
        @close="participantModalAppraiser = false"
        v-if="participantModalAppraiser"></ReminderMemberModal>
      <modal-delete-confirmation
        v-if="deleteConfirmationModalParticipant.show"
        @close="closeDeleteConfirmationModalParticipant"
        @clickDelete="deleteTheParticipant">
        <div slot="description">
          to delete {{deleteConfirmationModalParticipant.name}} as participant
        </div>></modal-delete-confirmation>
    </div>
</template>

<script src="./js/questionnaires-edit.js">
</script>

<style scoped>

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
    max-width: 95%;
    padding: 0% 2.5%;
  }

  .appraiser-container-list,
  .appraisee-container-list {
    display: flex;
    flex-wrap: wrap;
  }

  .title-placeholder {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
  }

  .button-save {
    align-items: flex-end;
  }

  .button-save-desc {
    font-size: small;
  }
</style>
