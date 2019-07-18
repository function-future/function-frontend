<template>
    <div class="questionnaire-edit-outer">
      <div class="questionnaire-edit-container">
        <div class="title-placeholder">
          <h2>Description</h2>
          <BaseButton button-class="button-save" class="button-save-desc" @click="goToUpdateDescription">Save Description</BaseButton>
        </div>
        <hr>
<!--        {{currentQuestionnaireAdmin}}-->
        <QuestionnaireForm :value="currentQuestionnaireAdmin"
                           @input="(newValue) => { setCurrentQuestionnaire(newValue) }"
        />
        <div class="title-placeholder">
          <h2>Questions</h2>
          <BaseButton button-class="button-save" class="button-save" @click="showAddQuestion = true">Add</BaseButton>
        </div>
        <hr>
        <div class="question-container-list">
          <QuestionCard v-for="(question, index) in questions"
                        :id="question.id"
                        :number="index+1"
                        :description="question.description"
                        :score="question.score"
                        :isEdit="true"
                        @clickEdit="AlertEdit(question)"
                        @clickDelete="AlertDelete(question)"
          ></QuestionCard>
        </div>
        <div class="title-placeholder">
          <h2>Appraiser</h2>
          <BaseButton button-class="button-save" class="button-save">Add</BaseButton>
        </div>
        <hr>
        <div class="appraiser-container-list">
<!--          <QuestionnaireParticipantCard v-for="a in 10"-->
<!--                                        :name="appraisee.name"-->
<!--                                        :avatar="appraisee.avatar"-->
<!--                                        :role="appraisee.role"-->
<!--                                        :university="appraisee.university"-->
<!--                                        :batch="appraisee.batch"-->
<!--                                        :isEdit="true"-->
<!--          ></QuestionnaireParticipantCard>-->
        </div>
        <div class="title-placeholder">
          <h2>Appraisee</h2>
          <BaseButton button-class="button-save" class="button-save">Add</BaseButton>
        </div>
        <hr>
        <div class="appraisee-container-list">
<!--          <QuestionnaireParticipantCard v-for="a in 10"-->
<!--                                        :name="appraisee.name"-->
<!--                                        :avatar="appraisee.avatar"-->
<!--                                        :role="appraisee.role"-->
<!--                                        :university="appraisee.university"-->
<!--                                        :batch="appraisee.batch"-->
<!--                                        :isEdit="true"-->
<!--          ></QuestionnaireParticipantCard>-->
        </div>
      </div>
      <modal-add-question :description="question.description" v-if="showAddQuestion"
             @close="showAddQuestion = !showAddQuestion"
             @submit="submitAddQuestion"
      ></modal-add-question>
    </div>
</template>

<script src="./js/QuestionnairesEdit.js">
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

  .question-container-list,
  .appraiser-container-list,
  .appraisee-container-list {
    height: auto;
    max-height: 75vh;
    overflow: auto;
    max-width: 95%;
    padding: 0% 2.5%;
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
