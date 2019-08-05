<template>
  <div class="scrollable-container">
    <BaseCard class="sticky-notes-card" @click.native="goToStickyNotesDetail" cardClass="card-hover">
      <div class="sticky-notes-header sticky-notes-title">
        <span class="sticky-notes-name">Sticky Notes</span>
        <h3 v-if="stickyNote">{{ stickyNote.title }}</h3>
        <h3 v-else>Sticky Note</h3>
      </div>
      <div class="sticky-notes-header sticky-notes-date">
        <span v-if="stickyNote">
          {{ stickyNote.updatedAt | moment("dddd, MMMM Do YYYY") }}
        </span>
      </div>
      <div class="sticky-notes-content wrap-word">
        <span v-if="stickyNote">{{ stickyNotesDescriptionPreview(stickyNote.description) }}</span>
        <span v-else>Insert Sticky Notes Here...</span>
      </div>
    </BaseCard>
    <BaseCard class="announcement-card" @click.native="goToAnnouncementPage" cardClass="card-hover no-pointer">
      <h3 class="announcement-name">Announcements</h3>
      <div v-if="isLoadingAnnouncement" class="loading">
        <font-awesome-icon icon="spinner" spin class="icon-loading" size="lg"></font-awesome-icon>
      </div>
      <div class="announcement-card-scrollable" v-if="!isLoadingAnnouncement">
        <BaseCard class="announcement-box"
                  v-for="announcement in announcements"
                  v-bind:key="announcement.id"
                  @click.native.stop="goToAnnouncementDetail(announcement.id)">
          <div class="announcement-header-row">
            <div class="announcement-title-col"><h4>{{ announcement.title }}</h4></div>
            <div class="announcement-date-col"><span>{{ announcement.updatedAt | moment("dddd, MMMM Do YYYY") }}</span></div>
          </div>
          <div class="announcement-box-content wrap-word">
            <span>{{ announcementPreview(announcement) }}</span>
          </div>
        </BaseCard>
      </div>
    </BaseCard>
  </div>
</template>

<script type="text/javascript" src="./js/feeds.js">
</script>

<style scoped>
  .sticky-notes-card {
    min-height: 150px;
    cursor: pointer;
  }

  .sticky-notes-header {
    display: inline-block;
  }

  .sticky-notes-date {
    padding: 5px 0 5px 5px;
    float: right;
  }

  .sticky-notes-name {
    border-left: 1px solid #BDBDBD;
    padding-left: 10px;
    font-size: 0.8rem;
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

  .announcement-header-row {
    display: flex;
    flex-direction: row;
  }

  .announcement-title-col {
    flex-grow: 1;
  }

  .announcement-date-col {
    font-size: 12px;
  }

  .announcement-name {
    cursor: pointer;
    padding: 3px 0 3px 10px;
    border-left: 1px solid #BDBDBD;
  }

  .loading {
    margin-top: 35px;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
