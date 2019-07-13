<template>
  <div class="container">
    Question Number <!--IF POSSIBLE!-->
    <div class="quiz">
      <div class="quiz-content">
        <div class="quiz-content-question">
          <BaseCard :style="{ margin: 0, height: '100%' }">

          </BaseCard>
        </div>
        <div class="quiz-content-option">
          <BaseButton class="quiz-content-option__item" :style="{ 'margin': '0 0 5px 0'}" buttonClass="button-white"></BaseButton>
          <BaseButton class="quiz-content-option__item" :style="{ 'margin': '0 0 5px 0'}" buttonClass="button-white"></BaseButton>
          <BaseButton class="quiz-content-option__item" :style="{ 'margin': '10px 0 5px 0'}" buttonClass="button-white"></BaseButton>
          <BaseButton class="quiz-content-option__item" :style="{ 'margin': '10px 0 5px 0'}" buttonClass="button-white"></BaseButton>
        </div>
      </div>
      <div class="quiz-action">
        <div class="quiz-action-button">
          <BaseButton :style="{ width: '100%', height: '100%' }" buttonClass="button-save">Finish</BaseButton>
        </div>
        <div class="quiz-action-legend">
          <BaseCard :style="{ 'margin': '15px 0 0 0', 'height': '100%' }">

          </BaseCard>
        </div>
      </div>
    </div>
    <div class="navigation">
      <BaseButton class="navigation__button" :style="{ height: '100%' }" buttonClass="button-save">Previous</BaseButton>
      <BaseButton class="navigation__button" :style="{ height: '100%' }" buttonClass="button-save">Next</BaseButton>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/quiz-questions.js">
</script>

<style lang="scss" scoped>
  .container {
    text-align: left;
  }

  .quiz {
    display: flex;
    flex-direction: row;
    height: 75vh;
    &-content {
      margin: 10px 25px 0 0;
      width: 80%;
      &-question {
        height: 40%;
      }
      &-option {
        height: 50%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 30px;
        &__item {
          height: 45%;
          width: 49%;
        }
      }
    }
    &-action {
      width: 15%;
      &-button {
        height: 5vh;
      }
      &-legend {
        height: 85%;
      }
    }
  }

  .navigation {
    height: 8vh;
    width: 100%;
    display: flex;
    justify-content: space-between;
    &__button {
      width: 49%;
    }
  }
</style>
