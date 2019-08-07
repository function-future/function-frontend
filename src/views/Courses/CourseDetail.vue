<template>
  <div class="scrollable-container">
    <BaseCard class="course-card" cardClass="no-pointer">
      <div class="header">
        <h3>{{ courseDetail.title }}</h3>
      </div>
      <div class="header float-right">
        <div class="action">
          <span class="edit-btn" @click="goToEditCourse" v-if="accessList.edit">
            <font-awesome-icon icon="edit" class="icon blue" size="lg"></font-awesome-icon>
          </span>
          <span class="delete-btn" @click="openDeleteConfirmationModal" v-if="accessList.delete">
            <font-awesome-icon icon="trash-alt" class="icon red" size="lg"></font-awesome-icon>
          </span>
        </div>
      </div>
      <div class="scrollable">
        <a v-if="courseDetail.material" :href="courseDetail.material" target="_blank" class="download-button">
            <font-awesome-icon icon="download" class="icon"></font-awesome-icon>Download material
        </a>
        <span v-html="descriptionCompiledMarkdown"></span>
      </div>
    </BaseCard>
    <BaseCard class="discussion-wrapper" cardClass="no-pointer">
      <h3>Discussion</h3>
      <div class="scrollable discussion-scrollable">
        <div v-for="discussion in discussions" :key="discussion.id">
          <BaseCard class="discussion-card">
            <div class="discussion-info">
              <span>{{ discussion.author.name }}</span>
              <span class="discussion-date">{{ discussion.createdAt | moment("dddd, MMMM Do YYYY") }}</span>
            </div>
            <div class="discussion-content">
              <span>{{ discussion.comment }}</span>
            </div>
          </BaseCard>
        </div>
        <infinite-loading direction="top"
                          @infinite="initDiscussion"
                          spinner="spiral"
                          force-use-infinite-wrapper=".scrollable">
          <div slot="no-more"></div>
          <div slot="no-results"></div>
        </infinite-loading>
      </div>
      <div class="discussion-input-wrapper">
        <div class="discussion-input">
          <BaseTextArea class="discussion-input-box" placeholder="Ask a question..."
                        v-model="discussion.comment"></BaseTextArea>
        </div>
        <div class="discussion-button">
          <BaseButton type="submit" buttonClass="button-save" @click="postDiscussion" :disabled="submittingDiscussion">Post</BaseButton>
        </div>
      </div>
    </BaseCard>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="showDeleteConfirmationModal = false"
                               @clickDelete="deleteCourse">
      <div slot="description">Are you sure you want to delete this course?</div>
    </modal-delete-confirmation>
  </div>
</template>

<script type="text/javascript" src="./js/course-detail.js"></script>

<style scoped>
  .scrollable {
    overflow: auto;
    margin-bottom: 5px;
    max-height: 60%;
    padding: 0 10px 5px 5px;
    display: flex;
    flex-direction: column;
    align-content: center;
  }

  .discussion-scrollable {
    display: flex;
    flex-direction: column-reverse;
  }

  .course-card {
    height: 70vh;
  }

  .discussion-wrapper {
    max-height: 80vh;
    display: flex;
    flex-direction: column;
  }

  .discussion-card {
    min-height: 85px;
    width: 100%;
    box-shadow: none;
    margin: 5px 0 10px 0;
    border: 1px solid #828282;
  }

  .discussion-info {
    font-size: 0.8rem;
    margin-bottom: 10px;
    color: #828282;
  }

  .discussion-date {
    border-left: 1px solid #BDBDBD;
    padding-left: 5px;
    margin-left: 5px;
    font-size: 0.7rem;
  }

  .discussion-content {
    margin: 5px 0;
    text-align: justify;
  }

  .discussion-input-wrapper {
    margin-top: 10px;
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

  .download-button {
    display: block;
    border: 1px solid #828282;
    border-radius: 10px;
    padding: 10px 20px;
    color: #505050;
    cursor: pointer;
    text-decoration: none;
  }

  .download-button:hover {
    background-color: #F2F2F2;
  }

  h3 {
    margin: 5px 0 15px 0;
    text-align: left;
  }

  .icon {
    margin-right: 5px;
  }
</style>
