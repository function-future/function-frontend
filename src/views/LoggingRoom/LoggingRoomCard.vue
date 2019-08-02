<template>
    <div>
      <BaseCard class="logging-room-card__outer">
        <div class="logging-room-card__container" @click="$emit('click')">
          <div class="logging-room-card__title">
            <h2>{{computedTitle}}</h2>
          </div>
          <div class="logging-room-card__description" >
            <span>{{computedDescription}}</span>
          </div>
          <div class="logging-room-card__member-information">
            <font-awesome-icon icon="users"></font-awesome-icon>
            <span> {{computedMemberCount}} </span>
          </div>
        </div>
        <div class="logging-room-card__edit-delete">
          <font-awesome-icon class="icon icon-edit" icon="edit" @click="$emit('edit')"/>
          <font-awesome-icon class="icon icon-delete" icon="trash-alt" @click="$emit('delete')"/>
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
      display: flex;
    }

    &__container {
      display: flex;
      flex-direction: column;
      padding-left: 10px;
      flex-grow: 2;
      cursor: pointer;
    }

    &__title {
      height: 5vh;
      display: flex;
      justify-content: space-between;
    }
    &__description {
      height: 9vh;
    }
    &__member-information {
      font-size: 2vh;
      height: 5vh;
      color : #02AAF3;
    }
  }

  .icon-edit {
    font-size : 1.5rem;
    color: #02aaf3;
    padding-right: 10px;
    cursor: pointer;
  }

  .icon-delete{
    font-size : 1.5rem;
    color: #cc0000;
    cursor: pointer;
  }
</style>
