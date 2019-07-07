<template>
    <BaseCard cardClass="card-hover"
              class="batch-card">
      <div class="col">
        <div class="row"><font-awesome-icon icon="users" class="icon"/></div>
        <div class="row"><h4>{{ batch.name }}</h4></div>
      </div>
      <div class="col actions-div" v-if="showAction">
        <span @click.stop="edit(batch.id)"><font-awesome-icon icon="edit" class="icon blue"></font-awesome-icon></span>
        <span @click.stop="deleteBatch(batch.id)"><font-awesome-icon icon="trash-alt" class="icon red"></font-awesome-icon></span>
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

  .actions-div {
    align-self: center;
    justify-content: flex-end;
    text-align: center;
  }

  .actions-div span{
    transition: all .2s ease;
  }

  .actions-div span:hover {
    opacity: 0.8;
  }

  .actions-div span:active {
    opacity: 0.9;
  }
</style>
