<template>
  <div class="questionnaire-participant-card-outer"
       @click="$emit('click')">
    <div v-if="avatar" class="questionnaire-participant-card-avatar">
      <img :src="avatar">
    </div>
    <div class="questionnaire-participant-card-content">
      <p class="participant-name"><strong>{{ name }}</strong></p>
      <p class="participant-university">{{ university }}</p>
      <p class="participant-statys">{{ role }} - {{ batch }}</p>
    </div>
  </div>
</template>

<script src="./js/QuestionnaireParticipantCard.js">
</script>

<style scoped>

  .questionnaire-participant-card-outer {
    display: flex;
    background: #FFFFFF;
    border: 1px solid #F2F2F2;
    box-sizing: border-box;
    -webkit-box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.1);
    -moz-box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.1);
    box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.1);
    border-radius: 10px;
    padding: 5px 5px 5px 5px;
    text-align: left;
    margin: 5px 0;
    cursor: pointer;
  }

  .questionnaire-participant-card-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
  }

  .questionnaire-participant-card-avatar > img {
    border-radius: 100%;
    height: 75px;
    width: 75px;
  }

  .questionnaire-participant-card-content {
    padding-left: 10px;
  }
  .participant-name > strong {
    font-weight: bold;
    font-size: large;
  }
</style>
