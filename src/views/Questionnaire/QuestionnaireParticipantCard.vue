<template>
  <div class="questionnaire-participant-card-outer" @click="$emit('click')">
    <BaseCard class="questionnaire-participant-card-container">
      <div v-if="avatar" class="questionnaire-participant-card-avatar">
        <img :src="avatar">
      </div>
      <div class="questionnaire-participant-card-content">
        <p class="participant-name"><strong>{{ name }}</strong></p>
        <p class="participant-university">{{ university }}</p>
        <p class="participant-status">{{ computedRole }} - {{ batch }}</p>
      </div>
      <div v-if="isResult" class="score-placeholder">
        <span><font-awesome-icon icon="star" size="3x" class="star-icon"></font-awesome-icon></span>
        <span class="score-number"><strong>{{score.toFixed(1)}}/6.0</strong></span>
      </div>
      <div v-if="isEdit" class="delete-placeholder">
        <span>
          <font-awesome-icon icon="times" class="icon-delete" @click="$emit('delete')"></font-awesome-icon>
        </span>
      </div>
    </BaseCard>
  </div>
</template>

<script src="./js/questionnaire-participant-card.js">
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

  .score-placeholder {
    display: flex;
    flex-direction: column;
    padding: 15px 15px 0px 0px;
  }

  .star-icon {
    color: #f1c40f;
  }

  .score-number {
    text-align: center;
    padding-top: 10px;
  }

  .icon-delete {
    font-size: 2rem;
  }
</style>
