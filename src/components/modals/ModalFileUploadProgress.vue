<template>
  <div class="upload-modal__wrapper">
    <div class="upload-modal__header">
      <h4 class="upload-modal__header-title">File Upload</h4>
      <span class="upload-modal__header-close" @click="close">
        <font-awesome-icon icon="times" class="icon"></font-awesome-icon>
      </span>
    </div>
    <div class="scrollable-container">
      <div class="file__wrapper" v-for="(file, index) in list" :key="index">
        <div class="file">
          <div class="file__title">
            <font-awesome-icon icon="file" class="icon"></font-awesome-icon>
            <span>{{ file.name }}</span>
          </div>
          <div class="file__finished" v-if="file.progress >= 100">
            <font-awesome-icon icon="check-circle" class="icon" v-if="file.progress === 101"></font-awesome-icon>
            <font-awesome-icon icon="times-circle" class="icon red" v-if="file.progress === 102"></font-awesome-icon>
          </div>
        </div>
        <div class="file__progress-wrapper" v-if="file.progress < 100">
          <div class="file__progress-background">
            <div class="file__progress-inner" :style="{ width: file.progress + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/modal-file-upload-progress.js"></script>

<style lang="scss" scoped>
  .scrollable-container {
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
      width: 25vw;
      min-height: 10vh;
      max-height: 50vh;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      background-color: #FFFFFF;
      z-index: 9997;
      position: fixed;
      right: 3%;
      bottom: 5%;
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
      cursor: default;
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
        margin-right: 7px;
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

  .icon {
    margin-right: 10px;
  }
</style>
