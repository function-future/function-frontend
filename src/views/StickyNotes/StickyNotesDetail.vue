<template>
  <div class="scrollable-container">
    <BaseCard class="card" cardClass="card-hover">
      <div class="header">
        <h3 class="title">{{ stickyNote.title || 'Sticky Note' }}</h3>
      </div>
      <div class="header float-right">
        <div class="date">
          {{ stickyNote.updatedAt | moment("dddd, MMMM Do YYYY") }}
        </div>
        <div class="action">
          <span class="add-btn" @click="goToAddStickyNote" v-if="accessList.edit && currentUser.role === 'ADMIN'">
            <font-awesome-icon icon="edit" class="icon blue" size="lg"></font-awesome-icon>
          </span>
        </div>
      </div>
      <div class="preview wrap-word">
        <span v-html="stickyNoteCompiledMarkdown"></span>
      </div>
    </BaseCard>
  </div>
</template>

<script type="text/javascript" src="./js/sticky-notes-detail.js">
</script>

<style scoped>
  .card {
    min-height: 80vh;
  }

  .header {
    display: inline-block;
  }

  .title {
    margin: 5px 0 5px 0;
  }

  .date {
    padding: 5px 15px 5px 5px;
    display: inline-block;
  }

  .float-right {
    float: right;
  }

  .preview {
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
