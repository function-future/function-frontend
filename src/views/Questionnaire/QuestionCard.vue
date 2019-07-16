<template>
  <div class="question-outer" @click="$emit('click')" :class="{clickAble:isResult}">
    <BaseCard class="question-container">
      <div class="question-number">
        {{ number }}
      </div>
      <div class="question-description">
        {{ description }}
      </div>
      <div v-if="isEdit" class="question-delete">
        <span> <font-awesome-icon icon="times" class="icon-delete"></font-awesome-icon>
        </span>
      </div>
      <div v-if="isResult" class="score-placeholder">
        <span><font-awesome-icon icon="star" size="2x" class="star-icon"></font-awesome-icon></span>
        <span class="score-number"><strong>{{score}}/6</strong></span>
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

  .clickAble {
    cursor: pointer;
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

  .score-placeholder {
    display: flex;
    flex-direction: column;
  }

  .star-icon {
    color: #f1c40f;
  }

  .score-number {
    text-align: center;
    padding-top: 10px;
  }
</style>
