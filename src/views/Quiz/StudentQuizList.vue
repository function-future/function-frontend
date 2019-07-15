<template>
  <div class="scrollable-container">
    <BaseCard class="quiz-card" v-for="studentQuiz in studentQuizList" @click.native="goToQuizDetail(studentQuiz.id)">
      <div class="card-header-section">
        <div class="card-header">
          {{studentQuiz.quiz.title}}
        </div>
        <div class="card-header float-right">
          <div class="quiz-date">
            {{ studentQuiz.quiz.startDate |  moment("dddd, MMMM Do YYYY") }}
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="quiz-description">
          {{studentQuiz.quiz.description}}
        </div>
      </div>
      <div class="card-footer">
        <div class="completion-status">
          <div class="completion-status__box"
               :class="isComplete(studentQuiz.quiz.endDate)">
          </div>
          <span class="completion-status__text">
            {{isComplete(studentQuiz.quiz.endDate)}}
          </span>
        </div>
        <div class="quiz-deadline">
          <font-awesome-icon icon="calendar"></font-awesome-icon>
          {{studentQuiz.quiz.endDate | moment("dddd, MMMM Do YYYY")}}
        </div>
        <div class="retry-count">
          <font-awesome-icon icon="redo"></font-awesome-icon>
          <span>{{studentQuiz.quiz.trials}} tries</span>
        </div>
      </div>
    </BaseCard>
    <BasePagination :paging="paging"
                    @loadPage="loadPage"
                    @previousPage="loadPreviousPage"
                    @nextPage="loadNextPage">
    </BasePagination>
  </div>
</template>

<script type="text/javascript" src="./js/student-quiz-list.js"/>

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
  .card-header-section {
    display: inline-block;
  }
  .card-header {
    display: inline-block;
    font-weight: bolder;
    font-size: 1.4em;
  }
  .float-right {
    font-size: 1em;
    font-weight: normal;
    float: right;
  }
  .quiz-date {
    padding: 5px 15px 5px 5px;
    display: inline-block;
  }
  .quiz-action {
    border-left: 1px solid #BDBDBD;
    padding-left: 15px;
    display: inline-block;
  }
  .quiz-action-copy {
    display: inline-block;
    font-size: unset;
    font-weight: normal;
  }
  .quiz-action span {
    padding: 5px;
    transition: all .2s ease;
  }

  .quiz-action span:hover {
    opacity: 0.8;
  }

  .quiz-action span:active {
    opacity: 0.9;
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
