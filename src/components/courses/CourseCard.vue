<template>
  <BaseCard cardClass="card-hover">
    <div class="row">
      <div class="col basic-info" style="flex-grow: 2">
        <h3>{{ title }}</h3>
      </div>
      <div class="col actions-div" style="flex-grow: 1">
        <span @click.stop="copy(course.id)" class="copy" v-if="accessList.add">
          <font-awesome-icon icon="copy" class="icon" size="lg"></font-awesome-icon> Copy Course
        </span>
        <span @click.stop="edit(course.id)" v-if="accessList.edit">
          <font-awesome-icon icon="edit" class="icon blue" size="lg"></font-awesome-icon>
        </span>
        <span @click.stop="deleteCourse(course.id)" v-if="accessList.delete">
          <font-awesome-icon icon="trash-alt" class="icon red" size="lg"></font-awesome-icon>
        </span>
      </div>
    </div>
  </BaseCard>
</template>

<script type="text/javascript" src="./js/course-card.js">
</script>

<style scoped>
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

  .icon {
    margin-right: 5px;
  }

  .copy {
    color: white;
    font-size: 13px;
    background-color: #02AAF3;
    border-radius: 50px;
    padding: 7px 20px !important;
    margin-right: 15px;
  }
</style>
