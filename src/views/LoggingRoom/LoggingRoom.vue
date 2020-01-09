<template>
    <div class="logging-room">
      <div class="logging-room__container">
        <div class="logging-room__top-bar-container" :class="{flexEnd: !accessList.edit }">
          <b-button v-if="accessList.edit"
                      class="is-rounded is-primary add-button" type="submit" buttonClass="button-save" @click="goToCreate"
                      icon-left="plus" rounded>
            <span>Add</span>
          </b-button>
          <SearchBar class="logging-room__search-bar" @input="searchHandler"/>
        </div>
        <div class="logging-room__list-card">
          <logging-room-card class="logging-room__list-card__card"
                              v-for="loggingRoom in loggingRooms"
                              :key="loggingRoom.id"
                              :title="loggingRoom.title"
                              :description="loggingRoom.description"
                              :memberCount="loggingRoom.members.length"
                              @click="goToLoggingRoomDetail(loggingRoom.id)"
                              @edit="editLoggingRoom(loggingRoom.id)"
                              @delete="openDeleteModal(loggingRoom)"
          ></logging-room-card>
          <infinite-loading ref="infiniteLoading" @infinite="infiniteHandler">
            <div slot="no-more"></div>
            <div slot="no-results"></div>
          </infinite-loading>
        </div>
      </div>
      <modal-delete-confirmation
        v-if="modalDeleteConfirmation.show"
        @close="resetDeleteModal"
        @clickDelete="deleteLoggingRoom">
        <div slot="description">
          to delete logging room "{{this.modalDeleteConfirmation.title}}" ?
        </div>></modal-delete-confirmation>
    </div>
</template>

<script src="./js/logging-room.js">
</script>

<style lang="scss" scoped >
  @import "@/assets/css/main.scss";

  .logging-room {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 90vh;

    &__container {

      width: 100%;

      /*@media only screen and (min-width: 800px) {*/
      /*  width: 500px;*/
      /*}*/

      /*@media only screen and (min-width: 1300px) {*/
      /*  width: 800px;*/
      /*}*/
    }

    &__top-bar-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 15px;
      max-height: 10vh;
    }

    &__search-bar {
      @media only screen and (max-width: 1023px) {
        width: 100%;
      }

      width: 300px;
      align-self: end;

    }

    &__list-card {
      @media only screen and (max-width: 1023px) {
        height: 79vh;
      }
      overflow: auto;
      height: 85vh;
      &__card {
      }
    }

    .add-button {
      @media only screen and (max-width: 1023px) {
        position: fixed;
        right: 5vw;
        bottom: 75px;
        transition: all 0.1s ease-in-out;
        box-shadow: 2px 2px 16px 4px rgba(0, 0, 0, 0.2);
        z-index: 1;
      }
    }

    .flexEnd {
      justify-content: flex-end;
    }

  }
</style>
