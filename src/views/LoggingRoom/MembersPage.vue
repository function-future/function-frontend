<template>
  <div class="members-page__container">
    <span class="members-page__title">Members</span>
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
    width: 100%;

    &__container {

      display: flex;
      flex-direction: column;
      width: 40vw;
      @media only screen and (max-width: 1023px) {
        width: 100vw;
        padding: 0px 10px;
        height: calc(100vh - 60px - 0.5rem - 62px);
      }
    }

    &__title {
      text-align: left;
      font-size: 1.2rem;
      font-weight: bold;
    }

    &__participant-container {
      @media only screen and (max-width: 1023px) {
        height: 82vh;
      }
      height: 30vh;
      overflow: auto;
    }
  }
</style>
