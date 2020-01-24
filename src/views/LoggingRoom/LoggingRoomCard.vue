<template>
    <div>
      <div class="logging-room-card__outer">
        <div class="logging-room-card__container" @click="$emit('click')">
          <div class="logging-room-card__title">
            <h2> <b>{{computedTitle}}</b> </h2>
          </div>
          <div class="logging-room-card__description" >
            <span>{{computedDescription}}</span>
          </div>
          <div class="logging-room-card__member-information">
            <font-awesome-icon icon="users"></font-awesome-icon>
            <span> {{computedMemberCount}} </span>
          </div>
        </div>
        <div v-if="accessList.edit" class="logging-room-card__edit-delete">
          <font-awesome-icon class="icon icon-edit" icon="edit" @click="$emit('edit')"/>
          <font-awesome-icon class="icon icon-delete" icon="trash-alt" @click="$emit('delete')"/>
        </div>
      </div>
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
      display: flex;
      background: #FFFFFF;
      border: 1px solid #F2F2F2;
      box-sizing: border-box;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      text-align: left;
      margin: 5px 10px;
      padding: 10px;
      cursor: pointer;
      height: auto;
    }

    &__container {
      display: flex;
      flex-direction: column;
      padding-left: 10px;
      flex-grow: 4;
      cursor: pointer;
    }

    &__title {
      display: flex;
      justify-content: space-between;
    }
    &__description {
    }
    &__member-information {
      font-size: 2vh;
      color : #02AAF3;
    }

    &__edit-delete {
      min-width: 8%;
      display: flex;
      justify-content: space-between;
    }
  }

  .icon-edit {
    font-size : 1.5rem;
    color: #02aaf3;
    cursor: pointer;
  }

  .icon-delete{
    font-size : 1.5rem;
    color: #cc0000;
    cursor: pointer;
  }
</style>
