<template>
  <div class="scrollable-container">
    <div class="edit-container">
      <div class="title">
        <BaseInput
          autofocus
          class="input-title"
          inputType="title"
          v-model="announcement.title"
          placeholder="Announcement title"
          v-validate.disable="'required'"
          name="title"></BaseInput>
      </div>
      <div v-if="errors.has('title')"><span class="input-invalid-message">{{ errors.first('title') }}</span></div>
      <div>
        <BaseTextArea
          v-model="announcement.summary"
          placeholder="Announcement summary">
        </BaseTextArea>
      </div>
      <div class="description">
        <mavon-editor class="editor"
                      placeholder="Announcement description"
                      language="en"
                      v-model="announcement.description"
                      v-validate.disable="'required'"
                      name="description">
        </mavon-editor>
      </div>
      <div v-if="errors.has('description')"><span class="input-invalid-message">{{ errors.first('description') }}</span></div>
      <div class="action">
        <div class="action-button">
          <BaseButton type="cancel" buttonClass="button-cancel" @click="cancel">Cancel</BaseButton>
        </div>
        <div class="action-button">
          <BaseButton type="submit" buttonClass="button-save" @click="sendAnnouncement">Save</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/EditAnnouncement.js"></script>

<style scoped>
  .edit-container {
    margin: 10px;
  }

  .action {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .input-title {
    margin-right: 10px;
    width: 100%;
    font-size: 1.2em;
  }

  .input-invalid-message {
    color: #FF0000;
    font-size: 0.75em;
    float: left;
    margin-left: 2vw;
  }

  .description {
    margin: 10px 0 10px 0;
  }

  .editor {
    height: 45vh;
  }

  .action-button {
    display: inline-block;
    padding-left: 5px;
    padding-right: 5px;
  }
</style>
