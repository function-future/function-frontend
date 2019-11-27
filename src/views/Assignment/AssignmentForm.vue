<template>
  <div class="auto-overflow-container">
    <div class="assignment-form__container">
      <div class="assignment-form__container-title">
        <b-field label="Title">
          <b-input autofocus
                   placeholder="Insert title here"
                   v-model="assignmentDetail.title"
                   name="title"
                   v-validate.disable="'required'">
          </b-input>
        </b-field>
        <div v-if="errors.has('title')"><span class="input-invalid-message">{{ errors.first('title') }}</span></div>
      </div>
      <div class="assignment-form__container-description">
        <input type="hidden"
               v-model="assignmentDetail.description"
               name="description"
               v-validate.disable="'required'" />
        <Editor label="Description"
                v-model="assignmentDetail.description"
                ref="editor"
                placeholder="Insert description here">
        </Editor>
        <div v-if="errors.has('description')"><span class="input-invalid-message">{{ errors.first('description') }}</span></div>
      </div>
      <div class="assignment-form__container-upload">
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
      <div class="assignment-form__container-date">
        <template>
          <b-field label="Deadline">
            <b-datepicker
              v-model="date"
              :min-date="minDate"
              placeholder="DD/MM/YYYY"
              editable>
            </b-datepicker>
          </b-field>
        </template>
      </div>
      <div class="assignment-form__container-actions">
        <div class="buttons">
          <b-button type="is-light" @click="cancel">Cancel</b-button>
          <b-button type="is-primary" @click="saveAssignment">Save</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/assignment-form.js">
</script>

<style scoped lang="scss">
  @import "@/assets/css/main.scss";

  .assignment-form {
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

      &-date {
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
      }

      &-actions {
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  /deep/ figure {
    margin-right: 0!important;
    margin-left: 0!important;
  }

  .card-content {
    @media only screen and (max-width: 1023px) {
      padding: 0;
    }

    &-action {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }
</style>
