<template>
  <div class="auto-overflow-container">
    <div class="edit-sticky-note__container">
      <div class="edit-sticky-note__container-title">
        <b-field label="Title">
          <b-input autofocus
                   v-model="stickyNote.title"
                   name="title"
                   v-validate.disable="'required'">
          </b-input>
        </b-field>
      </div>
      <div v-if="errors.has('title')"><span class="input-invalid-message">{{ errors.first('title') }}</span></div>
      <div class="edit-sticky-note__container-description">
        <mavon-editor class="editor"
                      placeholder="Sticky Note Description"
                      language="en"
                      v-model="stickyNote.description"
                      :toolbars="toolbars"
                      v-validate.disable="'required'"
                      name="description"></mavon-editor>
      </div>
      <div v-if="errors.has('description')"><span class="input-invalid-message">{{ errors.first('description') }}</span></div>
      <div class="edit-sticky-note__container-actions">
        <div class="buttons">
          <b-button type="is-light" @click="cancel">Cancel</b-button>
          <b-button type="is-primary" @click="postStickyNote" :loading="isSubmitting">Save</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/edit-sticky-note.js">
</script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .edit-sticky-note {
    &__container {
      display: flex;
      flex-direction: column;
      padding: 1rem 1.25rem;

      &-title {
        margin-bottom: 1rem;
      }

      &-description {
        margin: 0.5rem 0 0.5rem 0;
      }

      &-actions {
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  .editor {
    height: 55vh;
    width: 100%;
    margin-bottom: 0.5rem;
  }
</style>
