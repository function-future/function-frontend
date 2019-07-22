<template>
  <div class="questionnaire-results-outer">
    <BaseCard class="batch-select-card">
      <strong>Choose Batch to Questionnaire Results</strong>
      <div class="input inline" @click="showSelectBatchModal = true">
        <div class="batch-select">
          <BaseInput v-model="batch"
                     :disabled="true">
          </BaseInput>
        </div>
      </div>
      <modal-select-batch v-if="showSelectBatchModal" @close="closeModal"
                          @select="selectBatch" class="black">
      </modal-select-batch>
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
