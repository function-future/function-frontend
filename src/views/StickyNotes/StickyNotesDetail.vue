<template>
  <div class="auto-overflow-container">
    <div class="sticky-notes__container">
      <div class="sticky-notes__actions">
        <b-button rounded
                  icon-left="pen"
                  type="is-primary"
                  @click="goToAddStickyNote"
                  v-if="accessList.edit">
          Edit
        </b-button>
      </div>
      <div class="sticky-notes__header">
        <div class="sticky-notes__header-title">
          <span class="is-size-5 has-text-weight-bold">{{ stickyNote.title }}</span>
        </div>
        <div class="sticky-notes__header-date">
          <span class="is-size-7">
            {{ stickyNote.updatedAt | moment("dddd, MMMM Do YYYY") }}
          </span>
        </div>
      </div>
      <div class="sticky-notes__content">
        <span v-html="stickyNoteCompiledMarkdown"></span>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/sticky-notes-detail.js">
</script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .sticky-notes {
    &__container {
      display: flex;
      flex-direction: column;
      padding: 1rem 1.25rem;
    }

    &__actions {
      @media only screen and (max-width: 1023px) {
        position: fixed;
        right: 5vw;
        bottom: 75px;
        transition: all 0.1s ease-in-out;
        box-shadow: 2px 2px 16px 4px rgba(0, 0, 0, 0.2);
        border-radius: 50%;
      }
    }

    &__header {
      margin-top: 0.5rem;
      margin-bottom: 0.75rem;

      &-date {
        border-left: 1px solid #BDBDBD;
        padding-left: 0.5rem;
      }
    }

    &__content {

    }
  }

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
