<template>
  <div class="scrollable-container">
    <div class="edit-container">
      <div class="title">
        <BaseInput class="input-title" placeholder="Insert Title" inputType="title" v-model="assignment.title">
        </BaseInput>
      </div>
      <div class="assignment-body">
        <div class="description">
          <mavon-editor class="input-description"
                        placeholder="Question Goes Here"
                        language="en"
                        v-model="assignment.description"
                        v-validate.disable="'required'"
                        name="description"/>
        </div>
        <div class="assignment-detail">
          <v-date-picker class="assignment-detail-deadline" v-model="assignment.deadline" is-inline>
          </v-date-picker>
          <div class="material-upload">
            <label class="upload-button">
              <input type="file" :name="file" @change="onFileChange($event)">
              <span v-if="!uploadingFile">
                <font-awesome-icon icon="upload" class="icon"></font-awesome-icon>
                <span v-if="filePreviewName === ''">Upload File</span>
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
              <BaseButton type="submit" buttonClass="button-save" @click="saveAssignment">Save</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/add-assignment.js"></script>

<style scoped>
  .edit-container {
    margin: 10px;
  }

  .input-title {
    margin-right: 10px;
    width: 100%;
    font-size: 1.2em;
  }

  .assignment-body {
    display: flex;
    justify-content: space-between;
    padding: 0 0 20px 0;
  }

  .description {
    height: 530px;
    width: 75%;
  }

  .input-description {
    height: 100%;
  }

  .assignment-detail {
    width: 22%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .assignment-detail-file {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .assignment-detail-file-name {
    flex-grow: 2;
  }

  .assignment-detail-file-actions {
    display: flex;
    justify-content: space-around;
  }

  .action {
    display: flex;
    justify-content: space-between;
  }

  .action-button {
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
