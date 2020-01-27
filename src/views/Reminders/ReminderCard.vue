<template>
  <div @click="$emit('click', reminder.id)" cardClass="custom-card" class="reminder__element-card">
    <div class="reminder__element-card__wrapper">
      <div class="reminder__element-card__content">
        <h3>{{ reminder.title }}</h3>
        <p>{{ reminder.description }}</p>
        <p class="reminder__element-card__content__time"><font-awesome-icon :icon="['far', 'clock']" size="lg"></font-awesome-icon> &nbsp; {{ formatDay(reminder) }} at {{ reminder.time }}</p>
        <p class="reminder__element-card__content__user"><font-awesome-icon icon="user" size="lg"></font-awesome-icon> &nbsp; {{ reminder.memberCount + ' ' + (reminder.memberCount > 1 ? 'Members': 'Member') }}</p>
      </div>
      <font-awesome-icon @click.stop="$emit('remove', reminder.id)" icon="trash-alt" class="reminder__element-card__close-btn"></font-awesome-icon>
    </div>
  </div>
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
    cursor: pointer;
    display: flex;
    background: #FFFFFF;
    border: 1px solid #F2F2F2;
    box-sizing: border-box;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    text-align: left;
    margin: 5px 10px;
    padding: 10px;
    height: auto;
  }

  .reminder__element-card__wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .reminder__element-card__close-btn {
    font-size: 1.5rem;
    align-self: flex-start;
    color: red;
    cursor: pointer;
  }

  .reminder__element-card__close-btn:hover {
    color: #DB2323;
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
