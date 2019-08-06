<template>
  <div class="scrollable-container">
    <div class="edit-container">
      <div class="title">
        <BaseInput autofocus
                   class="input-title"
                   inputType="title"
                   v-model="stickyNote.title"
                   placeholder="Sticky Note Title"
                   v-validate.disable="'required'"
                   name="title">
        </BaseInput>
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
      <div class="action">
        <div class="action-button">
          <BaseButton type="cancel" buttonClass="button-cancel" @click="cancel">Cancel</BaseButton>
        </div>
        <div class="action-button">
          <BaseButton type="submit" buttonClass="button-save" @click="postStickyNote" :disabled="isSubmitting">Save</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/edit-sticky-note.js">
</script>

<style scoped>
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

  .action {
    display: flex;
    justify-content: flex-end;
  }

  .action-button {
    display: inline-block;
    padding-left: 5px;
    padding-right: 5px;
  }
</style>
