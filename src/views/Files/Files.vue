<template>
  <div>
    <div class="button__wrapper">
      <span class="button-back"
            v-if="$route.params.parentId !== 'root'"
            @click="goToPreviousFolder">
        <font-awesome-icon icon="arrow-left" class="icon" size="lg"></font-awesome-icon>
        Previous Folder
      </span>
      <div class="button-div" v-if="accessList.add">
        <BaseButton type="submit" buttonClass="button-save" @click="">
          <span><font-awesome-icon icon="plus" class="icon"/> Add</span>
        </BaseButton>
      </div>
    </div>
    <div>
      <h3 class="title">Folders</h3>
      <div class="loading" v-if="isLoading">
        <font-awesome-icon icon="spinner" spin class="icon-loading" size="lg"></font-awesome-icon>
      </div>
      <div class="file__wrapper" v-if="!isLoading">
        <div class="file" v-for="index in 6" @click="goToFolder">
          <BaseCard cardClass="card-hover" class="file__card">
            <font-awesome-icon icon="folder" class="icon" size="lg"></font-awesome-icon>
            <div class="file__title">Folder (17 chars)...</div>
            <div class="actions" v-if="true">
              <span class="delete-btn" @click="openDeleteConfirmationModal" v-if="accessList.delete">
                <font-awesome-icon icon="trash-alt" class="action-icon red"></font-awesome-icon>
              </span>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
    <div>
      <h3 class="title">Files</h3>
      <div class="loading" v-if="isLoading">
        <font-awesome-icon icon="spinner" spin class="icon-loading" size="lg"></font-awesome-icon>
      </div>
      <div class="file__wrapper" v-if="!isLoading">
        <div class="file" v-for="index in 6" @click="downloadFileFromUrl">
          <BaseCard cardClass="card-hover" class="file__card">
            <font-awesome-icon icon="file" class="icon" size="lg"></font-awesome-icon>
            <div class="file__title">File (17 chars)...</div>
            <div class="actions" v-if="true">
              <span class="delete-btn" @click="openDeleteConfirmationModal(1)" v-if="accessList.delete">
                <font-awesome-icon icon="trash-alt" class="action-icon red"></font-awesome-icon>
              </span>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="showDeleteConfirmationModal = false"
                               @clickDelete="deleteThisFile">
      <div slot="description">Are you sure you want to delete this file?</div>
    </modal-delete-confirmation>
  </div>
</template>

<script type="text/javascript" src="./js/files.js"></script>

<style lang="scss" scoped>
  .button-div {
    margin-right: 30px;
    margin-bottom: 0;
    margin-left: auto;
  }

  .file {
    flex: 0 0 20%;

    @media only screen and (max-width: 1500px) {
      flex: 0 0 25%;
    }

    @media only screen and (max-width: 1200px) {
      flex: 0 0 33%;
    }

    @media only screen and (max-width: 1000px) {
      flex: 0 0 50%;
    }

    &__wrapper {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      margin-right: 15px;
      margin-bottom: 10px;
    }

    &__card {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      box-shadow: none;
      border: 1px solid #828282;
      border-radius: 12px;
      padding: 15px 20px 15px 20px;
      margin: 10px;

      &:hover {
        box-shadow: none;
        opacity: 0.9;
      }
    }

    &__title {
      font-size: 13px;
    }
  }

  .actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: auto;
  }

  .action-icon {
    margin-right: 5px;

    &:hover {
      opacity: 0.8;
    }
  }

  .icon {
    margin-right: 15px;
  }

  .title {
    text-align: left;
    margin: 0;
    padding-left: 15px;
  }

  .file {
  }

  .loading {
    margin-top: 50px;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button {
    &-back {
      cursor: pointer;
      padding: 10px 5px;

      &:hover {
        opacity: 0.9;
      }
    }

    &__wrapper {
      display: flex;
      align-items: center;
      padding-left: 10px;
      margin: 10px 0;
    }
  }
</style>
