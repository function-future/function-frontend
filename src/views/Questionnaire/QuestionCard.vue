<template>
  <div class="question__outer" @click="$emit('click')" :class="{clickAble:isResult}">
    <div class="question__container" >
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
    </div>
  </div>
</template>

<script src="./js/question-card.js">

</script>


<style lang="scss" scoped>

  .question {
    &__outer {
      width: 100%;
    }

    &__container {
      display: flex;
      justify-content: space-between;
      background: #FFFFFF;
      border: 1px solid #F2F2F2;
      box-sizing: border-box;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      text-align: left;
      margin: 5px 10px;
      padding: 10px;
      cursor: pointer;
      height: auto;
    }

    &__number {
      font-size: 3rem;
      display: flex;
      align-items: center;
    }

    &__description {
      padding: 5px;
      text-align: left;
      width: 100%;
      align-self: center;
    }

    &__score-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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
