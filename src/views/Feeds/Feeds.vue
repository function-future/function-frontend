<template>
  <div class="scrollable-container">
    <BaseCard class="sticky-notes-card" @click.native="goToStickyNotesDetail" cardClass="card-hover">
      <div class="sticky-notes-header sticky-notes-title">
        <h3>{{ stickyNotes.noteTitle }}</h3>
      </div>
      <div class="sticky-notes-header sticky-notes-date">
        {{ stickyNotes.updatedAt | moment("dddd, MMMM Do YYYY") }}
      </div>
      <div class="sticky-notes-content">
        <span>{{ stickyNotes.noteDescription }}</span>
      </div>
    </BaseCard>
    <BaseCard class="announcement-card" @click.native="goToAnnouncementPage" cardClass="card-hover no-pointer">
      <h3>Announcements</h3>
      <div class="announcement-card-scrollable">
        <BaseCard class="announcement-box"
                  v-for="announcement in announcementList"
                  v-bind:key="announcement.id"
                  @click.native="goToAnnouncementDetail(announcement.id)">
          <h4>{{ announcement.title }}</h4>
          <div class="announcement-box-content">
            <span>{{ announcement.description }}</span>
          </div>
        </BaseCard>
      </div>
    </BaseCard>
  </div>
</template>

<script type="text/javascript" src="./js/Feeds.js">
</script>

<style scoped>
  .sticky-notes-card {
    min-height: 125px;
    cursor: pointer;
  }

  .sticky-notes-header {
    display: inline-block;
  }

  .sticky-notes-date {
    padding: 5px 0 5px 5px;
    float: right;
  }

  h3, h4 {
    margin: 5px 0 10px 0;
    text-align: left;
  }

  .sticky-notes-content {
    text-align: justify;
  }

  .announcement-card {
    min-height: 20vh;
    max-height: 60vh;
    padding-right: 15px;
  }

  .announcement-card-scrollable {
    min-height: 10vh;
    max-height: 45vh;
    overflow: auto;
    padding-top: 10px;
    padding-right: 15px;
  }

  .announcement-box {
    min-height: 100px;
    width: 100%;
    box-shadow: none;
    margin: 0 0 15px 0;
    border: 1px solid #828282;
    cursor: pointer;
  }
</style>
