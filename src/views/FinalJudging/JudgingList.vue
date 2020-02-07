<template>
  <div class="auto-overflow-container">
    <div class="judging-container">
      <div class="judging__action level">
        <div>
          <b-button style="margin-right: 8px" rounded
                    icon-left="plus"
                    type="is-primary"
                    @click="addJudging"
                    class="judging__action-add"
                    v-if="accessList.add">
            Add
          </b-button>
          <b-button style="margin-right: 8px" rounded
                    icon-left="eye"
                    type="is-primary"
                    @click="goToReportPage"
                    class="judging__action-view">
            View
          </b-button>
        </div>
        <div>
          <b-field label="Batch"
                   :label-position="'on-border'" class="judging__action-batch">
            <b-select v-model="selectedBatch">
              <option v-for="batch in batches" :key="batch.id" :value="batch.code">{{batch.name}}</option>
            </b-select>
          </b-field>
        </div>
      </div>
      <div v-if="isLoading">
        <ListItem v-for="n in 4" v-bind:key="n" :loading="isLoading"></ListItem>
      </div>
      <div v-if="!isLoading && !judgingEmpty">
        <ListItem v-for="judging in judgingList" v-bind:key="judging.id" @click="goToJudgingDetail(judging.id)">
          <template #title>
            {{judging.name}}
          </template>
          <template #content>
            <div class="wrap-word ellipsis">
              <span v-html="judging.description"></span>
            </div>
          </template>
          <template #actions>
            <b-dropdown aria-role="list" position="is-bottom-left" @click.prevent.stop v-if="accessList.edit || accessList.delete">
              <button class="button is-text" slot="trigger">
                <b-icon icon="ellipsis-v" size="is-small" class="icon"></b-icon>
              </button>
              <b-dropdown-item
                aria-role="listitem"
                @click="goToEditJudging(judging.id)"
                v-if="accessList.edit">
              <span class="icon-wrapper">
                <b-icon icon="edit" class="icon" size="is-small"></b-icon>
                Edit
              </span>
              </b-dropdown-item>
              <b-dropdown-item
                aria-role="listitem"
                @click="openDeleteConfirmationModal(judging.id)"
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
      <div v-if="!isLoading">
        <div v-if="judgingEmpty && !failLoadJudging">
          <EmptyState src="final-judging">
            <template #title>
              Looks like there is no judging session!
            </template>
          </EmptyState>
        </div>
        <div v-if="judgingEmpty && failLoadJudging">
          <EmptyState src="error" :errorState="true"></EmptyState>
        </div>
      </div>
      <div class="judging__pagination-wrapper">
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
                                 @clickDelete="deleteThisJudging">
        <div slot="description">Are you sure you want to delete this judging session?</div>
      </modal-delete-confirmation>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/judging-list.js">
</script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .judging {
    &-container {
      padding: 1rem 1.25rem;
      margin-bottom: 10vh;
    }
    &__action {
      @media only screen and (max-width: 1023px) {
        display: flex;
        justify-content: space-around;
      }
      &-view {
        @media only screen and (max-width: 1023px) {
          width: 60vw;
          border-radius: 4px!important;
        }
      }
      &-add{
        @media only screen and (max-width: 1023px) {
          position: fixed;
          right: 5vw;
          bottom: 75px;
          transition: all 0.1s ease-in-out;
          box-shadow: 2px 2px 16px 4px rgba(0, 0, 0, 0.2);
          border-radius: 50%;
          z-index: 5;
        }
      }
    }
    &__pagination {
      &-wrapper {
        margin: 1rem 0.5rem;
      }
    }
  }
</style>
