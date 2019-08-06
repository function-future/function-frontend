<template>
  <div>
    <div class="button-div">
      <BaseButton type="submit" buttonClass="button-save" @click="createNewBatch" v-if="accessList.add">
        <span><font-awesome-icon icon="plus" class="icon"/> New</span>
      </BaseButton>
    </div>
    <h3 class="title">Batches</h3>
    <div class="batch-div">
      <div class="batch" v-for="batch in batches" :key="batch.id">
        <BatchCard :batch="batch" @click.native="goToAssignmentList(batch.code)"
                   @edit="editBatch" @delete="openDeleteConfirmationModal(batch.id)" :showAction="accessList.delete"></BatchCard>
      </div>
    </div>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="showDeleteConfirmationModal = false"
                               @clickDelete="deleteThisBatch">
      <div slot="description">Are you sure you want to delete this batch?</div>
    </modal-delete-confirmation>
  </div>
</template>

<script type="text/javascript" src="./js/assignment-batch.js"></script>

<style scoped>
  .batch-div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-right: 15px;
  }

  .title {
    text-align: left;
    margin: 20px 0 5px 0;
    padding-left: 15px;
  }

  .master {
    margin-bottom: 15px;
  }

  .batch {
    flex: 0 0 50%;
  }

  @media only screen and (min-width: 1050px) {
    .batch {
      flex: 0 0 33%;
    }
  }

  .button-div {
    text-align: right;
    margin-right: 30px;
    margin-bottom: 0;
  }
</style>
