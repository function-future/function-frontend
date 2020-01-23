<template>
  <div class="questionnaire-results__outer">
    <div class="questionnaire-results__container">
      <span class="questionnaire-results__title">Choose Batch to Questionnaire Results</span>
      <div class="questionnaire-results__content" @click="showSelectBatchModal = true">
        <span class="questionnaire-results__content__placeholder">please choose batch : </span>
        <div class="questionnaire-results__content__input-batch">
          <BaseInput v-model="batch"
                     :disabled="true">
          </BaseInput>
        </div>
      </div>
      <modal-select-batch v-if="showSelectBatchModal" @close="closeModal"
                          @select="selectBatch" class="black">
      </modal-select-batch>
      <div class="questionnaire-results__button-placeholder">
        <b-button
          button-class="button-save"
          class="button-choose is-rounded is-primary"
          @click="goToMembers">
          <span>Choose</span>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script src="./js/questionnaire-results.js">
</script>

<style lang="scss" scoped>
  .questionnaire-results{
    &__outer {
     display: flex;
     justify-content: center;
     height: 80vh;
     flex-direction: column;
    }

    &__container{
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-self: center;
      width: 40vw;
      @media only screen and (max-width: 1023px) {
        width: 100vw;
        padding: 0vh 5vw;
      }
    }

    &__title {
      font-weight: bold;
      font-size: 1.1rem;
    }
    &__button-placeholder {
        display: flex;
        justify-content: flex-end;
        align-self: flex-end;
    }

    &__content {
      display: flex;
      align-items: baseline;

      &__input-batch {
        flex-grow: 1;
        margin: 0px 5px;
        font-size: 0.8rem;
      }

      &__placeholder {
        font-size: 0.6rem;
      }
    }
  }
  /* override over base input */
  .input-box {
    padding: 5px 10px;
  }
</style>
