<template>
  <div class="reminder">
    <div class="reminder__header">
      <BaseButton buttonClass="button-save" @click="createHandler" class="reminder__create-btn">Create</BaseButton>
      <SearchBar class="reminder__search-bar" @input="searchHandler"></SearchBar>
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

<style scoped>
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .reminder {
    width: 50vw;
    margin: 0 auto;
  }

  .reminder__header {
    display: flex;
    justify-content: space-between;
  }

  .reminder__body {
    max-height: 75vh;
    overflow: auto;
    padding: 10px;
  }

  .reminder__search-bar {
    max-width: 50%;
  }

  .reminder__create-btn {
    height: 50%;
    width: auto;
    font-size: 0.9em;
    align-self: center;
  }
</style>
