<template>
  <BaseCard cardClass="card-hover no-pointer" class="user-card">
    <div class="row">
      <div class="col basic-info" style="flex-grow: 2">
        <h3>{{ user.name }}</h3>
        <h4>{{ user.university }}</h4>
      </div>
      <div class="col future-info" style="flex-grow: 3">
        <h4>{{ batch }}</h4>
        <h5>{{ user.division }}</h5>
      </div>
      <div class="col actions-div" style="flex-grow: 1">
        <span @click.stop="edit(user.id)" v-if="accessList.edit">
          <font-awesome-icon icon="edit" class="icon blue" size="lg"></font-awesome-icon>
        </span>
        <span @click.stop="deleteUser(user.id)" v-if="accessList.delete">
          <font-awesome-icon icon="trash-alt" class="icon red" size="lg"></font-awesome-icon>
        </span>
      </div>
    </div>
  </BaseCard>
</template>

<script type="text/javascript" src="./js/user-card.js">
</script>

<style lang="scss" scoped>
  .row {
    display: flex;
    align-items: center;
  }

  .col {
    vertical-align: middle;
    display: inline-block;
    padding: 10px;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 5px;
  }

  .user-card {
    box-shadow: 1px 0 7px rgba(0, 0, 0, 0.25);
    transition: all .2s ease;

    &:hover {
      box-shadow: 1px 0 5px rgba(0,0,0,0.1), 1px 0 7px rgba(0,0,0,0.3);;
    }
  }

  .basic-info {
  width: 50%;
  }

  .future-info {
    float: right;
  }

  .actions-div {
    align-self: center;
    text-align: center;
  }

  .actions-div span{
    padding: 5px;
    transition: all .2s ease;
  }

  .actions-div span:hover {
    opacity: 0.8;
  }

  .actions-div span:active {
    opacity: 0.9;
  }
</style>
