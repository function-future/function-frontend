<template>
    <div class="logging-room-detail">
      <div class="logging-room-detail__container">
        <div class="logging-room-detail__title">
          <h2>{{loggingRoom.title}}</h2>
        </div>
        <div class="logging-room-detail__description">
          <span>{{loggingRoom.description}}</span>
          <br>
          <br>
          <h3>Members</h3>
        </div>
        <div class="logging-room-detail__member-list-container">
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
          <h3> Topics </h3>
          <div class="logging-room-detail__topic-list-container__content">
            <topic-card v-for="topic in topics"
                          :key="topic.  id"
                          :title="topic.title"
                          @click="goToLoggingRoom(topic.id)"
            ></topic-card>
            <infinite-loading ref="infiniteLoading" @infinite="infiniteHandler">
              <div slot="no-more"></div>
              <div slot="no-results"></div>
            </infinite-loading>
          </div>
        </div>
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
      align-items: center;

      @media only screen and (min-width: 800px) {
        width: 500px;
      }

      @media only screen and (min-width: 1300px) {
        width: 800px;
      }
    }

    &__title{
      text-align: left;
      width: 80%;
    }

    &__description{
      text-align: left;
      padding: 1vh 0vh;
      width: 80%;
    }

    &__member-list-container{
      width: 80%;
      height: 30vh;
      overflow: auto;
    }

    &__topic-list-container {
      width: 80%;
      text-align: left;
      padding-top: 2vh;

      &__content {
        width: 100%;
        height: 30vh;
        overflow: auto;
      }
    }

  }
</style>
