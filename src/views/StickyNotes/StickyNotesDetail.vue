<template>
  <div class="auto-overflow-container">
    <div class="sticky-notes__container">
      <div class="sticky-notes__actions">
        <b-button rounded
                  icon-left="pen"
                  type="is-primary"
                  @click="goToEditStickyNote"
                  v-if="accessList.edit">
          Edit
        </b-button>
      </div>
      <div v-if="!isLoading">
        <div class="sticky-notes__header">
          <div class="sticky-notes__header-title">
            <span class="is-size-5 has-text-weight-bold">{{ stickyNote.title || 'Sticky Notes' }}</span>
          </div>
          <div class="sticky-notes__header-date">
          <span class="is-size-7">
            {{ stickyNote.updatedAt | moment("dddd, MMMM Do YYYY") }}
          </span>
          </div>
        </div>
        <div class="sticky-notes__content">
          <span class="content" v-html="stickyNoteCompiledMarkdown"></span>
        </div>
      </div>
      <div v-if="isLoading">
        <ListItem :loading="isLoading"></ListItem>
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
      margin-bottom: 0.75rem;

      @media only screen and (max-width: 1023px) {
        margin-bottom: 0;
        display: flex;
        flex-direction: column;
        position: fixed;
        right: 5vw;
        bottom: 75px;
        transition: all 0.1s ease-in-out;
        border-radius: 50%;

        button {
          margin: 0.25rem 0;
          box-shadow: 2px 2px 16px 4px rgba(0, 0, 0, 0.1);
        }
      }
    }

    &__header {
      margin-bottom: 0.75rem;

      &-date {
        border-left: 1px solid #BDBDBD;
        padding-left: 0.5rem;
      }
    }

    &__content {
      @media only screen and (max-width: 1023px) {
        margin-bottom: 15vh;
      }
    }
  }
</style>
