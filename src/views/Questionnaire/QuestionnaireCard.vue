<template>
    <div class="questionnaire-card-outer" :class="{ disabled:isDisable}">
      <div class="questionnaire-card-content">
        <p><strong>{{ computedTitle }}</strong></p>
        <p class="questionnaire-card-content-description">
          {{ computedDescription }}
        </p>
        <div class="questionnaire-card-content-date">
          <div class="placeholder-start-date">
            Start Date : {{ computedStartDate }}
          </div>
          <div class="placeholder-due-date">
            Due Date : {{ computedDueDate }}
          </div>
        </div>
      </div>
    </div>
</template>

<script src="./js/QuestionnaireCard.js">

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
    margin: 5px 0;
    cursor: pointer;
    min-height: 120px;
    height: auto;
  }

  .disabled {
    background-color: #c1c1c1;
  }

  .questionnaire-card-content {
    diplay: flex;
    margin-left: 5px;
    margin-right: 5Px;
    flex-wrap: wrap;
    flex-direction: column;
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
    flex-direction: row;
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
</style>
