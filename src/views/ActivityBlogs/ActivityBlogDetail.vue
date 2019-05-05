<template>
  <div class="scrollable-container">
    <BaseCard class="card" cardClass="card-hover">
      <div class="header">
        <h3>{{ activityBlog.title }}</h3>
      </div>
      <div class="header float-right">
        <div class="date">
          {{ activityBlog.createdAt | moment("dddd, MMMM Do YYYY") }}
        </div>
        <div class="action">
          <span><font-awesome-icon icon="edit" class="icon blue" size="lg"></font-awesome-icon></span>
        </div>
      </div>
      <div class="preview">
        <span>{{ activityBlog.description }}</span>
      </div>
    </BaseCard>
  </div>
</template>

<script type="text/javascript" src="./js/ActivityBlogDetail.js">
</script>

<style scoped>
  .card {
    min-height: 80vh;
  }

  .header {
    display: inline-block;
  }

  .date {
    padding: 5px 15px 5px 5px;
    display: inline-block;
  }

  .float-right {
    float: right;
  }

  .preview {
    text-align: justify;
  }

  .action {
    border-left: 1px solid #BDBDBD;
    padding-left: 15px;
    display: inline-block;
  }

  .action span {
    padding: 5px;
    transition: all .2s ease;
  }

  .action span:hover {
    opacity: 0.8;
  }

  .action span:active {
    opacity: 0.9;
  }

  h3 {
    margin: 5px 0 15px 0;
    text-align: left;
  }
</style>
