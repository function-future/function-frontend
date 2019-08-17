<template>
  <div class="questionnaire-participant-card-outer">
    <BaseCard class="questionnaire-participant-card">
      <div class="questionnaire-participant-card-container">
        <div class="questionnaire-participant-card-user">
          <img v-if="avatar" class="questionnaire-participant-card-avatar" :src="avatar">
          <div class="questionnaire-participant-card-content">
            <p class="participant-name"><strong>{{ name }}</strong></p>
          </div>
        </div>
        <div class="score-placeholder">
          <span><font-awesome-icon icon="star" size="lg" class="star-icon"></font-awesome-icon></span>
          <span class="score-number"><strong>{{score.toFixed(1)}}/6.0</strong></span>
        </div>
      </div>
      <div v-if="comment">
        <i>{{comment}}</i>
      </div>
    </BaseCard>
  </div>
</template>

<script src="./js/questionnaire-participant-simple-card.js">

</script>




<style scoped>
  .questionnaire-participant-card-outer {
    display: flex;
    width: 90%;
    justify-content: center;
    margin: 0% 5%;
  }

  .questionnaire-participant-card {
    width: 100%;
    padding: 0px 20px 5px 20px;
    margin: 5px 0px;
  }
  .questionnaire-participant-card-container {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }

  .questionnaire-participant-card-user {
    display: flex;
  }

  .questionnaire-participant-card-avatar {
    align-self: center;
    border-radius: 100%;
    height: 30px;
    width: 30px;
  }

  .questionnaire-participant-card-content {
    margin-left: 10px;
  }

  .star-icon {
    color: #f1c40f;
  }

  .score-number {
    text-align: center;
    padding-top: 10px;
  }
</style>
