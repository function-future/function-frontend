<template>
  <div class="scrollable-container">
    <BaseCard class="card" cardClass="card-hover no-pointer">
      <div class="header">
        <h3>{{ activityBlog.title }}</h3>
      </div>
      <div class="header float-right">
        <div class="date">
          {{ activityBlog.createdAt | moment("dddd, MMMM Do YYYY") }}
        </div>
        <div class="action">
          <span @click="goToEditActivityBlog" v-if="accessList.edit && (currentUser.id === activityBlog.author.id)">
            <font-awesome-icon icon="edit" class="icon blue" size="lg"></font-awesome-icon>
          </span>
          <span @click="openDeleteConfirmationModal" v-if="accessList.delete && (currentUser.id === activityBlog.author.id)">
            <font-awesome-icon icon="trash-alt" class="icon red" size="lg"></font-awesome-icon>
          </span>
        </div>
      </div>
      <div class="preview">
        <span v-html="descriptionCompiledMarkdown"></span>
      </div>
    </BaseCard>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="showDeleteConfirmationModal = false"
                               @clickDelete="deleteThisActivityBlog">
      <div slot="description">Are you sure you want to delete this activity blog?</div>
    </modal-delete-confirmation>
  </div>
</template>

<script type="text/javascript" src="./js/activity-blog-detail.js">
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

  /deep/ img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-height: 300px;
  }
</style>
