<template>
  <div class="auto-overflow-container">
    <div class="announcement-form-container">
      <div class="announcement-form-container-title">
        <b-field label="Title">
          <b-input autofocus
                   v-model="announcementDetail.title"
                   name="title"
                   v-validate.disable="'required'">
          </b-input>
        </b-field>
        <div v-if="errors.has('title')"><span class="input-invalid-message">{{ errors.first('title') }}</span></div>
      </div>
      <div class="announcement-form-container-description">
        <mavon-editor class="editor"
                      placeholder="Announcement description"
                      language="en"
                      v-model="announcementDetail.description"
                      v-validate.disable="'required'"
                      ref=md
                      @imgAdd="$imgAdd"
                      @imgDel="$imgDel"
                      name="description">
        </mavon-editor>
        <div v-if="errors.has('description')"><span class="input-invalid-message">{{ errors.first('description') }}</span></div>
      </div>
      <div class="announcement-form-container-actions">
        <div class="buttons">
          <b-button type="is-light" @click="cancel">Cancel</b-button>
          <b-button type="is-primary" @click="sendAnnouncement" :loading="isSubmitting || uploadingFile">Save</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/announcement-form.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .announcement-form {
    &-container {
      padding: 1rem 1.25rem;

      &-title {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
      }

      &-description {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
      }

      &-actions {
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  .editor {
    height: 45vh;
    margin-bottom: 0.5rem;
  }
</style>
