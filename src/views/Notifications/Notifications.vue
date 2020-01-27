<template>
  <div class="notifications">
    <template v-for="notification in notifications">
      <div cardClass="notification-card" :key="notification.id">
        <div class="notifications__card__container box">
          <div class="notifications__card__content">
            <h3>{{ notification.title }}</h3>
            <p>{{ notification.description }}</p>
          </div>
          <div>
            <p class="notification__card__time">{{ convertClock(notification.createdAt).clock }}</p>
            <p class="notification__card__time">{{ convertClock(notification.createdAt).date }}</p>
          </div>
        </div>
      </div>
    </template>
    <infinite-loading @infinite="infiniteHandler">
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
  </div>

</template>

<script src="./notifications.js">

</script>

<style lang="scss" scoped>
  h3, p {
    margin: 5px 0;
  }

  .notifications {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    max-height: 85vh;
    overflow: auto;
    padding: 0 20px;
    margin: 0 auto;
    width: 40vw;
    @media only screen and (max-width: 1023px) {
      width: 100vw;
      padding: 10px;
    }
  }

  .notifications__card__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
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

  .notification__card__time {
    text-align: center;
  }
</style>
