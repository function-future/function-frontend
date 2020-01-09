<template>
  <div class="members-page__member-list-container" :style="{display: isShowMembers}">
    <span class="members-page__member-list-container__title"><b>Members</b></span>
    <participant-card v-for="member in loggingRoom.members"
                      :key="member.id"
                      :name="member.name"
                      :avatar="member.avatar"
                      :role="member.role"
                      :university="member.university"
                      :batch="member.batchName"
    ></participant-card>
  </div>
</template>

<script src="./js/members-page.js">
</script>

<style lang="scss" scoped>
  .members-page{
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
</style>
