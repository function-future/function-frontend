<template>
  <div class="topics-page__container">
    <div class="topics-page__top-bar">
      <span class="topics-page__top-bar__title">Topics</span>
      <div class="topics-page__top-bar__add-button">
        <b-button
          v-if="accessList.edit"
          class="add-btn is-primary is-rounded"
          type="submit"
          icon-left="plus"
          buttonClass="button-save"
          @click="topicModal = true">
          <span>Add</span>
        </b-button>
      </div>
    </div>
    <div class="topics-page__participant-container">
      <topic-card v-for="topic in topics"
                  :key="topic.id"
                  :title="topic.title"
                  @click="goToLoggingRoom(topic.id)"
                  @delete="openDeleteModal(topic)"
      ></topic-card>
      <infinite-loading ref="infiniteLoading" @infinite="infiniteHandler">
        <div slot="no-more"></div>
        <div slot="no-results"></div>
      </infinite-loading>
    </div>
    <modal-add-question :type="topic.type" :description="topic.title" :isUpdate="topic.isUpdate" v-if="topicModal"
                        @close="closeTopicModal"
                        @submit="createTopic"
    ></modal-add-question>
    <modal-delete-confirmation
      v-if="modalDeleteConfirmation.show"
      @close="resetDeleteModal"
      @clickDelete="deleteTopic">
      <div slot="description">
        to delete topic "{{this.modalDeleteConfirmation.title}}" ?
      </div>></modal-delete-confirmation>
  </div>
</template>

<script src="./js/logging-room-topics-page.js">
</script>

<style lang="scss" scoped>
  .topics-page {

    &__container {
       display: flex;
       flex-direction: column;
       width: 40vw;
       height: calc(100vh - 60px - 0.5rem - 62px);
      @media only screen and (max-width: 1023px) {
        padding: 0px 10px;
        width: 100vw;
      }
    }
    &__top-bar {
      display: flex;
      justify-content: space-between;

      &__title {
        text-align: left;
        font-size: 1.2rem;
        font-weight: bold;
      }

      &__add-button {
        align-self: center;
      }
    }

    &__participant-container {
       padding-top: 1vh;
      @media only screen and (max-width: 1023px) {
       height: 82vh;
      }
      height: 30vh;
      overflow: auto;
    }
  }

  .add-btn {
    @media only screen and (max-width: 1023px) {
      position: fixed;
      right: 5vw;
      bottom: 75px;
      transition: all 0.1s ease-in-out;
      box-shadow: 2px 2px 16px 4px rgba(0, 0, 0, 0.2);
      z-index: 1;
    }
  }
</style>
