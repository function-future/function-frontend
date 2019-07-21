<template>
  <div class="questionnaire-form-outer">
    <BaseCard class="questionnaire-form-card">
      <div class="question-container">
        <div class="no-question">{{ noQuestion}}</div>
        <div class="question-content">
          <div class="question-desc-and-score">
            <div class="question-desc">{{ question.description }}</div>
            <div class="question-score">
              <section>
                <span>score : </span>
                <input type="radio" v-model="score" value="1">1
                <input type="radio" v-model="score" value="2">2
                <input type="radio" v-model="score" value="3">3
                <input type="radio" v-model="score" value="4">4
                <input type="radio" v-model="score" value="5">5
                <input type="radio" v-model="score" value="6">6
              </section>
            </div>
          </div>
          <div class="question-comment">
            <BaseTextArea v-model="comment"
                          placeholder="Comment goes here"></BaseTextArea>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script src="./js/MyQuestionnaireForm.js">
</script>

<style scoped>
  .questionnaire-form-outer {
    display: flex;
    justify-content: center;
    overflow: auto;
    }
  .questionnaire-form-card {
    width: 100%;
    padding: 5px 5px;
    height: fit-content;
  }

  .question-container {
    display: flex;
  }

  .question-content {
    width: 100%;
  }

  .question-desc-and-score {
    width: 100%;
  }

  .question-score, .question-desc {
    padding: 5px 0px 5px 0px;
  }

  .question-desc {
    font-size: small;
  }

  .no-question {
    display: flex;
    align-items: center;
    font-size: 3.5rem;
    padding: 0px 20px 0px 20px;
  }
</style>
