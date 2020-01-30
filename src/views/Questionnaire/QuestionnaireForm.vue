<template>
    <div>
      <div class="card-container">
        <div class="questionnaire-title-input">
          <label class="questionnaire-title-input__label-title">{{titleLabel}}</label>
          <br>
          <div v-if="isReview" class="questionnaire-title-input__text-show">
            {{value.title}}
          </div>
          <b-input v-else class="input-title" v-model="value.title"></b-input>
        </div>
        <div class="questionnaire-desc-area">
          <label class="questionnaire-title-input__label-title">{{descriptionLabel}}</label>
          <br>
          <div v-if="isReview" class="questionnaire-title-input__text-show">
            {{value.description}}
          </div>
          <b-input type="textarea" v-else class="input-description" v-model="value.description"></b-input>
        </div>
        <div class="date-picker">
          <div class="start-date-container">
            <label class="questionnaire-title-input__label-title">
              START DATE :
            </label>
            <div class="start-date-placeholder">
              <span v-if="isReview">{{dateToString(value.startDate)}}</span>
              <b-datetimepicker v-else
                placeholder="Type or select a date..."
                icon="calendar"
                v-model="value.startDate"
                editable>
              </b-datetimepicker>
            </div>
          </div>
          <div class="due-date-container">
            <label class="questionnaire-title-input__label-title">
              DUE DATE :
            </label>
            <div class="due-date-placeholder">
              <span v-if="isReview">{{dateToString(value.dueDate)}}</span>
              <b-datetimepicker v-else
                placeholder="Type or select a date..."
                icon="calendar-times"
                v-model="value.dueDate"
                editable>
              </b-datetimepicker>
            </div>
          </div>
        </div>
      </div>
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
    justify-content: space-between;
    flex-direction: column;
    background: #FFFFFF;
    border: 1px solid #F2F2F2;
    box-sizing: border-box;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    text-align: left;
    margin: 5px 10px;
    padding: 10px;
    height: auto;
    max-width: 40vw;
    @media only screen and (max-width: 1023px) {
      max-width: 100vw;
    }
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
    flex-direction: column;
    padding-top: 10px;
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
