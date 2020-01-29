<template>
  <div class="questionnaire-participant-card__outer">
    <div class="questionnaire-participant-card__container" >
      <div class="questionnaire-participant-card__content-user">
        <img v-if="avatar" alt="user picture" class="questionnaire-participant-card__content-user__avatar"
             :src="avatar || require('@/assets/profile-picture-placeholder.png')">
        <div class="questionnaire-participant-card__content-user__description">
          <span class="questionnaire-participant-card__content-user__description__participant-name">
            {{ name }}
          </span>
          <div v-if="comment" class="questionnaire-participant-card__content-user__description__participant-comment">
            <i>{{comment}}</i>
          </div>
        </div>
      </div>
      <div class="questionnaire-participant-card__content-score">
        <div class="questionnaire-participant-card__content-score__score-placeholder">
          <span><font-awesome-icon icon="star" size="lg" class="questionnaire-participant-card__content-score__icon">
          </font-awesome-icon></span>
          <span class="questionnaire-participant-card__content-score__score-number"><strong>{{score.toFixed(1)}}/6.0</strong></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/questionnaire-participant-simple-card.js">
</script>

<style lang="scss" scoped>
  .questionnaire-participant-card{
    &__outer {
      display: flex;
      width: 100%;
      justify-content: center;
    }

    &__container {
      width: 100%;
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

    &__content-user {
      display : flex;
      flex-grow: 1;
      &__avatar {
        align-self: flex-start;
        border-radius: 100%;
        height: 50px;
        width: 50px;
      }

      &__description {
        &__participant-name {
          font-weight: bold;
        }
        &__participant-comment {
          font-style: italic;
        }
      }
    }

    &__content-score {
      align-self: center;
      text-align: right;
      min-width: 20%;

      &__icon {
        color: #f1c40f;
        padding: 0px 5px;
      }

      &__score-number {
        text-align: center;
      }
    }
  }

</style>
