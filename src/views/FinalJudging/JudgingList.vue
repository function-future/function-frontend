<template>
  <div class="auto-overflow-container">
    <div class="judging-container">
      <div class="judging-action level">
        <div class="level-left">

          <b-button style="margin-right: 8px" rounded
                    icon-left="plus"
                    type="is-primary"
                    @click="addJudging">
            Add
          </b-button>
          <b-button style="margin-right: 8px" rounded
                    icon-left="eye"
                    type="is-primary"
                    @click="goToReportPage">
            View
          </b-button>
        </div>
        <div class="level-right">
          <b-field label="Batch"
                   :label-position="'on-border'">
            <b-select v-model="selectedBatch">
              <option v-for="batch in batches" :key="batch.id" :value="batch.code">{{batch.name}}</option>
            </b-select>
          </b-field>
        </div>
      </div>
      <ListItem v-for="judging in judgingList" v-bind:key="judging.id" @click="goToJudgingDetail(judging.id)">
        <template #title>
          {{judging.name}}
        </template>
        <template #content>
          <div class="wrap-word ellipsis">
            <span>{{judging.description}}</span>
          </div>
        </template>
        <template #actions>
          <b-dropdown aria-role="list" position="is-bottom-left" @click.prevent.stop>
            <button class="button is-text" slot="trigger">
              <b-icon icon="ellipsis-v" size="is-small" class="icon"></b-icon>
            </button>
            <b-dropdown-item
              aria-role="listitem"
              @click="goToJudgingDetail(judging.id)"
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
  .judging {
    &-container {
      padding: 1rem 1.25rem;
      margin-bottom: 10vh;
    }
    &__pagination {
      &-wrapper {
        margin: 1rem 0.5rem;
      }
    }
  }
  .add-btn {
    justify-self: flex-end;
    margin-left: auto;
  }

  .report-btn {
    justify-self: flex-start;
    margin-left: 15px;
  }
</style>
