<template>
  <div class="scrollable-container">
    <div class="page-header">
      <BaseButton class="add-btn" type="submit" buttonClass="button-save" @click="addAssignment">
        <font-awesome-icon icon="plus" class="icon"/> Add
      </BaseButton>
    </div>
    <div v-for="assignment in assignmentList" :key="assignment.id">
      <BaseCard class="assignment-card">
        <div class="card-header">
          {{assignment.title}}
        </div>
        <div class="card-body">
          <div class="assignment-description">
            {{assignment.description}}
          </div>
        </div>
        <div class="card-footer">
          <div class="completion-status">
            <div class="completion-status--box"
                 :class="isComplete(assignment.deadline)">
            </div>
            <span class="completion-status--text">
              {{isComplete(assignment.deadline)}}
            </span>
          </div>
          <div class="assignment-deadline">
            <font-awesome-icon icon="calendar"></font-awesome-icon>
            {{assignment.deadline | moment("dddd, MMMM Do YYYY")}}
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/assignments.js"/>

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
  .card-header {
    font-weight: bolder;
    font-size: 1.4em;
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
