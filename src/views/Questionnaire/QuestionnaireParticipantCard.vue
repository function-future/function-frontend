<template>
  <div class="questionnaire-participant-card-outer">
    <BaseCard class="questionnaire-participant-card-container"
         @click="$emit('click')">
      <div v-if="avatar" class="questionnaire-participant-card-avatar">
        <img :src="avatar">
      </div>
      <div class="questionnaire-participant-card-content">
        <p class="participant-name"><strong>{{ name }}</strong></p>
        <p class="participant-university">{{ university }}</p>
        <p class="participant-status">{{ computedRole }} - {{ batch }}</p>
      </div>
      <div v-if="isEdit" class="delete-placeholder">
        <span>
          <font-awesome-icon icon="times"></font-awesome-icon>
        </span>
      </div>
    </BaseCard>
  </div>
</template>

<script src="./js/QuestionnaireParticipantCard.js">
</script>

<style scoped>

  * {
    margin: 0px;
    padding: 0px;
  }

  .questionnaire-participant-card-outer {
    width: 100%;
  }

  .questionnaire-participant-card-container {
    display: flex;
    padding-right: 10px;
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
    padding: 10px;
  }

  .questionnaire-participant-card-content {
    padding-left: 10px;
    width: 100%;
  }

  .participant-name{
    padding: 5px 0px 5px 0px ;
    font-weight: bold;
    font-size: x-large;
  }

  .participant-university {
    padding: 5px 0px 5px 0px ;
    font-size: medium;
  }

  .participant-status {
    padding: 5px 0px 5px 0px ;
    font-size: medium;
  }

  .delete-placeholder {
    align-items: flex-end;
  }
</style>
