<template>
  <div>
    <div class="button-div" v-if="accessList.add">
      <BaseButton type="submit" buttonClass="button-save" @click="createNewBatch">
        <span><font-awesome-icon icon="plus" class="icon"/> New</span>
      </BaseButton>
    </div>
    <div class="batch-div master" v-if="currentUser.role !== 'STUDENT'">
      <div class="batch">
        <BatchCard :batch="masterCourse" @click.native="goToMasterCourse" :showAction="false"></BatchCard>
      </div>
    </div>
    <h3 class="title" v-if="currentUser.role !== 'STUDENT'">Batches</h3>
    <div v-if="isLoading" class="loading">
      <font-awesome-icon icon="spinner" spin class="icon-loading" size="lg"></font-awesome-icon>
    </div>
    <div v-if="!isLoading" class="batch-div">
      <div class="batch" v-for="batch in batches" :key="batch.id">
        <BatchCard :batch="batch" @click.native="goToCourse(batch.code)"
                   @edit="editBatch" @delete="openDeleteConfirmationModal(batch.id)" :showAction="true">
        </BatchCard>
      </div>
    </div>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="showDeleteConfirmationModal = false"
                               @clickDelete="deleteThisBatch">
      <div slot="description">Are you sure you want to delete this batch?</div>
    </modal-delete-confirmation>
  </div>
</template>

<script type="text/javascript" src="./js/course-batch.js"></script>

<style scoped>
  .batch-div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-right: 15px;
    margin-top: 10px;
  }

  .title {
    text-align: left;
    margin: 20px 0 0 0;
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

  .loading {
    margin-top: 50px;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
