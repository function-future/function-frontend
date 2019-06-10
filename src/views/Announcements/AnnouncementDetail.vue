<template>
  <div class="scrollable-container">
    <BaseCard class="card" cardClass="card-hover">
      <div class="header">
        <h3>{{ announcement.title }}</h3>
      </div>
      <div class="header float-right">
        <div class="date">
          {{ announcement.updatedAt | moment("dddd, MMMM Do YYYY") }}
        </div>
        <div class="action">
          <span class="edit-btn" @click="goToEditAnnouncement"><font-awesome-icon icon="edit" class="icon blue" size="lg"></font-awesome-icon></span>
          <span class="delete-btn" @click="openDeleteConfirmationModal"><font-awesome-icon icon="trash-alt" class="icon red" size="lg"></font-awesome-icon></span>
        </div>
      </div>
      <div class="summary">
        <span>{{ announcement.summary }}</span>
      </div>
      <div class="description">
        <span v-html="descriptionCompiledMarkdown"></span>
      </div>
    </BaseCard>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="showDeleteConfirmationModal = false"
                               @clickDelete="deleteThisAnnouncement">
      <div slot="description">Are you sure you want to delete this announcement?</div>
    </modal-delete-confirmation>
  </div>
</template>

<script type="text/javascript" src="./js/AnnouncementDetail.js"></script>

<style scoped>
  .card {
    min-height: 80vh;
  }

  .header {
    display: inline-block;
  }

  .date {
    padding: 5px 15px 5px 5px;
    display: inline-block;
  }

  .float-right {
    float: right;
  }

  .summary {
    text-align: justify;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px #828282 solid;
  }

  .description {
    text-align: justify;
  }

  .action {
    border-left: 1px solid #BDBDBD;
    padding-left: 15px;
    display: inline-block;
  }

  .action span {
    padding: 5px;
    transition: all .2s ease;
  }

  .action span:hover {
    opacity: 0.8;
  }

  .action span:active {
    opacity: 0.9;
  }

  h3 {
    margin: 5px 0 15px 0;
    text-align: left;
  }
</style>
