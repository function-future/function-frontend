<template>
  <div class="main-container">
    <BaseCard class="question-container">
      <span class="section-header">Question</span>
      <BaseTextArea :style="{height: '200px'}" v-model="questionDetail.label" :disabled="!editMode"></BaseTextArea>
    </BaseCard>
    <div class="options-container">
      <BaseCard class="choices-card" :style="{'margin-bottom': '0'}">
        <span class="section-header">Options</span>
        <div class="answer-container">
          <div class="answer-container__option">
            <span class="answer-container__option-label">A: </span>
            <BaseInput class="answer-container__option-input" :inputType="selectedAnswer === 0 ? 'blue-input' : '' " v-model="questionDetail.options[0].label" placeholder="Option A" :disabled="!editMode"></BaseInput>
          </div>
          <div class="answer-container__option">
            <span class="answer-container__option-label">B: </span>
            <BaseInput class="answer-container__option-input" :inputType="selectedAnswer === 1 ? 'blue-input' : '' " v-model="questionDetail.options[1].label" placeholder="Option B" :disabled="!editMode"></BaseInput>
          </div>
          <div class="answer-container__option">
            <span class="answer-container__option-label">C: </span>
            <BaseInput class="answer-container__option-input" :inputType="selectedAnswer === 2 ? 'blue-input' : '' " v-model="questionDetail.options[2].label" placeholder="Option C" :disabled="!editMode"></BaseInput>
          </div>
          <div class="answer-container__option">
            <span class="answer-container__option-label">D: </span>
            <BaseInput class="answer-container__option-input" :inputType="selectedAnswer === 3 ? 'blue-input' : '' " v-model="questionDetail.options[3].label" placeholder="Option D" :disabled="!editMode"></BaseInput>
          </div>
        </div>
      </BaseCard>
      <div>
        <BaseCard class="answer-card">
          <span class="section-header">Answer</span>
          <label>
            <BaseCard class="select-answer-card" :class="selectedAnswer === 0 ? 'blue-card' : '' " :style="selectAnswerCardStyle">
              A
            </BaseCard>
            <input type="radio" name="selectedAnswer" :value="0" v-model="selectedAnswer" :disabled="!editMode">
          </label>
          <label>
            <BaseCard class="select-answer-card" :class="selectedAnswer === 1 ? 'blue-card' : '' " :style="selectAnswerCardStyle">
              B
            </BaseCard>
            <input type="radio" name="selectedAnswer" :value="1" v-model="selectedAnswer" :disabled="!editMode">
          </label>
          <label>
            <BaseCard class="select-answer-card" :class="selectedAnswer === 2 ? 'blue-card' : '' " :style="selectAnswerCardStyle">
              C
            </BaseCard>
            <input type="radio" name="selectedAnswer" :value="2" v-model="selectedAnswer" :disabled="!editMode">
          </label>
          <label>
            <BaseCard class="select-answer-card" :class="selectedAnswer === 3 ? 'blue-card' : '' " :style="selectAnswerCardStyle">
              D
            </BaseCard>
            <input type="radio" name="selectedAnswer" :value="3" v-model="selectedAnswer" :disabled="!editMode">
          </label>
        </BaseCard>
        <div class="action-container">
          <BaseButton buttonClass="button-cancel" @click="cancelButtonClicked">{{cancelButtonText}}</BaseButton>
          <BaseButton buttonClass="button-save" @click="actionButtonClicked">{{actionButtonText}}</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/question-bank-question-detail.js">
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
      width: 90%;
      display: flex;
      flex-direction: row;
      align-items: center;
      &-label {
        position: relative;
        margin-right: 20px;
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

  .options-container {
    display: flex;
    flex-direction: row;
  }

  .answer-card {
    height: 80%;
  }

  input[type=radio] {
    display: none;
  }

  .select-answer-card:hover {
    cursor: pointer;
    transition: all .3s ease;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.1), 2px 2px 10px rgba(0,0,0,0.3);
  }

  .blue-card {
    background-color: #02AAF3;
    color: white;
  }
</style>

