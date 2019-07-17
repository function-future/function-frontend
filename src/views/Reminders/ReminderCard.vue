<template>
  <BaseCard cardClass="custom-card" class="reminder__element-card">
    <div class="reminder__element-card__wrapper">
      <div class="reminder__element-card__content">
        <h3>{{ reminder.title }}</h3>
        <p>{{ reminder.description }}</p>
        <p class="reminder__element-card__content__time"><font-awesome-icon :icon="['far', 'clock']" size="lg"></font-awesome-icon> &nbsp; {{ formatDay(reminder) }} at {{ reminder.time }}</p>
        <p class="reminder__element-card__content__user"><font-awesome-icon icon="user" size="lg"></font-awesome-icon> &nbsp; {{ reminder.memberCount + ' ' + (reminder.memberCount > 1 ? 'Members': 'Member') }}</p>
      </div>
      <font-awesome-icon icon="times" class="reminder__element-card__close-btn"></font-awesome-icon>
    </div>
  </BaseCard>
</template>

<script src="./js/reminder-card.js">

</script>

<style scoped>
  p, h3 {
    margin: 0;
  }

  p {
    font-size: 12pt;
    margin-top: 10px;
  }

  .reminder__element-card {
    margin: 7px 0;
    cursor: pointer;
  }

  .reminder__element-card__wrapper {
    display: flex;
    justify-content: space-between;
  }

  .reminder__element-card__close-btn {
    font-size: 1.5rem;
    align-self: center;
    cursor: pointer;
  }

  .reminder__element-card__content {
    display: flex;
    flex-direction: column;
  }

  .reminder__element-card__content__time {
    color: #DB2323;
  }

  .reminder__element-card__content__user {
    color: #02AAF3;
  }

</style>
