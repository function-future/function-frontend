<template>
  <div class="topic-card" @click="$emit('click')">
    <BaseCard class="topic-card__content">
      <h3> {{title}}</h3>
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
      cursor: pointer;
    }
  }
</style>
