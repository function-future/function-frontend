<template>
  <div class="modal__mask">
    <div class="modal__wrapper">
      <div class="modal__container">
        <div class="modal__header">
          <span class="modal__close"><font-awesome-icon icon="times" class="icon" @click="close" size="lg"></font-awesome-icon></span>
          <p class="modal__header__title"><strong>Create Chatroom</strong></p>
        </div>
        <div class="modal__body">
          <SearchBar />
        </div>
        <div class="modal__footer">
          <BaseButton class="modal__footer__button" buttonClass="button-save" @click="create">Create</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/ModalCreateChatroom.js"></script>

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
      padding-top: 30vh;
    }

    &__container {
      display: flex;
      flex-direction: column;
      width: 20vw;
      min-width: 280px;
      margin: 0 auto;
      padding: 10px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;
    }

    &__header {
      display: flex;
      align-items: center;
      flex-direction: column;

      &__title {
        padding: 0.3rem;
        margin: 0;
        text-align: left;
        font-weight: bold;
        font-size: 1.5em;
      }
    }

    &__body {
      margin: 5px 20px;
      text-align: left;
    }

    &__footer {
      margin-bottom: 0.5rem;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      &__button {
        margin: 0.25rem;
      }
    }

    &__close {
      margin: 0 0 0 auto;
      padding: 0;
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
  }
</style>
