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
        <div class="submit-button">
          <BaseButton type="submit" buttonClass="button-save" @click="postStickyNote">Save</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/EditStickyNote.js">
</script>

<style>
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
</style>
