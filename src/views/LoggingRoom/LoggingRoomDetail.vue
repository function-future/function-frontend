<template>
    <div class="logging-room-detail">
      <div class="logging-room-detail__container">
        <div class="logging-room-detail__content">
            <span class="logging-room-detail__title">{{loggingRoom.title}}</span>
            <span class="logging-room-detail__description">{{loggingRoom.description}}</span>
        </div>
        <div v-if="isMobile" class="logging-room-detail__mobile">
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
        <div v-else class="logging-room-detail__member-list-container">
          <span class="logging-room-detail__member-list-container__title">Members</span>
          <participant-card v-for="member in loggingRoom.members"
                            :key="member.id"
                            :name="member.name"
                            :avatar="member.avatar"
                            :role="member.role"
                            :university="member.university"
                            :batch="member.batchName"
          ></participant-card>
        </div>
        <div class="logging-room-detail__topic-list-container">
          <div class="logging-room-detail__topic-list-container__top-bar">
            <span class="logging-room-detail__member-list-container__title">Topics</span>
            <div class="logging-room-detail__topic-list-container__top-bar__create-btn">
              <b-button
                v-if="accessList.edit"
                class="is-primary is-rounded add-btn"
                type="submit"
                icon-left="plus"
                buttonClass="button-save"
                @click="topicModal = true">
                <span>Add</span>
              </b-button>
            </div>
          </div>
          <div class="logging-room-detail__topic-list-container__content">
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
    height: 90vh;
    width: 100%;

    &__container {
      display: flex;
      flex-direction: column;
      width: 100%;
      @media only screen and (max-width: 1023px) {
        width: 100vw;
        padding: 10px;
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
