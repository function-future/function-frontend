<template>
  <div class="scrollable-container">
    <div class="button-div">
      <BaseButton type="submit" buttonClass="button-save" @click="goToAddActivityBlog">
        <span><font-awesome-icon icon="plus" class="icon"/> New</span>
      </BaseButton>
    </div>
    <BaseCard
      v-for="activityBlog in activityBlogs"
      v-bind:key="activityBlog.id"
      @click.native="goToActivityBlogDetail(activityBlog.id)"
      class="blog-card"
      cardClass="card-hover">
      <div class="blog-header blog-title">
        <h3>{{ activityBlog.title }}</h3>
      </div>
      <div class="blog-header float-right">
        <div class="blog-date">
          {{ activityBlog.createdAt | moment("dddd, MMMM Do YYYY") }}
        </div>
        <div class="blog-actions">
          <span @click.stop="goToEditActivityBlog(activityBlog.id)">
            <font-awesome-icon icon="edit" class="icon blue" size="lg"></font-awesome-icon>
          </span>
          <span><font-awesome-icon icon="trash-alt" class="icon red"
                                   size="lg" @click.stop="openDeleteConfirmationModal(activityBlog.id)"></font-awesome-icon></span>
        </div>
      </div>
      <div class="blog-preview">
        <span v-html="compileToMarkdown(activityBlog.description)"></span>
      </div>
    </BaseCard>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="closeDeleteConfirmationModal"
                               @clickDelete="deleteThisActivityBlog">
      <div slot="description">Delete this activity blog?</div>
    </modal-delete-confirmation>
  </div>
</template>

<script type="text/javascript" src="./js/activity-blogs.js">
</script>

<style scoped>
  .blog-card {
    min-height: 175px;
  }

  .blog-header {
    display: inline-block;
  }

  .blog-date {
    padding: 5px 15px 5px 5px;
    display: inline-block;
  }

  .blog-actions {
    display: inline-block;
    padding-left: 15px;
    border-left: 1px solid #BDBDBD;
  }

  .blog-actions span {
    padding: 5px;
    transition: all .2s ease;
  }

  .blog-actions span:hover {
    opacity: 0.8;
  }

  .blog-actions span:active {
    opacity: 0.9;
  }

  .blog-preview {
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
