<template>
  <div class="auto-overflow-container">
    <div class="users__container">
      <div class="users__container__tabs">
        <b-tabs v-model="activeTab">
          <b-tab-item v-for="tab in tabs"
                      :key="tab.value"
                      :label="tab.title">
            <div class="users__container__tabs-actions">
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
            <div class="users__container__tabs-content">
              <div v-if="isLoading">
                <div class="columns is-multiline">
                  <div class="column is-12"
                       v-for="n in 3"
                       v-bind:key="n">
                    <UserListItem :loading="isLoading"></UserListItem>
                  </div>
                </div>
              </div>
              <div class="users__container__tabs-content__list-wrapper"
                   v-if="!isLoading">
                <div v-if="!usersEmpty">
                  <div class="columns is-multiline">
                    <div class="column is-12"
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
                <div v-if="usersEmpty && !failFetchUser">
                  <EmptyState src="users">
                    <template #title>
                      Looks so empty!
                    </template>
                    <template #message>
                      Start adding new user
                    </template>
                  </EmptyState>
                </div>
                <div v-if="usersEmpty && failFetchUser">
                  <EmptyState src="error" :errorState="true"></EmptyState>
                </div>
              </div>
            </div>
          </b-tab-item>
        </b-tabs>
      </div>
      <div class="users__container__pagination-wrapper" v-if="!isLoading && !usersEmpty">
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
      padding: 0 0.5rem;
      margin-bottom: 10vh;

      &__tabs {
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
</style>
