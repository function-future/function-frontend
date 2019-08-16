<template>
    <div class="questionnaire-card-outer" @click="$emit('click')" :class="{disabled:isDisable, edit:isEdit}">
      <div class="questionnaire-card-content">
        <div v-if="!isDetail" class="questionnaire-desc">
          <p><strong>{{ computedTitle }}</strong></p>
          <p class="questionnaire-card-content-description">
            {{ computedDescription }}
          </p>
        </div>
        <div v-else class="questionnaire-desc">
          <p><strong class="detail">{{title}}</strong></p>
          <p class="questionnaire-card-content-description">
            {{ description }}
          </p>
        </div>
        <div class="questionnaire-card-content-date">
          <div class="placeholder-start-date">
            Start Date : {{ computedStartDate }}
          </div>
          <div class="placeholder-due-date">
            Due Date : {{ computedDueDate }}
          </div>
        </div>
      </div>
      <div v-if="isResult" class="questionnaire-score">
        <span><font-awesome-icon icon="star" size="3x" class="star-icon"></font-awesome-icon></span>
        <span class="score-number"><strong>{{score.toFixed(1)}}/6.0</strong></span>
      </div>
      <div v-if="isEdit" class="questionnaire-edit">
        <div class="button-delete">
          <span><font-awesome-icon @click="$emit('clickDelete')" icon="times"></font-awesome-icon></span>
        </div>
        <div class="button-create">
          <BaseButton type="submit" class="button-create" buttonClass="button-save" @click="goToEdit">Edit</BaseButton>
        </div>
      </div>
    </div>
</template>

<script src="./js/questionnaire-card.js">
</script>

<style scoped>
  .questionnaire-card-outer {
    display: flex;
    grid-template-columns: auto 45px;
    background: #FFFFFF;
    border: 1px solid #F2F2F2;
    box-sizing: border-box;
    -webkit-box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.1);
    -moz-box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.1);
    box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.1);
    border-radius: 10px;
    padding: 5px 5px 5px 5px;
    text-align: left;
    height: 50px;
    margin: 5px 10px;
    cursor: pointer;
    min-height: 120px;
    height: auto;
  }

  .disabled {
    background-color: #f3f3f3;
    cursor: default;
  }

  .edit {
    cursor: default;
  }

  .questionnaire-card-content {
    diplay: flex;
    margin-left: 5px;
    margin-right: 5Px;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;
  }

  .questionnaire-card-content > p {
    font-size: 15px;
  }

  .questionnaire-card-content-description {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    word-break: break-all;
  }

  .questionnaire-card-content-date {
    display: flex;
    width: 100%;
  }

  .placeholder-start-date {
    flex-grow: 1;
    color: green;
    font-weight: bold;
  }

  .placeholder-due-date {
    flex-grow: 1;
    color: red;
    font-weight: bold;
  }

  .questionnaire-edit {
    display: flex;
    height: auto;
    justify-content: space-between;
    flex-direction: column;
  }
  .button-create {
    align-self: flex-end;
  }
  .button-delete {
    display: flex;
    justify-content: flex-end;
    padding : 5px 10px 0px 0px;
  }

  .icon-delete {
    cursor: pointer;
  }

  .questionnaire-score {
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

  .detail {
    font-size: 2rem;
  }
</style>
