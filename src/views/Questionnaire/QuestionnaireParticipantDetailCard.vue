<template>
  <div class="questionnaire-participant-card-detail-container-outer">
    <BaseCard class="questionnaire-participant-card-detail-container">
      <div v-if="avatar" class="questionnaire-participant-card-detail-avatar">
        <img :src="avatar">
      </div>
      <div class="questionnaire-participant-card-detail-content">
        <p class="participant participant-name"><strong>{{ nameParticipant }}</strong></p>
        <p class="participant participant-university">{{ university }}</p>
        <p class="participant participant-status">{{ computedRole }} - {{ batch }}</p>
        <div class="score-placeholder">
          <span><font-awesome-icon icon="star" size="lg" class="star-icon"></font-awesome-icon></span>
          <span class="score-number"><strong>{{score.toFixed(1)}}/6.0</strong></span>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script src="./js/QuestionnaireParticipantDetailCard.js">
</script>

<style scoped>
  * {
    margin: 0px;
  }

  .questionnaire-participant-card-detail-container-outer {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .questionnaire-participant-card-detail-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 250px;
  }

  .questionnaire-participant-card-detail-avatar > img {
    border-radius: 100%;
    height: 125px;
    width: 125px;
    padding: 10px;
  }

  .questionnaire-participant-card-detail-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .star-icon {
    color: #f1c40f;
    padding-right: 5px;
  }

  .score-number {
    text-align: center;
    padding-top: 10px;
  }

  .participant-name {
    font-size: 1.5rem;
  }

  .participant, .score-placeholder {
    text-align: center;
    padding-top: 2.5px;
  }

</style>
