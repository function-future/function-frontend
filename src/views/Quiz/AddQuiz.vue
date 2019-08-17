<template>
  <div>
    <div class="page-header">
      <BaseButton :style="{'width': '150px'}">
        <label class="add-quiz__select-section-label" :class="{label_active: selectedBank.length === questionBankList.length}">
          {{selectedBank.length}} / {{questionBankList.length}}
          <input type="checkbox"
                 @change="toggleAllBank"
                 :checked="selectedBank.length === questionBankList.length">
          <span class="checkmark">
            <font-awesome-icon icon="check" class="check" size="xs" style="margin-left: 0.05vw; margin-top: 7px; color: white;" v-if="selectedBank.length === questionBankList.length"/>
          </span>
        </label>
      </BaseButton>
    </div>
    <div class="scrollable-container">
      <BaseCard class="add-quiz__container"
                v-for="questionBank in questionBankList" :key="questionBank.id">
        <div class="add-quiz__select-section">
          <label class="add-quiz__select-section-label">
            <input type="checkbox" name="selected-banks"
                   @click="questionBankSelected(questionBank.id)"
                   :checked="selectedBank.includes(questionBank.id)"
                   :value="questionBank.id">
            <span class="checkmark">
              <font-awesome-icon icon="check" class="check add-quiz__select-section-label-icon" size="xs" style="margin-left: 7px; margin-top: 7px; color: white;" v-if="selectedBank.includes(questionBank.id)"/>
            </span>
          </label>
        </div>
        <div class="add-quiz__card">
          <div class="add-quiz__card-header">
            {{questionBank.title}}
          </div>
          <div class="add-quiz__card-body">
            <div class="quiz-description">
              {{questionBank.description}}
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
    <div class="page-footer">
      <BaseButton buttonClass="button-save" @click="goToAddQuizDetail" :disabled="selectedBank.length === 0">Save</BaseButton>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/add-quiz.js">
</script>

<style lang="scss" scoped>
  .page-header {
    display: flex;
    justify-content: flex-start;
    margin-left: 20px;
    width: 200px;
    height: 50px;
  }
  .add-quiz {
    &__container {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    &__select-section {
      &-label {
        position: relative;
        top: 0px;
        padding-left: 40px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        & input[type=checkbox] {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }

        &:hover input[type=checkbox] ~ .checkmark {
          background-color: #ccc;
        }

        & input[type=checkbox]:checked ~ .checkmark {
          background-color: rgba(2, 170, 243, 0.8);
        }
      }
    }
    &__card {
      min-height: 75px;
      margin-left: 10px;
      margin-top: 25px;
      &-header {
        font-weight: bold;
        font-size: 20px;
      }
      &-body {
        margin-top: 5px;
        font-size: 18px;
      }
    }
  }
  .checkmark {
    position: absolute;
    top: -2px;
    left: -10px;
    height: 30px;
    width: 30px;
    background-color: #eee;
    border-radius: 50%;
  }

  .active {
    background-color: rgba(2, 170, 243, 0.8);
  }

  .label_active {
    color: rgba(0, 0, 0, 0.5);
  }

  .scrollable-container {
    max-height: 70vh;
    overflow: auto;
    padding-right: 5px;
    &::-webkit-scrollbar-track
    {
      background-color: #F5F5F5;
      border-radius: 10px;
    }

    &::-webkit-scrollbar
    {
      width: 10px;
      background-color: #02AAF3;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb
    {
      border-radius: 10px;
      background-color: #02AAF3;
    }
  }
  .page-footer {
    margin-top: 30px;
    margin-right: 20px;
    display: flex;
    justify-content: flex-end;
  }
</style>
