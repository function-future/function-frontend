<template>
  <div class="auto-overflow-container">
    <div class="activity-blog__container">
      <div class="activity-blog__container__actions">
        <div class="activity-blog__container__actions-user-blog"
             v-if="activityBlogs.length && userId">
          <span class="activity-blog__container__actions-user-blog-back"
                @click="goToActivityBlogs">
            <b-icon icon="arrow-left" class="icon"></b-icon>
          </span>
          <span>
            Activity blogs by
            <span class="has-text-weight-bold">
              {{ activityBlogs[0].author.name }}
            </span>
          </span>
        </div>
        <div class="activity-blog__container__actions-button" v-if="accessList.add">
          <b-button rounded
                    icon-left="plus"
                    type="is-primary"
                    @click="goToAddActivityBlog">
            Add
          </b-button>
        </div>
      </div>
      <div class="activity-blog__container-content">
        <div v-if="isLoading">
          <ListItem v-for="n in 4" v-bind:key="n" :loading="isLoading"></ListItem>
        </div>
        <div v-if="!isLoading">
          <ListItem @click="goToActivityBlogDetail(activityBlog.id)"
                    v-for="activityBlog in activityBlogs"
                    v-bind:key="activityBlog.id">
            <template #title>
              {{ activityBlog.title }}
            </template>
            <template #info>
              <div>
                by
                <span class="activity-blog__container-content-link"
                      @click.stop="goToUserBlog(activityBlog.author.id)">
                  {{ activityBlog.author.name }}
                </span>
              </div>
              <div>{{ activityBlog.updatedAt | moment("dddd, MMMM Do YYYY") }}</div>
            </template>
            <template #content>
              <div class="wrap-word ellipsis">
                <span class="content" v-html="compileToMarkdown(activityBlog.description)"></span>
              </div>
            </template>
            <template #actions>
              <b-dropdown aria-role="list"
                          position="is-bottom-left"
                          v-if="(accessList.edit || accessList.delete) &&
                          (currentUser.id === activityBlog.author.id || currentUser.role === 'ADMIN')"
                          @click.prevent.stop>
                <button class="button is-text" slot="trigger">
                  <b-icon icon="ellipsis-v" size="is-small" class="icon"></b-icon>
                </button>
                <b-dropdown-item
                  aria-role="listitem"
                  @click="goToEditActivityBlog(activityBlog.id)"
                  v-if="accessList.edit && (currentUser.id === activityBlog.author.id || currentUser.role === 'ADMIN')">
                <span class="icon-wrapper">
                  <b-icon icon="edit" class="icon" size="is-small"></b-icon>
                  Edit
                </span>
                </b-dropdown-item>
                <b-dropdown-item
                  aria-role="listitem"
                  @click="openDeleteConfirmationModal(activityBlog.id)"
                  v-if="accessList.delete && (currentUser.id === activityBlog.author.id || currentUser.role === 'ADMIN')">
                <span class="icon-wrapper">
                  <b-icon icon="trash-alt" class="icon" size="is-small"></b-icon>
                  Delete
                </span>
                </b-dropdown-item>
                <b-dropdown-item
                  aria-role="listitem"
                  class="is-hidden-desktop">
                  <b-button type="is-light" expanded>Cancel</b-button>
                </b-dropdown-item>
              </b-dropdown>
            </template>
          </ListItem>
        </div>
      </div>
      <div class="activity-blog__container__pagination-wrapper" v-if="!isLoading && activityBlogs.length">
        <b-pagination
          :total="paging.totalRecords"
          :current.sync="paging.page"
          :per-page="paging.size"
          @change="loadPage"
          range-before="1"
          range-after="2"
          order="is-centered">
        </b-pagination>
      </div>
    </div>
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
  @import "@/assets/css/main.scss";

  .activity-blog {
    &__container {
      padding: 1rem 1.25rem;
      margin-bottom: 10vh;

      &__actions {
        display: flex;
        align-items: center;
        z-index: 5;

        &-button {
          @media only screen and (max-width: 1023px) {
            position: fixed;
            right: 5vw;
            bottom: 75px;
            transition: all 0.1s ease-in-out;
            box-shadow: 2px 2px 16px 4px rgba(0, 0, 0, 0.2);
            border-radius: 50%;
          }
        }

        &-user-blog {
          margin: 0.5rem 1rem 0.5rem 0.5rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 1rem;

          span {
            padding-left: 0.25rem;
            font-weight: bold;
          }

          &-back {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding-right: 0.25rem;
            border-right: 1px solid #BDBDBD;
            margin-right: 0.5rem;

            &:hover {
              opacity: 0.9;
            }
          }
        }
      }

      &-content {
        margin-top: 0.5rem;

        &-link {
          cursor: pointer;
          font-weight: bold;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      &__pagination {
        &-wrapper {
          margin: 1rem 0.5rem;
        }
      }
    }
  }

  /deep/ p {
    margin-block-start: 0.5rem;
    margin-block-end: 0.5rem;
  }
</style>
