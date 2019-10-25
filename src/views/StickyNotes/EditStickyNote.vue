<template>
  <div class="auto-overflow-container">
    <div class="edit-sticky-note__container">
      <div class="title">
        <b-field label="Title">
          <b-input autofocus
                   custom-class="is-large"
                   v-model="stickyNote.title"
                   v-validate.disable="'required'">
          </b-input>
        </b-field>
      </div>
      <div v-if="errors.has('title')"><span class="input-invalid-message">{{ errors.first('title') }}</span></div>
      <div class="description">
        <mavon-editor class="editor"
                      placeholder="Sticky Note Description"
                      language="en"
                      v-model="stickyNote.description"
                      :toolbars="toolbars"
                      v-validate.disable="'required'"
                      name="description"></mavon-editor>
      </div>
      <div v-if="errors.has('description')"><span class="input-invalid-message">{{ errors.first('description') }}</span></div>
      <div class="buttons">
        <b-button type="is-light" @click="cancel">Cancel</b-button>
        <b-button type="is-primary" @click="postStickyNote" :disabled="isSubmitting">Save</b-button>
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
    }
  }
  .edit-container {
    margin: 10px;
  }

  .input-title {
    margin-right: 10px;
    width: 100%;
    font-size: 1.2em;
  }

  .description {
    margin: 10px 0 10px 0;
  }

  .editor {
    height: 55vh;
    width: 100%;
  }

  .input-invalid-message {
    color: #FF0000;
    font-size: 0.75em;
    float: left;
    margin-left: 2vw;
    margin-bottom: 10px;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
  }

  .action-button {
    display: inline-block;
    padding-left: 5px;
    padding-right: 5px;
  }
</style>
