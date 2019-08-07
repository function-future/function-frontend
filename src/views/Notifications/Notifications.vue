<template>
  <div class="notifications">
    <template v-for="notification in notifications">
      <BaseCard cardClass="notification-card" :key="notification.id">
        <div class="notifications__card__container">
          <div class="notifications__card__content">
            <h3>{{ notification.title }}</h3>
            <p>{{ notification.description }}</p>
          </div>
          <div>
            <p class="notification__card__time">{{ convertClock(notification.createdAt).clock }}</p>
            <p class="notification__card__time">{{ convertClock(notification.createdAt).date }}</p>
          </div>
        </div>
      </BaseCard>
    </template>
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
  </div>

</template>

<script src="./notifications.js">

</script>

<style scoped>
  h3, p {
    margin: 5px 0;
  }

  .notifications {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 60vw;
    max-height: 85vh;
    overflow: auto;
    padding: 0 20px;
    margin: 0 auto;
  }

  .notifications__card__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .notification__card__time {
    text-align: center;
  }
</style>
