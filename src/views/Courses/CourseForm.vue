<template>
  <div class="scrollable-container">
    <div class="edit-container">
      <div class="title">
        <BaseInput autofocus
                   class="input-title"
                   inputType="title"
                   v-model="courseData.title"
                   placeholder="Course Title"
                   v-validate.disable="'required'"
                   name="title"></BaseInput>
      </div>
      <div v-if="errors.has('title')"><span class="input-invalid-message">{{ errors.first('title') }}</span></div>
      <div class="description">
        <mavon-editor class="editor"
                      placeholder="Course Description"
                      language="en"
                      v-model="courseData.description"
                      v-validate.disable="'required'"
                      :toolbars="toolbars"
                      name="description">
        </mavon-editor>
      </div>
      <div v-if="errors.has('description')">
        <span class="input-invalid-message">{{ errors.first('description') }}</span>
      </div>
      <div class="material-upload">
        <label class="upload-button">
          <input type="file" :name="file" @change="onFileChange($event)">
          <span v-if="!uploadingFile">
            <font-awesome-icon icon="upload" class="icon"></font-awesome-icon>
            <span v-if="filePreviewName === ''">Upload Course Material File</span>
            <span v-else> {{ filePreviewName }} </span>
          </span>
          <span v-if="uploadingFile">
            <font-awesome-icon icon="spinner" spin class="icon"></font-awesome-icon> Uploading ...
          </span>
        </label>
      </div>
      <div class="action">
        <div class="action-button">
          <BaseButton type="cancel" buttonClass="button-cancel" @click="cancel">Cancel</BaseButton>
        </div>
        <div class="action-button">
          <BaseButton type="submit" buttonClass="button-save" @click="sendCourse" :disabled="isSubmitting || uploadingFile">Save</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/course-form.js"></script>

<style scoped lang="scss">
  .edit-container {
    margin: 10px;
    text-align: left;
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
    height: 50vh;
    width: 100%;
    margin-top: 20px;
  }

  .input-invalid-message {
    color: #FF0000;
    font-size: 0.75em;
    margin-left: 2vw;
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

  .material-upload {
    text-align: left;

    p {
      font-size: 12px;
      padding-left: 10px;
    }
  }

  .upload-button {
    display: block;
    border: 1px solid #BDBDBD;
    border-radius: 10px;
    padding: 10px 20px;
    color: #505050;
    cursor: pointer;
    margin: 10px 0;
  }

  input[type=file] {
    display: none;
  }

  .upload-button:hover {
    background-color: #F2F2F2;
  }

  .icon {
    margin-right: 5px;
  }
</style>
