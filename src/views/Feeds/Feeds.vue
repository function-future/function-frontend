<template>
  <div class="scrollable-container">
    <BaseCard class="sticky-notes-card" @click.native="goToStickyNotesDetail" cardClass="card-hover">
      <div class="sticky-notes-header sticky-notes-title">
        <h3>{{ stickyNote.title || 'Sticky Note' }}</h3>
      </div>
      <div class="sticky-notes-header sticky-notes-date">
        {{ stickyNote.updatedAt | moment("dddd, MMMM Do YYYY") }}
      </div>
      <div class="sticky-notes-content">
        <span>{{ stickyNote.description.slice(0, 100) + '...' || 'Insert Sticky Notes Here...' }}</span>
      </div>
    </BaseCard>
    <BaseCard class="announcement-card" @click.native="goToAnnouncementPage" cardClass="card-hover no-pointer">
      <h3>Announcements</h3>
      <div class="announcement-card-scrollable">
        <BaseCard class="announcement-box"
                  v-for="announcement in announcements"
                  v-bind:key="announcement.id"
                  @click.native.stop="goToAnnouncementDetail(announcement.id)">
          <div class="announcement-header-row">
            <div class="announcement-title-col"><h4>{{ announcement.title }}</h4></div>
            <div class="announcement-date-col"><span>{{ announcement.updatedAt | moment("dddd, MMMM Do YYYY") }}</span></div>
          </div>
          <div class="announcement-box-content">
            <span>{{ announcement.summary }}</span>
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
</style>
