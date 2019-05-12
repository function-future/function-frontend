<template>
  <div class="scrollable-container">
    <div class="edit-container">
      <div class="title">
        <BaseInput class="input-title" inputType="title" v-model="stickyNotes.noteTitle"></BaseInput>
      </div>
      <div class="description">
        <BaseTextArea class="input-description" v-model="stickyNotes.noteDescription"></BaseTextArea>
      </div>
      <div class="action">
        <div class="action-button">
          <BaseButton type="cancel" buttonClass="button-cancel" @click="cancel">Cancel</BaseButton>
        </div>
        <div class="action-button">
          <BaseButton type="submit" buttonClass="button-save" @click="postStickyNote">Save</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/EditStickyNote.js">
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
    height: 425px;
  }

  .input-description {
    height: 400px;
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
