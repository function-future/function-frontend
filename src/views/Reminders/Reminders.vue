<template>
  <div class="reminder">
    <div class="reminder__header">
      <b-button
        @click="createHandler"
        class="reminder__create-btn is-primary">
        <b-icon v-if="isMobile" icon="plus" size="is-medium"></b-icon>
        <span v-else>Create</span>
      </b-button>
      <b-input
        @input="searchHandler"
        icon="search"
        placeholder="Search..."
        class="is-rounded reminder__search-bar"/>
    </div>
    <div class="reminder__body">
      <template v-for="reminder in reminders">
        <ReminderCard @click="detailHandler" :reminder="reminder" :key="reminder.id" @remove="removeHandler"></ReminderCard>
      </template>
      <infinite-loading ref="infiniteLoading" :identifier="keyword" @infinite="infiniteHandler">
        <div slot="no-more"></div>
        <div slot="no-results"></div>
      </infinite-loading>
    </div>
    <ModalDeleteConfirmation v-if="showDeleteConfirmation" @clickDelete="deleteReminder" @close="showDeleteConfirmation = false" />
  </div>
</template>

<script src="./js/reminders.js">

</script>

<style lang="scss" scoped>
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .reminder {
    width: 40vw;
    margin: 0 auto;
    @media only screen and (max-width: 1023px) {
      width: 100vw;
    }

    &__header {
      display: flex;
      justify-content: space-between;
    }

    &__body {
      max-height: 75vh;
      overflow: auto;
      padding: 10px;
    }

    &__search-bar {
      max-width: 50%;
      @media only screen and (max-width: 1023px) {
        max-width: 100%;
        width: 100%;
        margin: 5px 10px;
      }
    }

    &__create-btn {
      width: auto;
      font-size: 0.9em;
      align-self: center;
      @media only screen and (max-width: 1023px) {
        font-size: 1.25em;
        position: fixed;
        right: 2rem;
        bottom: 5.25rem;
        transition: all 0.1s ease-in-out;
        box-shadow: 2px 2px 16px 4px rgba(0, 0, 0, 0.2);
        border-radius: 100%;
        z-index: 1;
      }
    }

  }
</style>
