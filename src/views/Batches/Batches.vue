<template>
  <div class="auto-overflow-container">
    <div class="batches__container">
      <div class="batches__container__actions" v-if="accessList.add">
        <b-button rounded
                  icon-left="plus"
                  type="is-primary"
                  @click="createNewBatch">
          Add
        </b-button>
      </div>
      <div class="batches__container__content-wrapper">
        <div class="columns is-multiline" v-if="isLoading">
          <div class="column is-4"
               v-for="n in 3"
               v-bind:key="n">
            <ListItem :loading="isLoading" :simple="true"></ListItem>
          </div>
        </div>
        <div class="columns is-multiline" v-else>
          <div v-if="!batchesEmpty">
            <div class="column is-4"
                 v-for="batch in batches"
                 v-bind:key="batch.code">
              <ListItem class="no-pointer">
                <template #title>
                  {{ batch.name }}
                </template>
                <template #info>
                  {{ batch.code }}
                </template>
                <template #actions>
                  <b-dropdown aria-role="list" position="is-bottom-left" @click.prevent.stop>
                    <button class="button is-text" slot="trigger">
                      <b-icon icon="ellipsis-v" size="is-small" class="icon"></b-icon>
                    </button>
                    <b-dropdown-item
                      aria-role="listitem"
                      @click="editBatch(batch.id)"
                      v-if="accessList.edit">
                <span class="icon-wrapper">
                  <b-icon icon="edit" class="icon" size="is-small"></b-icon>
                  Edit
                </span>
                    </b-dropdown-item>
                    <b-dropdown-item
                      aria-role="listitem"
                      @click="openDeleteConfirmationModal(batch.id)"
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
          <div v-if="batchesEmpty && !failFetchBatch">
            <EmptyState src="batches">
              <template #title>
                Looks like you have not created a batch!
              </template>
              <template #message>
                Start creating a batch
              </template>
            </EmptyState>
          </div>
          <div v-if="batchesEmpty && failFetchBatch">
            <EmptyState src="error" :errorState="true"></EmptyState>
          </div>
        </div>
      </div>
      <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                                 @close="showDeleteConfirmationModal = false"
                                 @clickDelete="deleteThisBatch">
        <div slot="description">Are you sure you want to delete this batch?</div>
      </modal-delete-confirmation>
    </div>
  </div>
</template>

<script src="./js/batches.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .batches {
    &__container {
      padding: 1rem 1.25rem;
      margin-bottom: 10vh;

      &__actions {
        margin-bottom: 0.75rem;

        @media only screen and (max-width: 1023px) {
          margin-bottom: 0;
          display: flex;
          flex-direction: column;
          position: fixed;
          right: 5vw;
          bottom: 75px;
          transition: all 0.1s ease-in-out;
          border-radius: 50%;

          button {
            margin: 0.25rem 0;
            box-shadow: 2px 2px 16px 4px rgba(0, 0, 0, 0.1);
          }
        }
      }
    }
  }

  .no-pointer {
    cursor: default;
  }
</style>
