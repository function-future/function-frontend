<template>
  <div class="modal__mask">
    <div class="modal__wrapper">
      <div class="modal__container">
        <div class="modal__header">
          <span class="modal__close"><font-awesome-icon icon="times" class="icon" @click="close" size="lg"></font-awesome-icon></span>
          <p class="modal__header__title"><strong>Add Member</strong></p>
        </div>
        <div class="modal__body">
          <b-input
            @input="changeKeyword"
            @keyup="enterPressHandler"
            icon="search"
            placeholder="Search..."
            class="is-rounded modal__search-bar"/>
          <div class="modal__user-list">
          <template v-for="(user, index) in usersWithoutSelectedOne">
            <UserListCard :name="user.name"
                          :class="{'recommendation-user': index === 0 && name}"
                          :university="user.university"
                          :role="user.role"
                          :batch="user.batch ? user.batch.name : null"
                          :key="user.id"
                          :avatar="user.avatar"
                          @click="addMemberHandler(user)"
                          class="modal__body__card"></UserListCard>
          </template>
          </div>
        </div>
        <div class="modal__footer"></div>
      </div>
    </div>
  </div>
</template>

<script src="./js/reminder-member-modal.js">
</script>

<style lang="scss" scoped>
  .recommendation-user {
    border: 2px solid #0074D9;
  }

  .modal {
    &__mask {
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity .3s ease;
    }

    &__wrapper {
      @media (min-width: 1023px) {
        width: 30vw;
      }
      @media (max-width: 1023px) {
        height: 100vh;
        display: flex;
        flex-direction: column-reverse;
        transition: opacity 0.3s ease-out, bottom 0.3s ease-out;
      }
    }

    &__user-list {
      height: 40vh;
      overflow: auto;
      padding: 10px 0;
    }

    &__container {
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      padding: 0.5rem 1rem;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;
      max-height: 100vh;
      overflow: auto;
      @media (max-width: 1023px) {
        width: 100vw;
        border-radius: 0.75rem 0.75rem 0 0;
      }
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
      margin: 0 30px;
      text-align: left;

      &__result {
        max-height: 45vh;
        overflow: auto;
        padding: 10px 0;
      }

      &__card {
        cursor: pointer;
      }
    }

    &__search-bar {
      margin: 5px 0px;
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
