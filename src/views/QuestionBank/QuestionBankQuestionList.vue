<template>
  <div class="scrollable-container">
    <div class="main-container">
      <div class="page-header">
        <BaseButton class="add-btn" type="submit" buttonClass="button-save" @click="redirectToAddQuestion">
          <font-awesome-icon icon="plus" class="icon"/> Add
        </BaseButton>
      </div>
      <BaseCard class="question-card" v-for="question in questionList" :key="question.id" @click.native="redirectToQuestionDetail(question.id)">
        <div class="question-card__header">
          <font-awesome-icon icon="trash-alt" class="icon red" size="lg"></font-awesome-icon>
        </div>
        <div class="question-card__body">
          {{question.text}}
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/question-bank-question-list.js">
</script>

<style lang="scss" scoped>
  .page-header {
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .add-btn {
    justify-self: flex-end;
    margin-left: auto;
  }
  .question-card {
    min-height: 100px;
    display: flex;
    flex-direction: column;
    &__header {
      display: block;
      align-self: flex-end;
    }
    &__body {
      display: inline-block;
    }
  }
</style>
