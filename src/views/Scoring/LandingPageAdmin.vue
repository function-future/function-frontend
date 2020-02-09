<template>
  <div class="auto-overflow-container scoring__container">
    <section>
      <b-tabs class="scoring__header-tabs" v-model="selectedTab">
        <b-tab-item v-for="tab in tabs"
                    :key="tab.title"
                    :label="tab.title"
                    :visible="tab.visible"
                    :disabled="isLoading">
          <div class="scoring__header">
            <div class="columns is-multiline is-mobile">
              <div class="column is-narrow" v-if="accessList.create">
                <b-button rounded
                          @click="addItem"
                          icon-left="plus"
                          type="is-primary"
                          :loading="switchingTabLoading">
                  Add
                </b-button>
              </div>
              <div class="column is-3-desktop is-8-touch scoring__container__tabs-actions-filter"
                   v-if="visibleBatchSelection && !switchingTabLoading">
                <b-field label="Batch"
                         label-position="on-border">
                  <b-select placeholder="Select a batch"
                            v-model="batchCode"
                            expanded>
                    <option v-for="batch in batches"
                            :key="batch.code"
                            :value="batch.code">
                      {{ batch.name }}
                    </option>
                  </b-select>
                </b-field>
              </div>
              <div class="column is-7-desktop is-12-mobile scoring__container__tabs-actions-deadline" v-if="currentTabType !== 'questionBanks' && !switchingTabLoading">
                <b-checkbox v-model="isPassedDeadline">
                  View past {{ !!tabTitle && tabTitle.toLowerCase() }}
                </b-checkbox>
              </div>
            </div>
          </div>
          <div class="scoring-content">
            <div v-if="!isLoading || !listEmpty">
              <ListItem v-for="item in items"
                        v-bind:key="item.id"
                        @click="goToItemDetail(item.id)">
                <template #title>
                  {{item.title}}
                </template>
                <template #content>
                  <div class="wrap-word ellipsis">
                    <span v-html="textPreview(item.description)"></span>
                  </div>
                </template>
                <template #actions>
                  <b-dropdown v-if="accessList.create || accessList.edit" aria-role="list"
                              position="is-bottom-left"
                              @click.prevent.stop>
                    <button class="button is-text" slot="trigger">
                      <b-icon icon="ellipsis-v" size="is-small" class="icon"></b-icon>
                    </button>
                    <b-dropdown-item aria-role="listitem"
                                     @click="goToEditItem(item.id)"
                                     v-if="accessList.edit">
                      <span class="icon-wrapper">
                        <b-icon icon="edit" class="icon" size="is-small"></b-icon>
                        Edit
                      </span>
                    </b-dropdown-item>
                    <b-dropdown-item aria-role="listitem"
                                     @click="showCopyModal(item.id)"
                                     v-if="accessList.create && (currentTabType !== 'questionBanks')">
                      <span class="icon-wrapper">
                        <b-icon icon="copy" class="icon" size="is-small"></b-icon>
                        Copy
                      </span>
                    </b-dropdown-item>
                    <b-dropdown-item
                      aria-role="listitem"
                      @click="openDeleteConfirmationModal(item.id)"
                      v-if="accessList.delete">
              <span class="icon-wrapper">
                <b-icon icon="trash-alt" class="icon" size="is-small"></b-icon>
                Delete
              </span>
                    </b-dropdown-item>
                  </b-dropdown>
                </template>
              </ListItem>
            </div>
            <div v-if="!isLoading && listEmpty">
              <div v-if="listEmpty && !failLoadItem">
                <EmptyState :src="emptyStateSrc">
                  <template #title>
                    Looks like there is no {{ !!tabTitle && tabTitle.toLowerCase() }}!
                  </template>
                </EmptyState>
              </div>
              <div v-if="listEmpty && failLoadItem">
                <EmptyState src="error" :errorState="true"></EmptyState>
              </div>
            </div>
          </div>
        </b-tab-item>
      </b-tabs>
      <infinite-loading :identifier="infiniteId"
                        @infinite="getListData"
                        v-if="currentTabType">
        <div slot="spinner">
          <ListItem v-for="n in 5" v-bind:key="n" :loading="isLoading" :distance="100"></ListItem>
        </div>
        <div slot="no-more"></div>
        <div slot="no-results"></div>
      </infinite-loading>
    </section>
    <modal-delete-confirmation v-if="isVisibleDeleteModal"
                               @close="closeDeleteConfirmationModal"
                               @clickDelete="deleteItem">
      <div slot="description">Delete this {{ !!tabTitle && tabTitle.toLowerCase() }}?</div>
    </modal-delete-confirmation>
    <modal-copy v-if="isVisibleCopyModal"
                @close="isVisibleCopyModal = false"
                @copy="copyItem"
                :currentBatch="batchCode">
    </modal-copy>
  </div>
</template>

<script type="text/javascript" src="./js/landing-page-admin.js">

</script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .scoring {
    &__header {
      margin-bottom: 1rem;
    }


    &__container {
      padding: 0.4rem 1.25rem;
      height: 85vh;
      @media only screen and (max-width: 1023px) {
        margin-bottom: 10vh;
      }

      &__tabs {
        @media only screen and (min-width: 1023px) {
          min-height: 10vh;
        }

        &-actions {
          &-deadline {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }

  .add-button {
    @media only screen and (max-width: 1023px) {
      position: fixed;
      right: 5vw;
      bottom: 75px;
      transition: all 0.1s ease-in-out;
      box-shadow: 2px 2px 16px 4px rgba(0, 0, 0, 0.2);
      border-radius: 50%;
    }
  }

  .b-tabs, .tabs {
    margin-bottom: 0!important;
  }

  .tab-item {
    margin-bottom: 0!important;
  }

  .column {
    padding-bottom: var(--columnGap);
  }
</style>
