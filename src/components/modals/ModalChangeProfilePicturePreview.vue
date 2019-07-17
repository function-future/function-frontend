<template>
  <div class="modal__mask">
    <div class="modal__wrapper">
      <div class="modal__container">
        <div class="modal__header">
          <h3 class="modal__header__title">Upload Profile Picture</h3>
          <span class="modal__close"><font-awesome-icon icon="times" class="icon" @click="close" size="lg"></font-awesome-icon></span>
        </div>
        <div class="modal__body scrollable-container">
          <div class="column loading" v-if="!newAvatar">
            <font-awesome-icon icon="spinner" spin class="icon-loading" size="lg">
            </font-awesome-icon>
          </div>
          <div class="column image-column" v-if="newAvatar">
            <div class="image" :style="{ backgroundImage: 'url(' + newAvatar.file.full + ')' }"></div>
          </div>
        </div>
        <div class="modal__footer">
          <BaseButton class="modal__footer__button" type="cancel" buttonClass="button-cancel" @click="close">Cancel</BaseButton>
          <BaseButton class="modal__footer__button" type="submit" buttonClass="button-save" @click="save">Save</BaseButton>
        </div>
      </div>
    </div>
  </div></template>

<script type="text/javascript" src="./js/modal-change-profile-picture-preview.js"></script>

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
      width: 35vw;
      margin: 0 auto;
      padding: 10px 20px;
      background-color: #fff;
      border-radius: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;
    }
    &__header {
      display: flex;
      align-items: flex-start;
      margin-top: 0.5rem;
      &__title {
        padding: 0.3rem;
        margin: 0;
        text-align: left;
        font-weight: bold;
        font-size: 1.5em;
      }
    }
    &__body {
      margin: 20px 0;
      text-align: left;
      height: auto;
    }
    &__footer {
      margin-bottom: 0.5rem;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      &__button {
        margin: 0.25rem;
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
  }
  .batch {
    &__row {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    &__col {
      &--batches {
        flex-grow: 1;
      }
    }
  }

  .column {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }

  .image-column {
    padding: 20px 10px;
    width: 20vw;
    margin: auto;
  }

  .image {
    width: 100%;
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    padding-top: 100%;
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .loading {
    margin-top: 25px;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
  }

  .modal-enter {
    opacity: 0;
  }
  modal-enter-active, .modal-leave-active {
    opacity: 0;
  }
  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
