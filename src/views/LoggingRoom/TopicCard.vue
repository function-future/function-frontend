<template>
  <div class="topic-card">
    <BaseCard class="topic-card__content">
      <div class="topic-card__content__title" @click="$emit('click')">
        <h3> {{title}}</h3>
      </div>
      <div class="topic-card__content__delete-icon">
        <font-awesome-icon v-if="accessList.edit" class="icon icon-delete red" icon="trash-alt" @click="$emit('delete')"/>
      </div>
    </BaseCard>
  </div>
</template>

<script src="./js/topic-card.js">
</script>

<style lang="scss" scoped>
  * {
    padding: 0px;
    margin: 0px;
  }

  .topic-card {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 95%;
    padding: 2px 2.5%;

    &__content {
      width: 100%;
      margin: 0px;
      display: flex;
      justify-content: space-between;
      &__title {
        flex-grow: 2;
        cursor: pointer;
      }
    }
  }

  .red {
    color: red;
  }
</style>
