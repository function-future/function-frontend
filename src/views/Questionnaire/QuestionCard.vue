<template>
  <div class="question__outer" @click="$emit('click')" :class="{clickAble:isResult}">
    <BaseCard class="question__container" >
      <div class="question__number">
        {{ number }}
      </div>
      <div class="question__description">
        {{ description }}
      </div>
      <div v-if="isEdit" class="question__action-icon">
        <span> <font-awesome-icon @click="$emit('clickDelete')" icon="trash-alt" class="icon-delete red"></font-awesome-icon></span>
        <span> <font-awesome-icon @click="$emit('clickEdit')" icon="edit" class="icon-edit blue"></font-awesome-icon></span>
      </div>
      <div v-if="isResult" class="question__score-placeholder">
        <span><font-awesome-icon icon="star" size="2x" class="star-icon"></font-awesome-icon></span>
        <span class="score-number"><strong>{{score.toFixed(1)}}/6.0</strong></span>
      </div>
    </BaseCard>
  </div>
</template>

<script src="./js/question-card.js">

</script>


<style lang="scss" scoped>

  .question {
    &__outer {
      width: 100%;
      padding: 10px;
    }

    &__container {
      display: flex;
      padding-right: 10px;
      justify-content: space-between;
      margin: 0px;
    }

    &__number {
      font-size: 3rem;
      padding-right: 5px;
      display: flex;
      align-items: center;
    }

    &__description {
      padding-top: 5px;
      text-align: left;
      width: 100%;
      align-self: center;
    }

    &__score-placeholder {
      display: flex;
      flex-direction: column;
    }

    &__action-icon {
      align-self: center;
    }
  }

  .clickAble {
    cursor: pointer;
  }

  .star-icon {
    color: #f1c40f;
  }

  .score-number {
    text-align: center;
    padding-top: 10px;
  }

  .icon-delete {
    font-size: 1.5rem;
  }

  .icon-edit {
    font-size: 1.5rem;
  }

  .red {
    color: red;
  }

  .blue {
    color: #02AAF3;
  }
</style>
