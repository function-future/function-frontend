<template>
  <div class="auto-overflow-container">
    <div class="courses__container">
      <div class="courses__container__tabs">
        <b-tabs v-model="activeTab">
          <b-tab-item v-for="tab in tabs" :key="tab.label"
                      :label="tab.label" :visible="tab.visible">
            <div class="courses__container__tabs-actions">
              <div class="buttons">
                <b-button rounded
                          :loading="switchingTabLoading"
                          v-if="accessList.add && tab.type === 'MASTER'"
                          icon-left="plus"
                          type="is-primary">
                  Add
                </b-button>
                <b-button rounded
                          :loading="switchingTabLoading"
                          v-if="accessList.add"
                          icon-left="copy"
                          type="is-primary">
                  Share
                </b-button>
                <b-field label="Batch"
                         label-position="on-border"
                         v-if="tab.type === 'BATCH'">
                  <b-select placeholder="Select a batch" v-model="selectedBatchCode">
                    <option v-for="batch in batches"
                            :key="batch.code"
                            :value="batch.code">
                      {{ batch.name }}
                    </option>
                  </b-select>
                </b-field>
              </div>
            </div>
            <div class="courses__container__tabs-content">
              <ListItem v-for="(course, index) in courses" :key="index" :minHeight="'75px'">
                <template #title>{{ course.title }}</template>
                <template #info></template>
                <template #content></template>
                <template #actions>
                  <b-dropdown aria-role="list" position="is-bottom-left" @click.prevent.stop>
                    <button class="button is-text" slot="trigger">
                      <b-icon icon="ellipsis-v" size="is-small" class="icon"></b-icon>
                    </button>
                    <b-dropdown-item
                      aria-role="listitem"
                      @click="goToEditCourse(course.id)"
                      v-if="accessList.edit">
                        <span class="icon-wrapper">
                          <b-icon icon="edit" class="icon" size="is-small"></b-icon>
                          Edit
                        </span>
                    </b-dropdown-item>
                    <b-dropdown-item
                      aria-role="listitem"
                      @click="openShareCourseModal(course.id)"
                      v-if="accessList.add">
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
          </b-tab-item>
        </b-tabs>
      </div>
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
        }
      }
    }
  }
</style>
