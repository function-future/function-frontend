<template>
  <div class="questionnaire-create-outer">
    <div class="questionnaire-create-container">
      <div class="top-button-bar">
        <BaseButton type="submit" button-class="button-save">
          <span>Create</span>
        </BaseButton>
      </div>
      <div class="questionnaire-create-content">
        <QuestionnaireForm></QuestionnaireForm>
      </div>
    </div>
  </div>
</template>

<script src="./js/QuestionnairesCreate.js">
</script>

<style scoped>
  .questionnaire-create-outer {
    display: flex;
    height: 80vh;
    justify-content: center;
    margin-top: 40px;
  }

  .questionnaire-create-container {
    display: flex;
    flex-direction: column;
    min-width: 800px;
  }
  .top-button-bar {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

</style>
