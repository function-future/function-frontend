<template>
    <BaseCard cardClass="card-hover"
              class="batch-card">
      <div class="col">
        <div class="row"><font-awesome-icon icon="users" class="icon"/></div>
        <div class="row"><h4>{{ batch.name }}</h4></div>
      </div>
    </BaseCard>
</template>

<script type="text/javascript" src="./js/batch-card.js"></script>

<style scoped>
  .batch-card {
    height: 75px;
    display: flex;
    margin: 7px 10px;
    align-items: center;
    border-radius: 20px;
  }

  .icon {
    margin-right: 15px;
  }

  .col {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-grow: 2;
    align-items: center;
  }
</style>
