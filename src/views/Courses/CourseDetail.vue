<template>
  <div class="scrollable-container">
    <BaseCard class="course-card" cardClass="no-pointer">
      <div class="header">
        <h3>{{ courseDetail.title }}</h3>
      </div>
      <div class="header float-right">
        <div class="action">
          <span class="edit-btn" @click="goToEditCourse">
            <font-awesome-icon icon="edit" class="icon blue" size="lg"></font-awesome-icon>
          </span>
          <span class="delete-btn" @click="deleteCourse">
            <font-awesome-icon icon="trash-alt" class="icon red" size="lg"></font-awesome-icon>
          </span>
        </div>
      </div>
      <div class="scrollable">
        <span v-html="descriptionCompiledMarkdown"></span>
      </div>
    </BaseCard>
    <BaseCard class="discussion-wrapper" cardClass="no-pointer">
      <h3>Discussion</h3>
      <div class="scrollable">
        <div class="discussion-input-wrapper">
          <div class="discussion-input">
            <BaseTextArea class="discussion-input-box" placeholder="Ask a question..."></BaseTextArea>
          </div>
          <div class="discussion-button">
            <BaseButton type="submit" buttonClass="button-save" @click="postDiscussion">Post</BaseButton>
          </div>
        </div>
        <div v-for="discussion in discussions" :key="discussion.id">
          <BaseCard class="discussion-card"></BaseCard>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script type="text/javascript" src="./js/course-detail.js"></script>

<style scoped>
  .scrollable {
    overflow: auto;
    margin-bottom: 5px;
    height: 80%;
    padding: 0 10px 5px 5px;
  }

  .course-card {
    height: 70vh;
  }

  .discussion-wrapper {
    height: 70vh;
  }

  .discussion-card {
    min-height: 100px;
    width: 100%;
    box-shadow: none;
    margin: 0 0 15px 0;
    border: 1px solid #828282;
    cursor: pointer;
  }

  .discussion-input-wrapper {
    margin-bottom: 10px;
  }

  .discussion-input {
    height: 120px;
  }

  .discussion-input-box {
    height: 100px;
  }

  .header {
    display: inline-block;
  }

  .float-right {
    float: right;
  }

  .description {
    text-align: justify;
  }

  .action {
    border-left: 1px solid #BDBDBD;
    padding-left: 15px;
    display: inline-block;
  }

  .action span {
    padding: 5px;
    transition: all .2s ease;
  }

  .action span:hover {
    opacity: 0.8;
  }

  .action span:active {
    opacity: 0.9;
  }

  .discussion-button {
    display: flex;
    justify-content: flex-end;
  }

  h3 {
    margin: 5px 0 15px 0;
    text-align: left;
  }
</style>
