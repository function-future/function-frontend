<template>
    <div>
      <BaseCard class="card-container">
        <div class="questionnaire-title-input">
          <label class="questionnaire-title-input__label-title">{{titleLabel}}</label>
          <br>
          <div v-if="isReview" class="questionnaire-title-input__text-show">
            {{value.title}}
          </div>
          <BaseInput v-else class="input-title" v-model="value.title"></BaseInput>
        </div>
        <div class="questionnaire-desc-area">
          <label class="questionnaire-title-input__label-title">{{descriptionLabel}}</label>
          <br>
          <div v-if="isReview" class="questionnaire-title-input__text-show">
            {{value.description}}
          </div>
          <BaseTextArea v-else class="input-description" v-model="value.description"></BaseTextArea>
        </div>
        <div class="date-picker">
          <div class="start-date-container">
            <label class="questionnaire-title-input__label-title">
              START DATE :
            </label>
            <div class="start-date-placeholder">
              <span><font-awesome-icon icon="calendar-check" class="calendar-icon"></font-awesome-icon></span>
              <span v-if="isReview">{{dateToString(value.startDate)}}</span>
              <datepicker v-else placeholder="select Date" v-model="value.startDate"></datepicker>
            </div>
          </div>
          <div class="due-date-container">
            <label class="questionnaire-title-input__label-title">
              DUE DATE :
            </label>
            <div class="due-date-placeholder">
              <span><font-awesome-icon icon="calendar-times" class="calendar-icon"></font-awesome-icon></span>
              <span v-if="isReview">{{dateToString(value.dueDate)}}</span>
              <datepicker v-else placeholder="select Date" v-model="value.dueDate"></datepicker>
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
</template>

<script src="./js/questionnaire-form.js">
</script>

<style lang="scss" scoped>
  .questionnaire-title-input {
    &__text-show {
      margin: 10px 0px;
      border-radius: 5px;
      padding: 10px;
      background: #FFFFFF;
      border: 1px solid #E5E5E5;
      text-align: left;
    }
  }
  .card-container {
    display: flex;
    padding: 20px;
    margin : 20px 0px 0px 0px;
    height: 60vh;
    flex-direction: column;
    max-width: 800px;
  }

  .questionnaire-title-input {
    margin: 10px 0px;
  }

  @media only screen and (max-width: 1023px) {
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

  @media only screen and (min-width: 1023px) {
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
