<template>
  <div class="auto-overflow-container">
    <div class="course-form__container">
      <div class="course-form__container-title">
        <b-field label="Title">
          <b-input autofocus
                   placeholder="Insert title here"
                   v-model="courseData.title"
                   name="title"
                   @focus="hideBottomNavBar"
                   @blur="showBottomNavBar"
                   v-validate.disable="'required'">
          </b-input>
        </b-field>
        <div v-if="errors.has('title')"><span class="input-invalid-message">{{ errors.first('title') }}</span></div>
      </div>
      <div class="course-form__container-description">
        <input type="hidden"
               v-model="courseData.description"
               name="description"
               v-validate.disable="'required'" />
        <Editor label="Description"
                v-model="courseData.description"
                ref="editor"
                placeholder="Insert description here">
        </Editor>
        <div v-if="errors.has('description')"><span class="input-invalid-message">{{ errors.first('description') }}</span></div>
      </div>
      <div class="course-form__container-upload">
        <div class="file has-name is-fullwidth">
          <label class="file-label">
            <input class="file-input" type="file" @change="onFileChange($event)">
            <span class="file-cta">
              <span class="file-icon">
                <b-icon icon="upload" size="is-small"></b-icon>
              </span>
              <span class="file-label">Upload material</span>
            </span>
            <span class="file-name">{{ filePreviewName }}</span>
          </label>
        </div>
      </div>
      <div class="course-form__container-actions">
        <div class="buttons">
          <b-button type="is-light" @click="cancel">Cancel</b-button>
          <b-button type="is-primary" @click="sendCourse" :loading="isSubmitting" :disabled="uploadingFile">Save</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/course-form-revamp.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .course-form {
    &__container {
      padding: 1rem 1.25rem;
      margin-bottom: 2rem;

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

      &-upload {
        margin-top: 0.5rem;
        margin-bottom: 1rem;
      }

      &-actions {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
