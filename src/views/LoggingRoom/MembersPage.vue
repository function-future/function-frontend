<template>
  <div class="members-page__container">
    <span class="members-page__title"><b>Members</b></span>
    <div class="members-page__participant-container">
      <participant-card v-for="member in loggingRoom.members"
                        :key="member.id"
                        :name="member.name"
                        :avatar="member.avatar"
                        :role="member.role"
                        :university="member.university"
                        :batch="member.batchName"
      ></participant-card>
    </div>
  </div>
</template>

<script src="./js/members-page.js">
</script>

<style lang="scss" scoped>
  .members-page {
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

    &__title {
      text-align: left;
      font-size: 2rem;
      margin-bottom: 2vh;
    }

    &__participant-container {
      /*@media only screen and (max-width: 1023px) {*/
      /*  display: none;*/
      /*}*/
      padding-top: 1vh;
      @media only screen and (max-width: 1023px) {
        height: 82vh;
      }
      height: 30vh;
      overflow: auto;
    }
  }
</style>
