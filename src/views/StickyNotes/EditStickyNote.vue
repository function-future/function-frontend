<template>
  <div class="auto-overflow-container">
    <div class="edit-sticky-note__container">
      <div class="edit-sticky-note__container-title">
        <b-field label="Title">
          <b-input autofocus
                   v-model="stickyNote.title"
                   name="title"
                   placeholder="Insert title here"
                   v-validate.disable="'required'">
          </b-input>
        </b-field>
      </div>
      <div v-if="errors.has('title')"><span class="input-invalid-message">{{ errors.first('title') }}</span></div>
      <div class="edit-sticky-note__container-description">
        <input type="hidden"
               v-model="stickyNote.description"
               name="description"
               v-validate.disable="'required'" />
        <Editor label="Description"
                v-model="stickyNote.description"
                ref="editor"
                placeholder="Insert description here">
        </Editor>
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
      margin-bottom: 2rem;

      &-title {
        margin-bottom: 0.5rem;
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
