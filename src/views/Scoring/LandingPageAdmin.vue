<template>
  <div class="auto-overflow-container scoring-container">
    <section class="scoring-header level">
      <b-tabs class="block level-left" v-model="selectedTab">
        <b-tab-item class="level-item" label="Question Banks" icon="database"></b-tab-item>
        <b-tab-item class="level-item" label="Quizzes" icon="laptop-code"></b-tab-item>
        <b-tab-item class="level-item" label="Assignments" icon="chalkboard-teacher"></b-tab-item>
      </b-tabs>
      <button class="block button is-primary level-right"
              slot="trigger"
              v-show="selectedTab!==0"
              @click="isVisibleBatchModal=!isVisibleBatchModal">
        <span>{{batchButtonText}}</span>
        <b-icon icon="menu-down"></b-icon>
      </button>
    </section>
    <section class="auto-overflow-container scoring-content">
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
          <b-dropdown aria-role="list" position="is-bottom-left" @click.prevent.stop>
            <button class="button is-text" slot="trigger">
              <b-icon icon="ellipsis-v" size="is-small" class="icon"></b-icon>
            </button>
            <b-dropdown-item
              aria-role="listitem"
              @click="goToEditItem(item.id)"
              v-if="accessList.edit">
              <span class="icon-wrapper">
                <b-icon icon="edit" class="icon" size="is-small"></b-icon>
                Edit
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
      <infinite-loading :identifier="infiniteId"
                        @infinite="getListData"
                        spinner="spiral"
                        force-use-infinite-wrapper=".auto-overflow-container">
        <div slot="no-more"></div>
        <div slot="no-results"></div>
      </infinite-loading>
    </section>
    <modal-select-batch v-if="isVisibleBatchModal" @close="closeModal"
                        @select="selectBatch">
    </modal-select-batch>
    <modal-delete-confirmation v-if="isVisibleDeleteModal"
                               @close="closeDeleteConfirmationModal"
                               @clickDelete="deleteItem">
      <div slot="description">Delete this announcement ?</div>
    </modal-delete-confirmation>
  </div>
</template>

<script type="text/javascript" src="./js/landing-page-admin.js">

</script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .scoring {
    &-container {
      padding: 1rem 2.5rem;
      height: 85vh;
    }

    &-header {
      position: sticky;
      top: 0;
      background-color: #ffffff;
      z-index: 1;
      margin-bottom: 0 !important;
    }

    &-content {
      height: 70vh;
    }
  }
</style>
