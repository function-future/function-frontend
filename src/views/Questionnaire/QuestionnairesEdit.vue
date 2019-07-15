<template>
    <div class="questionnaire-edit-outer">
      <div class="questionnaire-edit-container">
        <div class="title-placeholder">
          <h2>Description</h2>
          <BaseButton button-class="button-save" class="button-save-desc">Save Description</BaseButton>
        </div>
        <hr>
        <QuestionnaireForm></QuestionnaireForm>
        <div class="title-placeholder">
          <h2>Questions</h2>
          <BaseButton button-class="button-save" class="button-save">Add</BaseButton>
        </div>
        <hr>
        <div class="question-container-list">
          <QuestionCard v-for="n in 20"></QuestionCard>
        </div>
        <div class="title-placeholder">
          <h2>Appraiser</h2>
          <BaseButton button-class="button-save" class="button-save">Add</BaseButton>
        </div>
        <hr>
        <div class="appraiser-container-list">
          <QuestionnaireParticipantCard v-for="a in 10"
                                        :name="appraisee.name"
                                        :avatar="appraisee.avatar"
                                        :role="appraisee.role"
                                        :university="appraisee.university"
                                        :batch="appraisee.batch"
          ></QuestionnaireParticipantCard>
        </div>
        <div class="title-placeholder">
          <h2>Appraisee</h2>
          <BaseButton button-class="button-save" class="button-save">Add</BaseButton>
        </div>
        <hr>
        <div class="appraisee-container-list">
          <QuestionnaireParticipantCard v-for="a in 10"
                                        :name="appraisee.name"
                                        :avatar="appraisee.avatar"
                                        :role="appraisee.role"
                                        :university="appraisee.university"
                                        :batch="appraisee.batch"
                                        :isEdit="true"
          ></QuestionnaireParticipantCard>
        </div>
      </div>
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
  }

  .question-container-list,
  .appraiser-container-list,
  .appraisee-container-list {
    height: 75vh;
    overflow: auto;
    max-width: 100%;
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
