<template>
  <div class="topic-card">
    <div class="topic-card__content">
      <div class="topic-card__content__title" @click="$emit('click')">
        <h3> {{title}}</h3>
      </div>
      <div class="topic-card__content__delete-icon">
        <font-awesome-icon v-if="accessList.edit" class="icon icon-delete red" icon="trash-alt" @click="$emit('delete')"/>
      </div>
    </div>
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
    margin: 5px;

    &__content {
      width: 100%;
      display: flex;
      justify-content: space-between;
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
