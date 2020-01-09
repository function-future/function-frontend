<template>
    <div class="logging-room-detail">
      <div class="logging-room-detail__container">
        <div class="logging-room-detail__title" :style="{display: isShow}">
          <span><b>{{loggingRoom.title}}</b></span>
        </div>
        <div class="logging-room-detail__description" :style="{display: isShow}">
          <span>{{loggingRoom.description}}</span>
          <br>
          <br>
        </div>
        <div class="logging-room-detail__member-list-container" :style="{display: isShowMembers}">
          <span class="logging-room-detail__member-list-container__title"><b>Members</b></span>
          <participant-card v-for="member in loggingRoom.members"
                            :key="member.id"
                            :name="member.name"
                            :avatar="member.avatar"
                            :role="member.role"
                            :university="member.university"
                            :batch="member.batchName"
          ></participant-card>
        </div>
        <div :style="{display: isShow}">
          <MenuCard  :iconMenu="iconMenuMembers" :iconTitle="iconMenuMembersTitle"
                    @click="callShowMembers"
          ></MenuCard>
          <br>
          <MenuCard :iconMenu="iconMenuLoggingRooms" :iconTitle="iconMenuLoggingRoomsTitle"
          ></MenuCard>
        </div>
        <div class="logging-room-detail__topic-list-container">
          <div class="logging-room-detail__topic-list-container__top-bar">
            <h3> Topics </h3>
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
        padding: 2%;
      }
    }

    &__title{
      text-align: left;
      font-size: 2rem;
    }

    &__description{
      text-align: left;
      padding: 1vh 0vh;
    }

    &__member-list-container{
      /*@media only screen and (max-width: 1023px) {*/
      /*  display: none;*/
      /*}*/
      @media only screen and (max-width: 1023px) {
        height: 87vh;
      }
      height: 30vh;
      overflow: auto;
      &__title {
        font-size: 2rem;
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
