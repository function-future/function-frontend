<template>
  <div class="main-container">
    <BaseCard class="question-container">
      <span class="section-header">Question</span>
      <BaseTextArea :style="{height: '200px'}" v-model="question.text"></BaseTextArea>
    </BaseCard>
    <BaseCard>
      <span class="section-header">Answers</span>
      <div class="answer-container">
        <div class="answer-container__option">
          <label class="answer-container__option-label">Option A
            <input type="radio" name="correct-answer" value="0" checked="checked">
            <span class="checkmark"></span>
          </label>
          <BaseInput class="answer-container__option-input" v-model="question.options[0].label"></BaseInput>
        </div>
        <div class="answer-container__option">
          <label class="answer-container__option-label">Option B
            <input type="radio" name="correct-answer" value="1">
            <span class="checkmark"></span>
          </label>
          <BaseInput class="answer-container__option-input" v-model="question.options[1].label"></BaseInput>
        </div>
        <div class="answer-container__option">
          <label class="answer-container__option-label">Option C
            <input type="radio" name="correct-answer" value="2">
            <span class="checkmark"></span>
          </label>
          <BaseInput class="answer-container__option-input" v-model="question.options[2].label"></BaseInput>
        </div>
        <div class="answer-container__option">
          <label class="answer-container__option-label">Option D
            <input type="radio" name="correct-answer" value="3">
            <span class="checkmark"></span>
          </label>
          <BaseInput class="answer-container__option-input" v-model="question.options[3].label"></BaseInput>
        </div>
      </div>
    </BaseCard>
    <div class="action-container">
      <BaseButton buttonClass="button-cancel" @click="cancelButtonClicked">Cancel</BaseButton>
      <BaseButton buttonClass="button-save" @click="saveButtonClicked">Save</BaseButton>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/question-bank-add-question.js">
</script>

<style lang="scss" scoped>
  .section-header {
    font-weight: bold;
    font-size: large;
  }
  .question-container {
    padding-bottom: 40px;
  }
  .answer-container {
    margin-top: 10px;
    padding-bottom: 20px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
    &__option {
      width: 45%;
      display: flex;
      flex-wrap: wrap;
      &-label {
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        & input[type=radio] {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }
        &:hover input[type=radio] ~ .checkmark {
          background-color: #ccc;
        }
        & input[type=radio]:checked ~ .checkmark {
          background-color: #2196F3;
          &:after {
            display: block;
          }
        }
        .checkmark:after {
          top: 9px;
          left: 9px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: white;
        }
      }
      &-input {
        width: 100%;
      }
    }
  }
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 50%;
    &:after {
      content: "";
      position: absolute;
      display: none;
    }
  }
  .action-container {
    float: right;
    display: flex;
    flex-direction: row;
  }

  .container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
