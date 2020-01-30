<template>
  <div class="questionnaire-participant-card-detail__outer">
    <div class="questionnaire-participant-card-detail__container">
      <div class="questionnaire-participant-card-detail__avatar">
        <img :src="avatar || require('@/assets/profile-picture-placeholder.png')">
      </div>
      <div class="questionnaire-participant-card-detail__content">
        <p class="questionnaire-participant-card-detail__content__participant-name participant">
          {{ nameParticipant }}
        </p>
        <p class="questionnaire-participant-card-detail__content__participant-university participant">
          {{ university }}
        </p>
        <p class="questionnaire-participant-card-detail__content__participant-status participant">
          {{ computedRole }} - {{ batch }}
        </p>
        <div class="questionnaire-participant-card-detail__content__score-placeholder">
          <span class="questionnaire-participant-card-detail__content__score-placeholder__icon">
            <font-awesome-icon icon="star" size="lg"></font-awesome-icon>
          </span>
          <span class="questionnaire-participant-card-detail__content__score-placeholder__score-number">
            {{score.toFixed(1)}}/6.0
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/questionnaire-participant-detail-card.js">
</script>

<style lang="scss" scoped>

  * {
    margin: 0px;
  }

  .questionnaire-participant-card-detail{
    &__outer {
      display: flex;
      width: 100%;
      justify-content: center;
    }

    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 250px;
      justify-content: space-between;
      background: #FFFFFF;
      border: 1px solid #F2F2F2;
      box-sizing: border-box;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      text-align: left;
      margin: 5px 10px;
      padding: 10px;
      height: auto;
    }

    &__avatar > img {
      border-radius: 100%;
      height: 125px;
      width: 125px;
      padding: 10px;
    }

    &__content {
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: center;


      &__participant-name {
        font-size: 1.2rem;
        font-weight: bold;
      }

      &__score-placeholder {
        text-align: center;

        &__icon {
          color: #f1c40f;
          padding: 5px;
        }

        &__score-number {
          font-weight: bold;
        }
      }

    }
  }
</style>
