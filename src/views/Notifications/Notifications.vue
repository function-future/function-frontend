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
    <VueInfiniteLoading @infinite="infiniteHandler">
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </VueInfiniteLoading>
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
    max-width: 60vw;
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

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #FFF;
    -webkit-box-shadow: inset 1px 1px 2px rgba(0,0,0,0.1);
  }
  ::-webkit-scrollbar-thumb {
    background: #CCC;
    -webkit-box-shadow: inset 1px 1px 2px rgba(0,0,0,0.2);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #AAA;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #888;
    -webkit-box-shadow: inset 1px 1px 2px rgba(0,0,0,0.3);
  }
</style>
