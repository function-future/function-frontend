<template>
  <div class="scrollable-container">
    <div class="edit-container">
      <div class="title">
        <BaseInput autofocus
                   class="input-title"
                   inputType="title"
                   v-model="activityBlogDetail.title"
                   placeholder="Activity Blog Title"
                   v-validate.disable="'required'"
                   name="title"></BaseInput>
      </div>
      <div v-if="errors.has('title')"><span class="input-invalid-message">{{ errors.first('title') }}</span></div>
      <div class="description">
        <mavon-editor class="editor"
                      placeholder="Activity Blog Description"
                      language="en"
                      v-model="activityBlogDetail.description"
                      v-validate.disable="'required'"
                      name="description"
                      ref=md
                      @imgAdd="$imgAdd"
                      @imgDel="$imgDel">
        </mavon-editor>
      </div>
      <div v-if="errors.has('description')"><span class="input-invalid-message">{{ errors.first('description') }}</span></div>
      <div class="action">
        <div class="action-button">
          <BaseButton type="cancel" buttonClass="button-cancel" @click="cancel">Cancel</BaseButton>
        </div>
        <div class="action-button">
          <BaseButton type="submit" buttonClass="button-save" @click="sendActivityBlog" :disabled="isSubmitting || uploadingFile">Save</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/activity-blog-form.js">
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

  .description {
    margin: 10px 0 10px 0;
  }

  .editor {
    height: 60vh;
    width: 100%;
    margin-top: 20px;
  }

  .input-invalid-message {
    color: #FF0000;
    font-size: 0.75em;
    float: left;
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
</style>
