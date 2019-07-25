<template>
  <div class="question-outer" @click="$emit('click')" :class="{clickAble:isResult}">
    <BaseCard class="question-container" >
      <div class="question-number">
        {{ number }}
      </div>
      <div class="question-description">
        {{ description }}
      </div>
      <div v-if="isEdit" class="question-delete">
        <span> <font-awesome-icon @click="$emit('clickDelete')" icon="times" class="icon-delete"></font-awesome-icon></span>
        <span> <font-awesome-icon @click="$emit('clickEdit')" icon="pencil-alt" class="icon-edit"></font-awesome-icon></span>
      </div>
      <div v-if="isResult" class="score-placeholder">
        <span><font-awesome-icon icon="star" size="2x" class="star-icon"></font-awesome-icon></span>
        <span class="score-number"><strong>{{score.toFixed(1)}}/6.0</strong></span>
      </div>
    </BaseCard>

  </div>
</template>

<script src="./js/QuestionCard.js">

</script>


<style scoped>
  .question-outer {
    width: 100%;
    padding: 10px 0px;
  }

  .clickAble {
    cursor: pointer;
  }


  .question-container {
    display: flex;
    padding-right: 10px;
    justify-content: space-between;
    margin:0px;
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

  .icon-delete {
    font-size: 2rem;
  }

  .icon-edit {
    font-size: 1.5rem;
  }
</style>
