<template>
    <div>
      <BaseCard class="logging-room-card__outer">
        <div class="logging-room-card__container">
          <div class="logging-room-card__title">
            <h2>{{computedTitle}}</h2>
          </div>
          <div class="logging-room-card__description">
            <span>{{computedDescription}}</span>
          </div>
          <div class="logging-room-card__member-information">
            <font-awesome-icon icon="users"></font-awesome-icon>
            <span> {{computedMemberCount}} </span>
          </div>
        </div>
      </BaseCard>
    </div>
</template>

<script src="./js/logging-room-card.js">
</script>

<style lang="scss" scoped>

  * {
    margin: 0;
    padding: 0;
  }

  .logging-room-card {
    &__outer {
      height: 20vh;
      padding: 15px;
    }

    &__container {
      display: flex;
      flex-direction: column;
      padding-left: 10px;
    }

    &__title {
      height: 7vh;
    }
    &__description {
      height: 7vh;
    }
    &__member-information {
      font-size: 2vh;
      height: 5vh;
      color : #02AAF3;
    }
  }
</style>
