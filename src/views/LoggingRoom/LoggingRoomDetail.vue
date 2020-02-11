<template>
    <div class="logging-room-detail">
      <div class="logging-room-detail__container">
        <div class="logging-room-detail__content">
            <span class="logging-room-detail__title">{{loggingRoom.title}}</span>
            <span class="logging-room-detail__description">{{loggingRoom.description}}</span>
        </div>
        <div class="logging-room-detail__mobile">
          <MenuCard  class="logging-room-detail__mobile__menu"
                     :iconMenu="iconMenuMembers"
                     :iconTitle="iconMenuMembersTitle"
                     @click="callShowMembers"
          ></MenuCard>
          <MenuCard  class="logging-room-detail__mobile__menu"
                     :iconMenu="iconMenuTopics"
                     :iconTitle="iconMenuTopicsTitle"
                     @click="callShowTopics"
          ></MenuCard>
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
    </div>
</template>

<script src="./js/logging-room-detail.js">
</script>

<style lang="scss" scoped>

  * {
    padding: 0px;
    margin: 0px;
  }

  .logging-room-detail{
    display: flex;
    align-items: center;
    flex-direction: column;
    height: calc(100vh - 60px - 0.5rem - 62px);
    width: 100%;
    @media only screen and (min-width: 1023px) {
      max-width: 40vw;
    }

    &__container {
      display: flex;
      flex-direction: column;
      width: 100%;
      @media only screen and (max-width: 1023px) {
        width: 100vw;
        padding: 0px 10px;
      }
    }

    &__mobile {
      &__menu {
        margin: 5px 0px;
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
    }

    &__title{
      text-align: left;
      font-size: 1.2rem;
      font-weight: bold;
    }

    &__description{
      text-align: left;
    }

    &__member-list-container{
      height: 30vh;
      overflow: auto;
      &__title {
        font-size: 1.2rem;
        font-weight: bold;
      }
    }

    &__topic-list-container {
      @media only screen and (max-width: 1023px) {
        display: none;
      }
      text-align: left;
      padding-top: 2vh;

      &__content {
        width: 100%;
        height: 30vh;
        overflow: auto;
      }

      &__top-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &__create-btn {
          font-size: 0.5rem;
          width: fit-content;
        }
      }
    }

    .add-btn {
      width: 75px;
    }

  }
</style>
