<template>
  <div class="scrollable-container">
    <div class="page-header">
      <BaseButton class="add-btn" type="submit" buttonClass="button-save" @click="addQuiz">
        <font-awesome-icon icon="plus" class="icon"/> Add
      </BaseButton>
    </div>
    <BaseCard class="quiz-card" v-for="quiz in quizList" @click.native="goToQuizDetail(quiz.id)">
      <div class="card-header-section">
        <div class="card-header">
          {{quiz.title}}
        </div>
        <div class="card-header float-right">
          <div class="quiz-date">
            {{ quiz.startDate |  moment("dddd, MMMM Do YYYY") }}
          </div>
          <div class="quiz-action">
            <font-awesome-icon
              icon="copy"
              class="icon blue"
              size="lg"
              @click.stop="openCopyModal(quiz.id)">
            </font-awesome-icon>
            <span style="margin-left: 10px;">
              <font-awesome-icon
                icon="trash-alt"
                class="icon red"
                size="lg" @click.stop="openDeleteConfirmationModal(quiz.id)"></font-awesome-icon>
            </span>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="quiz-description">
          <span v-html="descriptionCompiledMarkdown(quiz.description)"></span>
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
          <span style="margin-left: 5px;">
            {{quiz.endDate | moment("dddd, MMMM Do YYYY")}}
          </span>
        </div>
        <div class="retry-count">
          <font-awesome-icon icon="redo"></font-awesome-icon>
          <span style="margin-left: 3px; font-size: 15px">{{quiz.trials}}</span>
        </div>
      </div>
    </BaseCard>
    <BasePagination :paging="paging"
                    @loadPage="loadPage"
                    @previousPage="loadPreviousPage"
                    @nextPage="loadNextPage">
    </BasePagination>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="closeDeleteConfirmationModal"
                               @clickDelete="deleteThisQuiz">
      <div slot="description">Are you sure you want to delete this Quiz?</div>
    </modal-delete-confirmation>
    <modal-copy v-if="showCopyModal"
                     @close="closeCopyModal"
                     @copy="submitCopyModal">
    </modal-copy>
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
  align-items: center;
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
