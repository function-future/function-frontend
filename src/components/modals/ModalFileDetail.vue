<template>
  <div class="modal__mask">
    <div class="modal__wrapper">
      <div class="modal__container">
        <div class="modal__header">
          <h3 class="modal__header__title">{{ fileDetail.name }}</h3>
          <span class="modal__close" @click="close">
            <font-awesome-icon icon="times" class="icon" size="lg"></font-awesome-icon>
          </span>
        </div>
        <div class="modal__body loading" v-if="isLoading">
          <font-awesome-icon icon="spinner" spin class="icon-loading" size="lg"></font-awesome-icon>
        </div>
        <div class="modal__body" v-if="!isLoading">
          <BaseCard  class="file__wrapper">
            <div class="details">
              <div class="details__title">Uploaded by</div>
              <div class="details__name">{{ fileDetail.author.name }}</div>
            </div>
            <div class="file__header">
              <a class="disable-selection action-button" :href="fileDetail.file" target="_blank">
                <font-awesome-icon icon="download" class="icon"></font-awesome-icon>Download
              </a>
              <div v-if="accessList.edit && ((currentUser.id === fileDetail.author.id) || currentUser.role === 'ADMIN')">
                <label class="disable-selection action-button" v-if="!isUploading">
                  <input type="file" @change="onFileChange($event)" v-if="!isUploading">
                  <font-awesome-icon icon="edit" class="icon blue"></font-awesome-icon>Update File
                </label>
                <div class="file__progress-wrapper" v-if="isUploading">
                  <div class="file__progress-text">Uploading...</div>
                  <div class="file__progress-background">
                    <div class="file__progress-inner" :style="{ width: uploadProgress + '%' }"></div>
                  </div>
                </div>
                <div class="disable-selection action-button" @click="openRenameFileFolderModal(fileDetail.name)">
                  <font-awesome-icon icon="edit" class="icon blue"></font-awesome-icon>Rename
                </div>
              </div>
            </div>
          </BaseCard>
          <BaseCard  class="version__wrapper">
            <div class="title">File Version</div>
            <div class="version__scrollable">
              <div class="version__card disable-selection" v-for="(value, name) in fileDetail.versions" :key="name">
                <div class="version__card-number">{{ name }}</div>
                <div class="version__card-detail">
                  <div class="version__card-date">{{ value.timestamp | moment("MMMM Do, YYYY") }}</div>
                  <a class="version__card-download" :href="value.url" target="_blank">
                    <font-awesome-icon icon="download" class="icon-download"></font-awesome-icon>
                    Download
                  </a>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
    <modal-rename-file-folder v-if="showRenameFileFolderModal"
                              :currentTitle="fileDetail.name"
                              @close="closeRenameFileFolderModal"
                              @submit="renameFileFolderFromModal">
    </modal-rename-file-folder>
  </div>
</template>

<script src="./js/modal-file-detail.js"></script>

<style lang="scss" scoped>
  .modal {
    &__mask {
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      display: table;
      transition: opacity .3s ease;
    }

    &__wrapper {
      display: table-cell;
      padding-top: 15vh;
    }

    &__container {
      display: flex;
      flex-direction: column;
      width: 50vw;
      margin: 0 auto;
      padding: 10px 20px;
      background-color: #fff;
      border-radius: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;

      @media only screen and (max-width: 1200px) {
        width: 65vw;
      }
    }

    &__header {
      display: flex;
      align-items: flex-start;
      margin-top: 0.5rem;
      margin-left: 15px;

      &__title {
        font-size: 1.3rem;
        font-weight: bold;
        margin: 5px 5px 10px 5px;
      }
    }

    &__close {
      margin: 0 0 0 auto;
      padding: 0.5rem;
      top: 0;
      float: right;
      cursor: pointer;
      transition: all .2s ease;

      &:hover {
        opacity: 0.8;
      }
      &:active {
        opacity: 0.8;
      }
    }

    &__body {
      display: flex;
      width: 100%;
      flex-direction: row;
      padding-bottom: 15px;
      min-height: 20vh;
    }
  }

  .row {
    display: flex;
    align-items: center;
  }

  .col {
    vertical-align: middle;
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: 1.3rem;
    font-weight: bold;
    margin: 5px 5px 10px 5px;
  }

  .file {
    &__wrapper {
      display: flex;
      flex-direction: column;
      height: 45vh;
      width: 40%;
    }
  }

  .version {
    &__wrapper {
      display: flex;
      flex-direction: column;
      height: 45vh;
      width: 65%;
    }

    &__scrollable {
      overflow: auto;
      display: flex;
      flex-direction: column;
      padding-right: 10px;
    }

    &__card {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      box-shadow: none;
      border: 1px solid #828282;
      border-radius: 12px;
      padding: 10px;
      margin: 5px;
      min-height: 50px;

      &-number {
        font-size: 1.7rem;
        margin-right: 10px;
        margin-left: 10px;
        font-weight: bold;
      }

      &-detail {
        margin-left: 15px;
      }

      &-date {
        font-weight: bold;
        margin-bottom: 5px;
      }

      &-download {
        text-decoration: none;
        color: #505050;
        cursor: pointer;
        font-size: 0.9rem;
      }
    }
  }

  .action-button {
    border: 1px solid #828282;
    border-radius: 10px;
    padding: 10px 20px;
    color: #505050;
    cursor: pointer;
    margin-bottom: 10px;
    transition: all .2s ease;
    display: block;
    text-decoration: none;

    &:hover {
      background-color: #F2F2F2;
    }

    input {
      display: none;
    }
  }

  .icon {
    margin-right: 10px;

    &-download {
      margin-right: 5px;
    }
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .details {
    padding: 5px;
    margin-bottom: 5px;

    &__title {
      font-size: 0.8rem;
    }

    &__name {
      font-weight: bold;
    }
  }

  .file {
    &__progress {
      &-wrapper {
        padding: 5px;
      }

      &-text {
        font-size: 0.9rem;
        margin-bottom: 5px;
      }

      &-background {
        height: 5px;
        border-radius: 25px;
        background-color: #e5e5e5;
      }

      &-inner {
        display: flex;
        height: 100%;
        width: 20%;
        border-radius: 25px;
        background-color: #02AAF3;
        transition: width 1s linear;
      }
    }
  }

  .disable-selection {
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer */
    -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
    -webkit-user-select: none; /* Chrome, Safari, and Opera */
    -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
  }
</style>
