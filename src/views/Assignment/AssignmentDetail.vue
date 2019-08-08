<template>
  <div class="scrollable-container">
    <div class="edit-container">
      <div class="title">
        <BaseInput class="input-title"
                   placeholder="Insert Title"
                   inputType="title"
                   v-model="assignmentDetail.title"
                  :disabled="!editMode">
        </BaseInput>
      </div>
      <div class="assignment-body">
        <div class="description">
          <mavon-editor class="input-description"
                        placeholder="Question Goes Here"
                        language="en"
                        v-model="assignmentDetail.description"
                        v-validate.disable="'required'"
                        name="description"
                        :editable="editMode"/>
        </div>
        <div class="assignment-detail">
          <v-date-picker class="assignment-detail-deadline"
                         v-if="assignmentDetail.deadline"
                         :value="assignmentDetail.deadline"
                         v-model="assignmentDetail.deadline"
                         :available-dates="{start: displayedDates.start, end: displayedDates.end}"
                         is-required
                         is-inline>
          </v-date-picker>
          <a v-if="!editMode && assignmentDetail.file && assignmentDetail.file !== ''" :href="assignmentDetail.file" target="_blank" class="download-button">
            <font-awesome-icon icon="download" class="icon"></font-awesome-icon>Download material
          </a>
          <div v-if="editMode" class="material-upload">
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
            <span v-if="editMode && file" class="delete-file-button" @click="deleteAssignmentFile()">
              <font-awesome-icon icon="times-circle" class="icon" size="lg" style="cursor: pointer;"></font-awesome-icon>
            </span>
          </div>
          <div class="action">
            <div class="action-button" v-if="editMode">
              <BaseButton type="cancel" buttonClass="button-cancel" @click="cancel">Cancel</BaseButton>
            </div>
            <div class="action-button" v-if="editMode">
              <BaseButton type="submit" buttonClass="button-save" @click="saveAssignment">Save</BaseButton>
            </div>
            <div class="action-button" v-if="!editMode">
              <BaseButton type="submit" buttonClass="button-save" @click="editAssignment" v-if="accessList.edit">Edit</BaseButton>
            </div>
            <div class="action-button" v-if="!editMode">
              <BaseButton type="submit" buttonClass="button-save" @click="goToRoomList()">Rooms</BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/assignment-detail.js">
</script>

<style lang="scss" scoped>
  .edit-container {
    max-height: 97%;
    max-width: 95%;
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

  .download-button {
    display: block;
    border: 1px solid #828282;
    border-radius: 10px;
    padding: 10px 20px;
    color: #505050;
    cursor: pointer;
  }

  .download-button:hover {
    background-color: #F2F2F2;
  }

  .upload-button:hover {
    background-color: #F2F2F2;
  }

  .icon {
    margin-right: 5px;
  }

  .material-upload {
    text-align: left;
    width: 100%;
    display: inline;

    p {
      font-size: 12px;
      padding-left: 10px;
    }
  }

  .delete-file-button {
    margin-left: 5px;
  }

  .upload-button {
    width: 70%;
    display: inline-block;
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
</style>
