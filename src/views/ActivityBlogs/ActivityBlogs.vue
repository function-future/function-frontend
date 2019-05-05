<template>
  <div class="scrollable-container">
    <div class="button-div">
      <BaseButton type="submit" buttonClass="button-save">
        <span><font-awesome-icon icon="plus" class="icon"/> New</span>
      </BaseButton>
    </div>
    <BaseCard
      v-for="activityBlog in activityBlogs"
      v-bind:key="activityBlog.id"
      @click.native="goToActivityBlogDetail(activityBlog.id)"
      class="card"
      cardClass="card-hover">
      <div class="header blog-title">
        <h3>{{ activityBlog.title }}</h3>
      </div>
      <div class="header float-right">
        <div class="date">
          {{ activityBlog.createdAt | moment("dddd, MMMM Do YYYY") }}
        </div>
        <div class="actions">
          <span><font-awesome-icon icon="edit" class="icon blue" size="lg"></font-awesome-icon></span>
          <span><font-awesome-icon icon="trash-alt" class="icon red" size="lg"></font-awesome-icon></span>
        </div>
      </div>
      <div class="preview">
        <span>{{ activityBlog.description }}</span>
      </div>
    </BaseCard>
  </div>
</template>

<script type="text/javascript" src="./js/ActivityBlogs.js">
</script>

<style scoped>
  .card {
    min-height: 175px;
  }

  .header {
    display: inline-block;
  }

  .date {
    padding: 5px 15px 5px 5px;
    display: inline-block;
  }

  .actions {
    display: inline-block;
    padding-left: 15px;
    border-left: 1px solid #BDBDBD;
  }

  .actions span {
    padding: 5px;
    transition: all .2s ease;
  }

  .actions span:hover {
    opacity: 0.8;
  }

  .actions span:active {
    opacity: 0.9;
  }

  .preview {
    text-align: justify;
  }

  h3 {
    margin: 5px 0 15px 0;
    text-align: left;
  }

  .button-div {
    text-align: right;
    margin-right: 20px;
  }

  .button-save {
    width: 150px;
  }

  .float-right {
    float: right;
  }
</style>
