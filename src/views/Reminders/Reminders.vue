<template>
  <div class="reminder">
    <div class="reminder__header">
      <BaseButton buttonClass="button-save" class="reminder__create-btn">Create</BaseButton>
      <SearchBar class="reminder__search-bar"></SearchBar>
    </div>
<!--    <ReminderCard></ReminderCard>-->
<!--    <ReminderCard></ReminderCard>-->
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
    max-width: 50vw;
    margin: 0 auto;
  }

  .reminder__header {
    display: flex;
    justify-content: space-between;
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
