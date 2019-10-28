<template>
  <div class="auto-overflow-container">
    <div class="activity-blog-form__container">
      <div class="activity-blog-form__container-title">
        <b-field label="Title">
          <b-input autofocus
                   placeholder="Insert title here"
                   v-model="activityBlogDetail.title"
                   name="title"
                   v-validate.disable="'required'">
          </b-input>
        </b-field>
        <div v-if="errors.has('title')"><span class="input-invalid-message">{{ errors.first('title') }}</span></div>
      </div>
      <div class="activity-blog-form__container-description">
        <input type="hidden"
               v-model="activityBlogDetail.description"
               name="description"
               v-validate.disable="'required'" />
        <Editor label="Description"
                v-model="activityBlogDetail.description"
                ref="editor"
                @imgUpload="$imgAdd"
                placeholder="Insert description here">
        </Editor>
        <div v-if="errors.has('description')"><span class="input-invalid-message">{{ errors.first('description') }}</span></div>
      </div>
      <div class="activity-blog-form__container-actions">
        <div class="buttons">
          <b-button type="is-light" @click="cancel">Cancel</b-button>
          <b-button type="is-primary" @click="sendActivityBlog" :loading="isSubmitting" :disabled="uploadingFile">Save</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/activity-blog-form.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .activity-blog-form {
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

      &-actions {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
