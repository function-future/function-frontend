<template>
    <BaseCard cardClass="card-hover"
              class="batch-card" @click.native="goToCourse(batch.batchCode)">
      <div class="row">
        <div class="description">
          <h4><font-awesome-icon icon="users" class="icon"/> {{ batch.name }}</h4>
        </div>
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

  .description {
    flex-grow: 2;
  }
</style>
