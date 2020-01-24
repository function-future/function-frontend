<template>
  <div class="questionnaire-create__outer">
    <div class="questionnaire-create__container">
      <div class="questionnaire-create__top-bar">
        <b-button
          class="button-save is-rounded is-primary"
          @click="goToCreate">
          <span>Finish</span>
        </b-button>
      </div>
      <div class="questionnaire-create__content">
        <QuestionnaireForm :value="questionnaire"
                           @input="(newValue) => { setCurrentQuestionnaire(newValue) }"
        />
      </div>
    </div>
  </div>
</template>

<script src="./js/questionnaires-create.js">
</script>

<style lang="scss" scoped>

  .questionnaire-create {
    &__outer {
      display: flex;
      height: 80vh;
      justify-content: center;
      width: auto;
      overflow: auto;
    }

    &__container {
      display: flex;
      flex-direction: column;
      width: 40vw;
      @media only screen and (max-width: 1023px) {
          width: 100vw;
          padding: 10px;
      }
    }

    &__top-bar {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }

</style>
