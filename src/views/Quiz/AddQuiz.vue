<template>
  <div>
    <div class="page-header">
      <BaseButton :buttonClass="selectedBank.length === questionBankList.length ? 'button-save' : ''">
        <label class="add-quiz__select-section-label">{{selectedBank.length}} / {{questionBankList.length}}
          <input type="checkbox"
                 @change="toggleAllBank"
                 :checked="selectedBank.length === questionBankList.length">
          <span class="checkmark"></span>
        </label></BaseButton>
    </div>
    <div class="scrollable-container">
      <BaseCard class="add-quiz__container"
                v-for="questionBank in questionBankList" :key="questionBank.id">
        <div class="add-quiz__select-section">
          <label class="add-quiz__select-section-label">
            <input type="checkbox" name="selected-banks"
                   @click="questionBankSelected(questionBank.id)"
                   :value="questionBank.id">
            <span class="checkmark"></span>
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
      <BaseButton buttonClass="button-save" @click="goToAddQuizDetail">Save</BaseButton>
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
        padding-left: 35px;
        margin-bottom: 12px;
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
    }
    &__card {
      min-height: 75px;
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
