<template>
  <div class="scrollable-container">
    <div class="button-div">
      <BaseButton type="submit" buttonClass="button-save">
        <span><font-awesome-icon icon="plus" class="icon"/> Add</span>
      </BaseButton>
    </div>
    <BaseCard
      v-for="announcement in this.announcements"
      class="announcement-card"
      cardClass="card-hover"
      @click.native="goToAnnouncementDetail">
      <div class="announcement-header announcement-title">
        <h3>{{ announcement.title }}</h3>
      </div>
      <div class="announcement-header float-right">
        <div class="announcement-date">
          {{ announcement.createdAt |  moment("dddd, MMMM Do YYYY") }}
        </div>
        <div class="announcement-action">
          <span>
            <font-awesome-icon
              icon="edit"
              class="icon blue"
              size="lg"
              @click="goToEditAnnouncement">
            </font-awesome-icon>
          </span>
          <span><font-awesome-icon icon="trash-alt" class="icon red" size="lg"></font-awesome-icon></span>
        </div>
      </div>
      <div class="announcement-preview">
        <span>{{ announcement.description }}</span>
      </div>
    </BaseCard>
  </div>
</template>

<script type="text/javascript" src="./js/Announcements.js"></script>

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
</style>
