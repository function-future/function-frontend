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
          <div class="assignment-detail-file">
            <span class="assignment-detail-file-name">File.txt</span>
            <div class="assignment-detail-file-actions">
              <BaseButton buttonClass="button-icon">
                <font-awesome-icon icon="file-upload" class="icon"/>
              </BaseButton>
              <BaseButton buttonClass="button-icon">
                <font-awesome-icon icon="file-download" class="icon"/>
              </BaseButton>
            </div>
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
</style>
