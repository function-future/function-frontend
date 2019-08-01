<template>
  <div class="scrollable-container">
    <BaseCard class="assignment-card"
              v-for="room in studentAssignments"
              :key="room.id"
              @click.native="goToRoomDetail(room)"
              cardClass="card-hover">
      <div class="card-header-section">
        <div class="card-header">
          {{room.assignment.title}}
        </div>
        <div class="float-right">
          <div class="assignment-date">
            {{ room.assignment.uploadedDate |  moment("dddd, MMMM Do YYYY") }}
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="assignment-description">
          <span v-html="descriptionCompiledMarkdown(room.assignment.description)"></span>
        </div>
      </div>
      <div class="card-footer">
        <div class="completion-status">
          <div class="completion-status--box"
               :class="isComplete(room.assignment.deadline)">
          </div>
          <span class="completion-status--text">
            {{isComplete(room.assignment.deadline)}}
          </span>
        </div>
        <div class="assignment-deadline">
          <font-awesome-icon icon="calendar"></font-awesome-icon>
          <span style="margin-left: 5px">{{room.assignment.deadline | moment("dddd, MMMM Do YYYY")}}</span>
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

<script type="text/javascript" src="./js/student-assignments.js"/>

<style scoped>
  .page-header {
    margin-right: 20px;
  }
  .assignment-card {
    min-height: 175px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .assignment-card:hover {
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
    display: inline-block;
    float: right;
  }
  .assignment-date {
    padding: 5px 15px 5px 5px;
    display: inline-block;
  }
  .assignment-action {
    border-left: 1px solid #BDBDBD;
    padding-left: 15px;
    display: inline-block;
  }
  .assignment-action-copy {
    display: inline-block;
    font-size: unset;
    font-weight: normal;
  }
  .assignment-action span {
    padding: 5px;
    transition: all .2s ease;
  }

  .assignment-action span:hover {
    opacity: 0.8;
  }

  .assignment-action span:active {
    opacity: 0.9;
  }
  .card-body {
    display: flex;
  }
  .assignment-deadline {
    display: flex;
    flex-wrap: wrap;
  }
  .assignment-deadline-date {
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
  }
  .completion-status--box {
    height: 20px;
    width: 20px;
    margin-right: 5px;
  }
  .Ongoing {
    background-color: limegreen;
  }
  .Done {
    background-color: red;
  }
  .room-count {
    margin-right: 20px;
  }
</style>
