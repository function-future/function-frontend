<template>
    <div>
      <BaseCard class="card-container">
        <div class="questionnaire-title-input">
          <BaseInput :label="titleLabel" class="input-title" v-model="value.title"></BaseInput>
        </div>
        <div class="questionnaire-desc-area">
          <BaseTextArea :label="descriptionLabel" class="input-description" v-model="value.description"></BaseTextArea>
        </div>
        <div class="date-picker">
          <div class="start-date-container">
            <span> START DATE </span>
            <div class="start-date-placeholder">
              <span><font-awesome-icon icon="calendar-check" class="calendar-icon"></font-awesome-icon></span>
              <datepicker v-model="value.startDate"></datepicker>
            </div>
          </div>
          <div class="due-date-container">
            <span> DUE DATE </span>
            <div class="due-date-placeholder">
              <span><font-awesome-icon icon="calendar-times" class="calendar-icon"></font-awesome-icon></span>
              <datepicker v-model="value.dueDate"></datepicker>
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
</template>

<script src="./js/QuestionnaireForm.js">
</script>

<style scoped>
  .card-container {
    display: flex;
    padding: 10px;
    margin : 0px;
    margin-top: 20px;
    height: 60vh;
    flex-direction: column;
    max-width: 800px;
  }

  .questionnaire-title-input {
    margin: 10px 0px 10px 0px;
  }

  @media only screen and (max-width: 1000px) {
    .date-picker {
      flex-direction: column;
    }
  }
  .date-picker {
    display: flex;
    max-width: 90%;
    padding-top: 10px;
  }

  .input-description {
    height: 15vh;
  }

  .questionnaire-desc-area {
    min-height: 20vh;
  }

  @media only screen and (min-width: 900px) {
    .start-date-placeholder, .due-date-placeholder {
      min-width: 250px;
    }
  }
  .start-date-placeholder, .due-date-placeholder {
    display: flex;
    padding-top: 5px;
  }

  .start-date-container, .due-date-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 5px 0px 0px 5px;
  }

  .calendar-icon {
    padding-right: 5px;
  }

</style>
