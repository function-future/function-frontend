<template>
  <div class="upload-modal__wrapper">
    <div class="upload-modal__header">
      <h5 class="upload-modal__header-title" v-if="isUploading">Uploading file</h5>
      <h5 class="upload-modal__header-title" v-if="!isUploading">Upload complete</h5>
      <span class="upload-modal__header-close"><font-awesome-icon icon="times" class="icon" @click="close"></font-awesome-icon></span>
    </div>
    <div class="scrollable-container">
      <div class="file__wrapper">
        <div class="file">
          <div class="file__title">
            <font-awesome-icon icon="file" class="icon"></font-awesome-icon>
            <span>booadasdsadsadsaadsaask.docx</span>
          </div>
          <div class="file__finished" v-if="!isUploading">
            <font-awesome-icon icon="check-circle" class="icon" v-if="true"></font-awesome-icon>
            <font-awesome-icon icon="times-circle" class="icon red" v-if="false"></font-awesome-icon>
          </div>
        </div>
        <div class="file__progress-wrapper" v-if="!isUploading">
          <div class="file__progress-background">
            <div class="file__progress-inner"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/modal-file-upload-progress.js"></script>

<style lang="scss" scoped>
  .scrollable-container {
    margin-bottom: 5px;
    width: 100%;
  }
  .upload-modal {
    &__header {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-bottom: 5px;
      background-color: #02AAF3;
      border-radius: 10px 10px 0 0;
      color: #FFFFFF;

      &-title {
        margin: 5px;
        padding: 0.7rem 0.5rem 0.7rem 1rem;
        align-self: flex-start;
      }

      &-close {
        margin-left: auto;
        padding: 0.5rem;
        cursor: pointer;
        transition: all .2s ease;
        &:hover {
          opacity: 0.8;
        }
        &:active {
          opacity: 0.8;
        }
      }

    }

    &__wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-start;
      width: 20vw;
      min-height: 15vh;
      max-height: 50vh;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      background-color: #FFFFFF;
      z-index: 10000;
      position: fixed;
      right: 4vw;
      bottom: 8vh;
    }
  }

  .file {
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;

    &__wrapper {
      display: flex;
      flex-direction: column;
      min-height: 35px;
      margin: 5px 10px 5px 20px;
      padding: 5px 0;
    }

    &__title {
      padding: 5px;
      text-align: left;
      width: 85%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__finished {
      color: #02AAF3;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      width: 15%;
    }

    &__progress {
      &-wrapper {
        padding: 5px;
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
      }
    }
  }

  .icon {
    margin-right: 10px;
  }
</style>
