<template>
  <div class="scrollable-container">
    <BaseCard class="room-detail-card" cardClass="no-pointer">
      <div class="header">
        <h3>{{ roomDetail.assignment.title }}</h3>
      </div>
      <div class="scrollable">
        <!--<div v-if="courseDetail.material !== ''" @click="downloadMaterial(courseDetail.material)" class="download-button">-->
          <!--<font-awesome-icon icon="download" class="icon"></font-awesome-icon>Download material-->
        <!--</div>-->
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
          <BaseButton type="submit" buttonClass="button-save" @click="submitComment">Post</BaseButton>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script type="text/javascript" src="./js/assignment-room-detail.js">
</script>

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

  .room-detail-card {
    height: 20vh;
  }

  .discussion-wrapper {
    min-height: 55vh;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
  }

  .discussion-card {
    min-height: 85px;
    width: 100%;
    box-shadow: none;
    margin: 0 0 15px 0;
    border: 1px solid #828282;
    cursor: pointer;
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
    border: 1px solid #828282;
    border-radius: 10px;
    padding: 10px 20px;
    color: #505050;
    cursor: pointer;
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
