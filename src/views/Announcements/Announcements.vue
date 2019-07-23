<template>
  <div class="scrollable-container">
    <div class="button-div" v-if="accessList.add">
      <BaseButton type="submit" buttonClass="button-save" @click="goToAddAnnouncement">
        <span><font-awesome-icon icon="plus" class="icon"/> Add</span>
      </BaseButton>
    </div>
    <div v-if="isLoading" class="loading">
      <font-awesome-icon icon="spinner" spin class="icon-loading" size="lg"></font-awesome-icon>
    </div>
    <div v-if="!isLoading">
      <BaseCard v-for="announcement in announcementList"
                v-bind:key="announcement.id"
                class="announcement-card"
                cardClass="card-hover"
                @click.native="goToAnnouncementDetail(announcement.id)">
        <div class="announcement-header announcement-title">
          <h3>{{ announcement.title }}</h3>
        </div>
        <div class="announcement-header float-right">
          <div class="announcement-date">
            {{ announcement.updatedAt |  moment("dddd, MMMM Do YYYY") }}
          </div>
          <div class="announcement-action">
          <span v-if="accessList.edit">
            <font-awesome-icon
              icon="edit"
              class="icon blue"
              size="lg"
              @click.stop="goToEditAnnouncement(announcement.id)">
            </font-awesome-icon>
          </span>
            <span v-if="accessList.delete">
            <font-awesome-icon
              icon="trash-alt"
              class="icon red"
              size="lg" @click.stop="openDeleteConfirmationModal(announcement.id)"></font-awesome-icon></span>
          </div>
        </div>
        <div class="announcement-preview">
          <span>{{ textPreview(announcement) }}</span>
        </div>
      </BaseCard>
    </div>
    <BasePagination :paging="paging"
                    @loadPage="loadPage"
                    @previousPage="loadPreviousPage"
                    @nextPage="loadNextPage">
    </BasePagination>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="closeDeleteConfirmationModal"
                               @clickDelete="deleteThisAnnouncement">
      <div slot="description">Delete this announcement ?</div>
    </modal-delete-confirmation>
  </div>
</template>

<script type="text/javascript" src="./js/announcements.js"></script>

<style scoped>
  .announcement-card {
    min-height: 175px;
  }

  .announcement-header {
    display: inline-block;
  }

  .announcement-date {
    padding: 5px 15px 5px 5px;
    display: inline-block;
  }

  .float-right {
    float: right;
  }

  .announcement-preview {
    text-align: justify;
  }

  .announcement-action {
    border-left: 1px solid #BDBDBD;
    padding-left: 15px;
    display: inline-block;
  }

  .announcement-action span {
    padding: 5px;
    transition: all .2s ease;
  }

  .announcement-action span:hover {
    opacity: 0.8;
  }

  .announcement-action span:active {
    opacity: 0.9;
  }

  h3 {
    margin: 5px 0 15px 0;
    text-align: left;
  }

  .button-div {
    text-align: right;
    margin-right: 20px;
  }

  .loading {
    margin-top: 50px;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
