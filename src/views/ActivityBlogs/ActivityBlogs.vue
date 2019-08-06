<template>
  <div class="scrollable-container">
    <div class="button-div" v-if="accessList.add">
      <div class="user-name" v-if="activityBlogs.length && userId">
        <span class="back-arrow" @click="goToActivityBlogs">
          <font-awesome-icon icon="arrow-left" class="icon" size="lg"/>
        </span>
        Activity blogs by <span>{{ activityBlogs[0].author.name }}</span>
      </div>
      <BaseButton type="submit" buttonClass="button-save" @click="goToAddActivityBlog">
        <span><font-awesome-icon icon="plus" class="icon"/> New</span>
      </BaseButton>
    </div>
    <div v-if="isLoading" class="loading">
      <font-awesome-icon icon="spinner" spin class="icon-loading" size="lg"></font-awesome-icon>
    </div>
    <div v-if="!isLoading">
      <BaseCard v-for="activityBlog in activityBlogs"
                v-bind:key="activityBlog.id"
                @click.native="goToActivityBlogDetail(activityBlog.id)"
                class="blog-card"
                cardClass="card-hover">
        <div class="blog-header">
          <h3 class="blog-title">{{ activityBlog.title }}</h3>
          <div class="blog-author">by <span @click.stop="goToUserBlog(activityBlog.author.id)">{{ activityBlog.author.name }}</span></div>
        </div>
        <div class="blog-header float-right">
          <div class="blog-date">
            {{ activityBlog.updatedAt | moment("dddd, MMMM Do YYYY") }}
          </div>
          <div class="blog-actions">
          <span @click.stop="goToEditActivityBlog(activityBlog.id)"
                v-if="accessList.edit && (currentUser.id === activityBlog.author.id || currentUser.role === 'ADMIN')">
            <font-awesome-icon icon="edit" class="icon blue" size="lg"></font-awesome-icon>
          </span>
            <span @click.stop="openDeleteConfirmationModal(activityBlog.id)"
                  v-if="accessList.delete && (currentUser.id === activityBlog.author.id || currentUser.role === 'ADMIN')">
            <font-awesome-icon icon="trash-alt" class="icon red" size="lg"></font-awesome-icon>
          </span>
          </div>
        </div>
        <div class="blog-preview wrap-word">
          <span v-html="compileToMarkdown(activityBlog.description)"></span>
        </div>
      </BaseCard>
    </div>
    <BasePagination :paging="paging"
                    @loadPage="loadPage"
                    @previousPage="loadPreviousPage"
                    @nextPage="loadNextPage">
    </BasePagination>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="closeDeleteConfirmationModal"
                               @clickDelete="deleteThisActivityBlog">
      <div slot="description">Delete this activity blog?</div>
    </modal-delete-confirmation>
  </div>
</template>

<script type="text/javascript" src="./js/activity-blogs.js">
</script>

<style lang="scss" scoped>
  /deep/ p {
    margin-block-start: 0.5rem;
    margin-block-end: 0.5rem;
  }
  .blog-card {
    min-height: 175px;
  }

  .blog-header {
    display: inline-block;
  }

  .blog-title {
    margin-bottom: 5px;
  }

  .blog-author {
    font-size: 0.9rem;
    padding-left: 7px;
    border-left: 1px solid #BDBDBD;

    span {
      font-weight: bold;
    }
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
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 0 20px 15px 15px;
  }

  .button-save {
    width: 150px;
  }

  .float-right {
    float: right;
  }

  .loading {
    margin-top: 50px;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-name {
    margin: 5px auto 5px 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 0.9rem;

    span {
      padding-left: 5px;
      font-weight: bold;
    }
  }

  .back-arrow {
    cursor: pointer;
    padding-right: 10px;
    border-right: 1px solid #BDBDBD;
    margin-right: 10px;

    &:hover {
      opacity: 0.9;
    }
  }
</style>
