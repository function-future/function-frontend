<template>
  <div class="scrollable-container" v-if="!isLoading">
    <div class="room-detail">
      <BaseCard class="room-detail-card" cardClass="no-pointer">
        <div class="header">
          <h3>{{ roomDetail.assignment.title }}</h3>
        </div>
        <div class="header float-right">
          <div class="action">
            <span class="edit-btn">
              {{roomDetail.assignment.deadline | moment('dddd, MMMM Do YYYY')}}
            </span>
          </div>
        </div>
        <a v-if="roomDetail.assignment.file && roomDetail.assignment.file !== ''" :href="roomDetail.assignment.file" target="_blank" class="download-button">
          <font-awesome-icon icon="download" class="icon"></font-awesome-icon>Download material
        </a>
        <div class="scrollable">
          <span v-html="descriptionCompiledMarkdown"></span>
        </div>
      </BaseCard>
      <BaseCard class="room-detail-score" v-if="accessList.add && accessList.add.score">
        <div class="room-detail-score-header">
          <span>Score</span>
          <font-awesome-icon icon="save" class="icon blue" @click="updateScore"></font-awesome-icon>
        </div>
        <input type="number" min="0" max="100" v-model="roomDetail.point" class="room-detail-score-input">
      </BaseCard>
    </div>
    <BaseCard class="discussion-wrapper" cardClass="no-pointer">
      <h3>Discussion</h3>
      <div class="scrollable discussion-scrollable">
        <div v-for="discussion in discussions" :key="discussion.id">
          <BaseCard class="discussion-card">
            <div class="discussion-info">
              <span style="font-weight: bold; font-size: 15px; margin-left: -15px;">{{ discussion.author.name }}</span>
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
          <BaseTextArea class="discussion-input-box"
                        :placeholder="commentBoxPlaceholder"
                        :disabled="disableCommentBox"
                        v-model="discussion.comment"></BaseTextArea>
        </div>
        <div class="discussion-button">
          <BaseButton type="submit" buttonClass="button-save" @click="submitComment" v-if="accessList.add && accessList.add.discussion" :disabled="isDeadlineHasPassed">Post</BaseButton>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script type="text/javascript" src="./js/assignment-room-detail.js">
</script>

<style lang="scss" scoped>
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

  .room-detail {
    height: 70vh;
    display: flex;
  }

  .room-detail-card {
    max-height: 100%;
    flex-grow: 10;
  }

  .room-detail-score {
    display: flex;
    flex-direction: column;
    &-header {
      display: flex;
      justify-content: space-between;
      height: 20%;
      font-size: larger;
      font-weight: bolder;
    }
    &-input {
      height: 80%;
      border: none;
      font-weight: bolder;
      font-size: 5rem;
      text-align: right;
      &:focus {
        outline: none;
      }
    }
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
    font-size: 0.8rem;
  }

  .discussion-content {
    margin: 5px 0;
    margin-left: -10px;
    text-align: justify;
    font-size: 1rem;
    font-weight: 600;
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
</style>
