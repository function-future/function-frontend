<template>
  <div class="auto-overflow-container">
    <div class="users__container">
      <div class="users__container">
        <div class="users__container-tabs">
          <b-tabs v-model="activeTab">
            <b-tab-item v-for="tab in tabs"
                        :key="tab.value"
                        :label="tab.title">
              <div class="users__container-tabs-actions">
                <b-button rounded
                          icon-left="plus"
                          type="is-primary"
                          @click="goToAddUser">
                  {{ currentTab }}
                </b-button>
                <b-field>
                  <b-input placeholder="Search"
                           rounded
                           @input="searchHandler"
                           v-model="keyword">
                  </b-input>
                </b-field>
              </div>
              <div class="users__container-tabs-content">
                <div v-if="isLoading">
                  <div class="columns is-multiline">
                    <div class="column is-6"
                         v-for="n in 6"
                         v-bind:key="n">
                      <UserListItem :loading="isLoading"></UserListItem>
                    </div>
                  </div>
                </div>
                <div class="users__container-tabs-content__list-wrapper" v-else>
                  <div class="columns is-multiline">
                    <div class="column is-6"
                         v-for="user in userList"
                         :key="user.id">
                      <UserListItem :imageUrl="user.avatar">
                        <template #name>
                          {{ user.name }}
                        </template>
                        <template #info>
                          <div>{{ batch(user) }}</div>
                          <div>{{ user.university }}</div>
                        </template>
                        <template #actions>
                          <b-dropdown aria-role="list"
                                      position="is-bottom-left"
                                      @click.prevent.stop>
                            <button class="button is-text" slot="trigger">
                              <b-icon icon="ellipsis-v" size="is-small" class="icon"></b-icon>
                            </button>
                            <b-dropdown-item
                              aria-role="listitem"
                              @click="goToEditUser(user.id, user.role)">
                              <span class="icon-wrapper">
                                <b-icon icon="edit" class="icon" size="is-small"></b-icon>
                                Edit
                              </span>
                            </b-dropdown-item>
                            <b-dropdown-item
                              aria-role="listitem"
                              @click="openDeleteConfirmationModal(user.id)">
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
                      </UserListItem>
                    </div>
                  </div>
                </div>
              </div>
            </b-tab-item>
          </b-tabs>
        </div>
      </div>
      <div class="users__container__pagination-wrapper">
        <b-pagination
          :total="paging.totalRecords"
          :current.sync="paging.currentPage"
          :per-page="paging.size"
          @change="loadPage"
          range-before="1"
          range-after="2"
          order="is-centered">
        </b-pagination>
      </div>
      <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                                 @close="closeDeleteConfirmationModal"
                                 @clickDelete="deleteThisUser">
        <div slot="description">Are you sure you want to delete selected user?</div>
      </modal-delete-confirmation>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/users.js">
</script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .users {
    &__container {
      padding: 0 0.25rem;
      margin-bottom: 10vh;

      &-tabs {
        width: 100%;
        margin-bottom: 1rem;

        &-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-right: 1.5rem;
          margin-bottom: 0.5rem;
        }

        &-content {
          &__list {
            &-wrapper {
              margin-left: 0.25rem;
              margin-right: 0.75rem;

              @media only screen and (max-width: 1023px) {
                margin-right: 0;
              }
            }
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

  /deep/ {
    .default-tabs {
      display: flex;
      float: left;
      position: relative;
    }

    .default-tabs__item {
      display: inline-block;
      margin: 0 5px;
      padding: 10px;
      font-size: 1rem;
      letter-spacing: 1px;
      color: gray;
      text-decoration: none;
      border: none;
      background-color: transparent;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      transition: all 0.25s;

      @media only screen and (max-width: 1023px) {
        padding: 8px;
        margin: 0;
      }
    }

    .default-tabs__item_active {
      color: #505050;
    }

    .default-tabs__item:hover {
      border-bottom: 2px solid #02AAF3;
      color: #505050;
    }

    .default-tabs__item:focus {
      outline: none;
      border-bottom: 2px solid #02AAF3;
      color: #505050;
    }

    .default-tabs__item:first-child {
      margin-left: 0;
    }

    .default-tabs__item:last-child {
      margin-right: 0;
    }

    .default-tabs__active-line {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      background-color: #02AAF3;
      transition: transform 0.4s ease, width 0.4s ease;
    }
  }
</style>
