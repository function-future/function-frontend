<template>
  <div class="scrollable-container">
    <div class="page-header">
      <BaseButton>Select all</BaseButton>
    </div>
    <BaseCard class="add-quiz__card" v-for="questionBank in questionBankList" :key="questionBank.id">
      <div class="add-quiz__card-header">
        {{questionBank.title}}
      </div>
      <div class="add-quiz__card-body">
        <div class="quiz-description">
          {{questionBank.description}}
        </div>
      </div>
    </BaseCard>
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
    &__card {
      min-height: 175px;
    }
  }
</style>
