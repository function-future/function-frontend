<template>
  <BaseCard class="questionnaire-participant-card-detail-container">
    <div v-if="avatar" class="questionnaire-participant-card-detail-avatar">
      <img :src="avatar">
    </div>
    <div class="questionnaire-participant-card-detail-content">
      <p class="participant-name"><strong>{{ nameParticipant }}</strong></p>
      <p class="participant-university">{{ university }}</p>
      <p class="participant-status">{{ computedRole }} - {{ batch }}</p>
    </div>
    <div class="score-placeholder">
      <span><font-awesome-icon icon="star" size="lg" class="star-icon"></font-awesome-icon></span>
      <span class="score-number"><strong>5.0/6.0</strong></span>
    </div>
  </BaseCard>
</template>

<script src="./js/QuestionnaireParticipantDetailCard.js">
</script>

<style scoped>
  .questionnaire-participant-card-detail-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .questionnaire-participant-card-detail-avatar > img {
    border-radius: 100%;
    height: 125px;
    width: 125px;
    padding: 10px;
  }

  .star-icon {
    color: #f1c40f;
  }

  .score-number {
    text-align: center;
    padding-top: 10px;
  }

  .participant-name {
    font-size: 1.5rem;
  }
</style>
