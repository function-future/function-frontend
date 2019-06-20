<template>
  <div class="scrollable-container">
    <div class="page-header">
      <BaseButton class="add-btn" type="submit" buttonClass="button-save" @click="addQuiz">
        <font-awesome-icon icon="plus" class="icon"/> Add
      </BaseButton>
    </div>
    <BaseCard class="quiz-card" v-for="quiz in quizList">
      <div class="card-header">
        {{quiz.title}}
      </div>
      <div class="card-body">
        <div class="quiz-description">
          {{quiz.description}}
        </div>
      </div>
      <div class="card-footer">
        <div class="completion-status">
          <div class="completion-status__box"
               :class="isComplete(quiz.endDate)">
          </div>
          <span class="completion-status__text">
            {{isComplete(quiz.endDate)}}
          </span>
        </div>
        <div class="quiz-deadline">
          <font-awesome-icon icon="calendar"></font-awesome-icon>
          {{quiz.endDate | moment("dddd, MMMM Do YYYY")}}
        </div>
        <div class="retry-count">
          <font-awesome-icon icon="redo"></font-awesome-icon>
          <span>3/5 tries</span>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script type="text/javascript" src="./js/quiz.js"/>

<style lang="scss" scoped>
.page-header {
  margin-right: 20px;
}
.quiz-card {
  min-height: 175px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.quiz-card:hover {
  cursor: pointer;
  transition: all .3s ease;
  box-shadow: 2px 2px 10px rgba(0,0,0,0.1), 2px 2px 10px rgba(0,0,0,0.3);
}
.page-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.add-btn {
  justify-self: flex-end;
  margin-left: auto;
}
.card-header {
  font-weight: bolder;
  font-size: 1.4em;
}
.card-body {
  display: flex;
}
.quiz-deadline {
  display: flex;
  flex-wrap: wrap;
}
.quiz-deadline-date {
  font-weight: bolder;
}
.card-footer {
  font-size: 0.8em;
  display: flex;
  align-items: center;
}

.completion-status {
  display: flex;
  align-items: center;
  margin-right: 20px;
  &__box {
    height: 20px;
    width: 20px;
    margin-right: 5px;
  }
}

.quiz-deadline {
  margin-right: 20px;
}

.Ongoing {
  background-color: limegreen;
}
.Done {
  background-color: red;
}

.retry-count {
  display: flex;
  align-items: center;
}
</style>
