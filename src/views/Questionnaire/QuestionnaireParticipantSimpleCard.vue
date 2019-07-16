<template>
  <div class="questionnaire-participant-card-outer">
    <BaseCard class="questionnaire-participant-card-container">
      <div v-if="avatar" class="questionnaire-participant-card-avatar">
        <img :src="avatar">
      </div>
      <div class="questionnaire-participant-card-content">
        <p class="participant-name"><strong>{{ name }}</strong></p>
      </div>
      <div class="score-placeholder">
        <span><font-awesome-icon icon="star" size="lg" class="star-icon"></font-awesome-icon></span>
        <span class="score-number"><strong>{{score}}/6.0</strong></span>
      </div>
    </BaseCard>
  </div>
</template>

<script src="./js/QuestionnaireParticipantSimpleCard.js">

</script>

<style scoped>
  .questionnaire-participant-card-outer {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 0px;
  }

  .questionnaire-participant-card-container {
    display: flex;
    align-items: center;
    min-width: 250px;
  }

  .questionnaire-participant-card-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
  }

  .questionnaire-participant-card-avatar > img {
    border-radius: 100%;
    height: 30px;
    width: 30px;
    padding: 10px;
  }

  .star-icon {
    color: #f1c40f;
    padding-right: 5px;
  }

  .score-number {
    text-align: center;
    padding-top: 10px;
  }
</style>
