<template>
  <div class="question-outer">
    <BaseCard class="question-container">
      <div class="question-number">
        {{ numberQuestion }}
      </div>
      <div class="question-description">
        {{ descriptionQuestion }}
      </div>
      <div class="question-delete">
      <span> <font-awesome-icon icon="times" class="icon-delete"></font-awesome-icon>
      </span>
      </div>
    </BaseCard>
  </div>
</template>

<script src="./js/QuestionCard.js">

</script>


<style scoped>
  .question-outer {
    min-height: 15vh;
    width: 100%;
  }

  .question-container {
    display: flex;
    padding-right: 10px;
    justify-content: space-between;
  }
  .question-number {
    font-size: 3rem;
    padding-right: 5px;
  }

  .question-description {
    padding-top: 5px;
    text-align: left;
    width: 100%;
  }

</style>
