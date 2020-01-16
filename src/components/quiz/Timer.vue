<template>
  <div class="timer__container">

    <b-progress class="timer__container-progress"
                :value="remainingTime"
                type="is-primary"
                size="is-large"
                show-value>
      <span>{{ minutes }}:{{ seconds }}</span>
    </b-progress>
  </div>
</template>

<script type="text/javascript" src="./js/timer.js"></script>

<style scoped lang="scss">
  @import "@/assets/css/main.scss";

  .timer {
    &__container {
      display: flex;
      justify-content: space-around;
      width: 100%;
      &-label {

      }
      &-progress {
        width: 100%;
      }
    }
  }


</style>
