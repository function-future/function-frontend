<template>
    <div class="logging-room">
      <div class="logging-room__container">
        <div class="logging-room__top-bar-container">
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
          ></logging-room-card>
          <infinite-loading ref="infiniteLoading" @infinite="infiniteHandler">
            <div slot="no-more"></div>
            <div slot="no-results"></div>
          </infinite-loading>
        </div>
      </div>
    </div>
</template>

<script src="./js/logging-room.js">
</script>

<style lang="scss" scoped >
  .logging-room {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 90vh;
    width: 100%;

    &__container {

      @media only screen and (min-width: 800px) {
        width: 500px;
      }

      @media only screen and (min-width: 1300px) {
        width: 800px;
      }

    }

    &__top-bar-container {
      display: flex;
      justify-content: flex-end;
      margin: 0 15px;
      max-height: 10vh;
    }

    &__search-bar {
      max-width: 300px;
      align-self: end;
    }

    &__list-card {
      overflow: auto;
      height: 70vh;

      &__card {
      }
    }
  }
</style>
