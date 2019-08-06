<template>
  <div class="questionnaire-create-outer">
    <div class="questionnaire-create-container">
      <div class="top-button-bar">
        <BaseButton button-class="button-save" @click="goToCreate">
          <span>Create</span>
        </BaseButton>
      </div>
      <div class="questionnaire-create-content">
        <QuestionnaireForm :value="questionnaire"
                           @input="(newValue) => { setCurrentQuestionnaire(newValue) }"
        />
      </div>
    </div>
  </div>
</template>

<script src="./js/questionnaires-create.js">
</script>

<style scoped>
  .questionnaire-create-outer {
    display: flex;
    height: 80vh;
    justify-content: center;
    margin-top: 40px;
    width: auto;
    overflow: auto;
  }

  @media only screen and (min-width: 1000px) {
    .questionnaire-create-container {
      display: flex;
      flex-direction: column;
      min-width: 800px;
    }
  }
  .questionnaire-create-container {
    display: flex;
    flex-direction: column;
  }

  .top-button-bar {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

</style>
