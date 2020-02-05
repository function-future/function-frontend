<template>
    <div class="logging-room__outer">
      <div class="logging-room__container">
        <div class="logging-room__top-bar-container" :class="{flexEnd: !accessList.edit }">
          <b-button v-if="accessList.edit"
                    class="is-rounded is-primary add-button"
                    icon-left="plus" rounded
                    type="submit"
                    buttonClass="button-save logging-room__top-bar-container__button"
                    @click="goToCreate">
            <span>Add</span>
          </b-button>
          <b-input
            @input="searchHandler"
            icon="search"
            placeholder="Search..."
            class="is-rounded logging-room__top-bar-container__search-bar"/>
        </div>
        <div class="logging-room__list-card">
          <div v-if="Object.keys(loggingRooms).length === 0" class="logging-room__list-card__empty-wrapper">
            <EmptyState class="logging-room__list-card__empty-state" src="logging-room-empty">
              <template #title>
                Looks like there is no Logging Room !
              </template>
            </EmptyState>
          </div>
          <div v-else class="logging-room__list-card__card">
            <logging-room-card
                               v-for="loggingRoom in loggingRooms"
                               :key="loggingRoom.id"
                               :title="loggingRoom.title"
                               :description="loggingRoom.description"
                               :memberCount="loggingRoom.members.length"
                               @click="goToLoggingRoomDetail(loggingRoom.id)"
                               @edit="editLoggingRoom(loggingRoom.id)"
                               @delete="openDeleteModal(loggingRoom)"
            ></logging-room-card>
          </div>
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
    &__outer{
      display: flex;
      align-items: center;
      flex-direction: column;
      height: 80vh;
      width: 100%;
    }

    &__container {
      width: 100%;
      @media only screen and (max-width: 1023px) {
        width: 100vw;
      }
    }

    &__top-bar-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 10px;
      min-height: 10vh;

      &__search-bar {
        @media only screen and (max-width: 1023px) {
          width: 100%;
        }

        width: 300px;
      }

      &__button{
        align-items: center;
      }
    }

    &__list-card {
      @media only screen and (max-width: 1023px) {
        height: 70vh;
      }
      overflow: auto;
      height: 85vh;
      &__card {
      }
    }
  }
  .flexEnd {
    justify-content: flex-end;
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
</style>
