<template>
  <div class="auto-overflow-container">
    <div class="courses__container">
      <div class="courses__container__tabs">
        <b-tabs v-model="activeTab">
          <b-tab-item v-for="tab in tabs" :key="tab.label"
                      :label="tab.label" :visible="tab.visible">
            <div class="courses__container__tabs-actions">
              <div class="columns is-mobile">
                <div class="column is-narrow is-flex" v-if="!isStudent">
                  <b-checkbox v-model="allSelected" :indeterminate="partialSelected"></b-checkbox>
                </div>
                <div class="column">
                  <div class="buttons">
                    <b-button rounded
                              @click="goToAddPage"
                              :loading="switchingTabLoading"
                              v-if="accessList.add && currentTabType === 'master'"
                              icon-left="plus"
                              type="is-primary">
                      Add
                    </b-button>
                    <b-button rounded
                              @click="openShareSelectedCourseModal"
                              :disabled="!selectedIds.length"
                              :loading="switchingTabLoading"
                              v-if="accessList.add && !isStudent"
                              icon-left="copy"
                              type="is-primary">
                      Share<span class="is-hidden-touch"> to batch</span>
                    </b-button>
                    <div class="courses__container__tabs-actions-filter"
                         v-if="currentTabType === 'batch' && batches.length > 1">
                      <b-field label="Batch"
                               label-position="on-border">
                        <b-select placeholder="Select a batch"
                                  v-model="selectedBatchCode"
                                  @input="resetPage"
                                  expanded>
                          <option v-for="batch in batches"
                                  :key="batch.code"
                                  :value="batch.code">
                            {{ batch.name }}
                          </option>
                        </b-select>
                      </b-field>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="courses__container__tabs-content">
              <div class="columns is-mobile" v-for="(course, index) in courses" :key="index">
                <div class="column is-narrow is-flex" v-if="!isStudent">
                  <b-checkbox v-model="selectedIds" :native-value="course.id"></b-checkbox>
                </div>
                <div class="column">
                  <ListItem :minHeight="'75px'" @click="goToDetail(course.id)">
                    <template #title>
                      {{ courseTitleEllipsis(course.title) }}
                    </template>
                    <template #actions>
                      <b-dropdown aria-role="list" position="is-bottom-left" @click.prevent.stop>
                        <button class="button is-text" slot="trigger">
                          <b-icon icon="ellipsis-v" size="is-small" class="icon"></b-icon>
                        </button>
                        <b-dropdown-item
                          aria-role="listitem"
                          @click="goToEditPage(course.id)"
                          v-if="accessList.edit">
                        <span class="icon-wrapper">
                          <b-icon icon="edit" class="icon" size="is-small"></b-icon>
                          Edit
                        </span>
                        </b-dropdown-item>
                        <b-dropdown-item
                          aria-role="listitem"
                          @click="openShareCourseModal(course.id)"
                          v-if="accessList.add && !isStudent">
                        <span class="icon-wrapper">
                          <b-icon icon="copy" class="icon" size="is-small"></b-icon>
                          Share to Batch
                        </span>
                        </b-dropdown-item>
                        <b-dropdown-item
                          aria-role="listitem"
                          @click="openDeleteConfirmationModal(course.id)"
                          v-if="accessList.delete">
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
              <div v-if="!isLoading">
                <div v-if="failFetchData">
                  <EmptyState src="error" :errorState="true"></EmptyState>
                </div>
                <div v-if="!failFetchData">
                  <div v-if="coursesEmpty">
                    <div v-if="showNoBatchAvailableMessage && isAdmin">
                      <EmptyState src="batches">
                        <template #title>
                          Looks like you have not created a batch!
                        </template>
                        <template #message>
                          Create the first batch here
                          <div class="courses__container__tabs-actions-create-batch">
                            <b-button type="is-primary"
                                      @click="goToCreateBatch">
                              Create batch
                            </b-button>
                          </div>
                        </template>
                      </EmptyState>
                    </div>
                    <div v-else>
                      <EmptyState src="courses">
                        <template #title>
                          No courses yet!
                        </template>
                        <template #message>
                          <span v-if="!isStudent && loggedIn">
                            Create master course to share it to batch course!
                          </span>
                          <span v-else>
                            Courses available to you will appear here!
                          </span>
                        </template>
                      </EmptyState>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-tab-item>
        </b-tabs>
        <infinite-loading @infinite="initPage" :identifier="infiniteId">
          <div slot="spinner">
            <ListItem v-for="n in 3" :key="n"
                      :loading="true"
                      :simple="true"
                      :minHeight="'75px'"
            ></ListItem>
          </div>
          <div slot="no-more"></div>
          <div slot="no-results"></div>
        </infinite-loading>
      </div>
      <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                                 @close="showDeleteConfirmationModal = false"
                                 @clickDelete="deleteThis">
        <div slot="description">Are you sure you want to delete this course?</div>
      </modal-delete-confirmation>
      <modal-copy v-if="showShareCourseModal" @close="showShareCourseModal = false" @copy="submitShareCourse"></modal-copy>
    </div>
  </div>
</template>

<script src="./js/courses-revamp.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .courses {
    &__container {
      padding: 0 0.5rem;

      @media (max-width: 1023px) {
        margin-bottom: 3vh;
      }

      &__tabs {
        width: 100%;
        margin-bottom: 1rem;

        &-actions {
          padding: 0.25rem 0;
          margin-bottom: 0.75rem;

          &-filter {
            min-width: 10rem;
            margin-bottom: 0.5rem;
            margin-left: 0.5rem;

            @media (max-width: 1023px) {
              min-width: 5rem;
              margin-left: auto;
            }
          }

          &-create-batch {
            margin-top: 0.5rem;
          }
        }
      }
    }
  }
</style>
