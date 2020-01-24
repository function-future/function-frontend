<template>
  <div class="questionnaire-participant-card__outer" @click="$emit('click')">
    <div class="questionnaire-participant-card__container">
      <div class="questionnaire-participant-card__avatar">
        <img :src="avatar || require('@/assets/profile-picture-placeholder.png')">
      </div>
      <div class="questionnaire-participant-card__content">
        <p class="questionnaire-participant-card__content__participant-name"><strong>{{ name }}</strong></p>
        <p class="questionnaire-participant-card__content__participant-university">{{ university ? university : '-'}}</p>
        <p class="questionnaire-participant-card__content__participant-status">{{ computedRole }} - {{ batch }}</p>
      </div>
      <div v-if="isResult" class="questionnaire-participant-card__score-placeholder">
        <div class="questionnaire-participant-card__score-placeholder__icon"><font-awesome-icon icon="star" size="2x" class="star-icon"></font-awesome-icon></div>
        <div class="questionnaire-participant-card__score-placeholder__score-number">{{score.toFixed(1)}}/6.0</div>
      </div>
      <div v-if="isEdit" class="questionnaire-participant-card__delete-placeholder">
        <span>
          <font-awesome-icon icon="times" class="icon-delete" @click="$emit('delete')"></font-awesome-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script src="./js/questionnaire-participant-card.js">
</script>

<style lang="scss" scoped>

  * {
    margin: 0px;
    padding: 0px;
  }

  .questionnaire-participant-card {

    &__outer {
      width: 100%;
    }

    &__container {
      display: flex;
      background: #FFFFFF;
      border: 1px solid #F2F2F2;
      box-sizing: border-box;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      text-align: left;
      margin: 10px;
      padding: 10px;
      cursor: pointer;
      height: auto;
    }

    &__avatar {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__avatar > img {
      border-radius: 100%;
      height: 75px;
      width: 75px;
      padding: 5px;
      min-width: 75px;
    }

    &__content {
      width: 100%;
      padding: 5px;

      &__participant-name{
        font-weight: bold;
        font-size: 1rem;
      }

      &__participant-university {
        font-size: 0.8rem;
      }

      &__participant-status {
        font-size: 0.8rem;
      }
    }
    &__delete-placeholder {
      align-items: flex-end;
    }

    &__score-placeholder {
      display: flex;
      flex-direction: column;
      padding: 5px;
      text-align: center;

      &__icon {
        color: #f1c40f;
        padding: 5px 0px;
      }

      &__score-number {
        font-weight: bold;
      }
    }
  }

  .icon-delete {
    font-size: 2rem;
  }

  .card {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
  }
</style>
