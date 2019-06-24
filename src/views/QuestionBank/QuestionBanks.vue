<template>
  <div class="scrollable-container">
    <div class="page-header">
      <BaseButton class="add-btn" type="submit" buttonClass="button-save" @click="addQuestionBank">
        <font-awesome-icon icon="plus" class="icon"/> Add
      </BaseButton>
    </div>
    <BaseCard class="question-bank__card"
              v-for="questionBank in questionBanks"
              :key="questionBank.id"
              @click.native="goToQuestionBankDetail(questionBank.id)"
              cardClass="card-hover">
      <div class="question-bank__card-header">
        {{questionBank.title}}
      </div>
      <div class="question-bank__card-body">
        <div class="question-bank__card-body-description">
          {{questionBank.description}}
        </div>
      </div>
      <div class="question-bank__card-footer">
        <div>
          <BaseButton buttonClass="button-save" @click.stop="goToQuestionBankQuestions(questionBank.id)">View Questions</BaseButton>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script type="text/javascript" src="./js/question-banks.js">
</script>

<style lang="scss" scoped>
  .page-header {
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .question-bank {
    &__card {
      min-height: 175px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &:hover {
        cursor: pointer;
        transition: all .3s ease;
        box-shadow: 2px 2px 10px rgba(0,0,0,0.1), 2px 2px 10px rgba(0,0,0,0.3);
      }
      &-header {
        font-weight: bolder;
        font-size: 1.4em;
      }
      &-body {
        display: flex;
      }
      &-footer {
        font-size: 0.8em;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
  }
  .add-btn {
    justify-self: flex-end;
    margin-left: auto;
  }
</style>
