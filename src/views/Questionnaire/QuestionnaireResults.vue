<template>
  <div class="questionnaire-results-outer">
    <BaseCard class="batch-select-card">
      <strong>Choose Batch to Questionnaire Results</strong>
      <BaseSelect v-model="batch" :options="batches" class="select-placeholder"></BaseSelect>
      <div class="button-placeholder">
        <BaseButton button-class="button-save" class="button-choose" @click="goToMembers">Choose</BaseButton>
      </div>
    </BaseCard>
  </div>
</template>

<script src="./js/QuestionnaireResults.js">
</script>

<style scoped>
  .questionnaire-results-outer {
    display: flex;
    justify-content: center;
    height: 100%;
  }


  .batch-select-card {
    margin-top: 25vh;
    height: 30%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .select-placeholder {
    height: 100%;
    margin-top: 20px;
  }

  .button-placeholder {
    display: flex;
    justify-content: flex-end;
    align-self: flex-end;
  }

</style>
