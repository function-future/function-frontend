<template>
  <div class="scrollable-container">
    <div class="page-header">
      <BaseButton class="add-btn" type="submit" buttonClass="button-save" @click="addAssignment">
        <font-awesome-icon icon="plus" class="icon"/> Add
      </BaseButton>
    </div>
    <BaseCard class="assignment-card"
              v-for="assignment in assignmentList"
              :key="assignment.id"
              @click.native="goToAssignmentDetail(assignment.id, assignment.batch)"
              cardClass="card-hover">
      <div class="card-header-section">
        <div class="card-header">
          {{assignment.title}}
        </div>
        <div class="float-right">
          <div class="assignment-date">
            {{ assignment.uploadedDate |  moment("dddd, MMMM Do YYYY") }}
          </div>
          <div class="assignment-action">
            <font-awesome-icon
              icon="copy"
              class="icon blue"
              size="lg"
              @click.stop="openCopyModal(assignment.id)">
            </font-awesome-icon>
            <span>
            <font-awesome-icon
              icon="trash-alt"
              class="icon red"
              size="lg"
              @click.stop="openDeleteConfirmationModal(assignment.id)"></font-awesome-icon></span>
          </div>
        </div>
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
    <BasePagination :paging="paging"
                    @loadPage="loadPage"
                    @previousPage="loadPreviousPage"
                    @nextPage="loadNextPage">
    </BasePagination>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="closeDeleteConfirmationModal"
                               @clickDelete="deleteThisAssignment">
      <div slot="description">{{selectedId}}</div>
    </modal-delete-confirmation>
    <modal-copy v-if="showCopyModal"
                     @close="closeCopyModal"
                     @copy="submitCopyModal">
    </modal-copy>
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
