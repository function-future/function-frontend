<template>
  <div class="course-batch__container">
    <div class="course-batch__container__actions"></div>
    <div class="course-batch__container__content">
      <div class="course-batch__container__content-title has-text-weight-bold">
        Master Course
      </div>
      <div class="course-batch__container__content-content">
        <div class="columns is-multiline">
          <div class="column is-4">
            <ListItem v-if="isLoading" :loading="isLoading" :simple="true"></ListItem>
            <ListItem v-if="!isLoading">
              <template #title>Master Course</template>
              <template #content>Create master course from here</template>
            </ListItem>
          </div>
        </div>
      </div>
    </div>
    <div class="course-batch__container__content">
      <div class="course-batch__container__content-title has-text-weight-bold">
        Batches
      </div>
      <div class="course-batch__container__content-content">
        <div class="columns is-multiline" v-if="isLoading">
          <div class="column is-4" v-for="n in 4" v-bind:key="n">
            <ListItem :loading="isLoading" :simple="true"></ListItem>
          </div>
        </div>
        <div class="columns is-multiline">
          <div class="column is-4"></div>
        </div>
      </div>
    </div>
  </div>
  <!--<div>-->
    <!--<div class="button-div" v-if="accessList.add">-->
      <!--<BaseButton type="submit" buttonClass="button-save" @click="createNewBatch" class="new-batch-button">-->
        <!--<span><font-awesome-icon icon="plus" class="icon"/> New Batch</span>-->
      <!--</BaseButton>-->
    <!--</div>-->
    <!--<div class="batch-div master" v-if="currentUser.role !== 'STUDENT'">-->
      <!--<div class="batch">-->
        <!--<BatchCard :batch="masterCourse" @click.native="goToMasterCourse" :showAction="false"></BatchCard>-->
      <!--</div>-->
    <!--</div>-->
    <!--<h3 class="title" v-if="currentUser.role !== 'STUDENT'">Batches</h3>-->
    <!--<div v-if="isLoading" class="loading">-->
      <!--<font-awesome-icon icon="spinner" spin class="icon-loading" size="lg"></font-awesome-icon>-->
    <!--</div>-->
    <!--<div v-if="!isLoading" class="batch-div">-->
      <!--<div class="batch" v-for="batch in batches" :key="batch.id">-->
        <!--<BatchCard :batch="batch" @click.native="goToCourse(batch.code)"-->
                   <!--@edit="editBatch" @delete="openDeleteConfirmationModal(batch.id)" :showAction="true">-->
        <!--</BatchCard>-->
      <!--</div>-->
    <!--</div>-->
    <!--<modal-delete-confirmation v-if="showDeleteConfirmationModal"-->
                               <!--@close="showDeleteConfirmationModal = false"-->
                               <!--@clickDelete="deleteThisBatch">-->
      <!--<div slot="description">Are you sure you want to delete this batch?</div>-->
    <!--</modal-delete-confirmation>-->
  <!--</div>-->
</template>

<script type="text/javascript" src="./js/course-batch.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .course-batch {
    &__container {
      padding: 1rem 1.25rem;
      margin-bottom: 10vh;

      &__actions {
        z-index: 5;

        @media only screen and (max-width: 1023px) {
          position: fixed;
          right: 5vw;
          bottom: 75px;
          transition: all 0.1s ease-in-out;
          box-shadow: 2px 2px 16px 4px rgba(0, 0, 0, 0.2);
          border-radius: 50%;
        }
      }

      &__content {
        &-title {
          margin-bottom: 0.5rem;
        }

        &-content {}
      }
    }
  }

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

  .new-batch-button {
    width: auto;
    font-size: 1rem;
    padding: 10px 20px;
  }
</style>
