<template>
  <div class="modal__mask">
    <div class="modal__wrapper">
      <div class="modal__container">
        <div class="modal__header">
          <span class="modal__close"><font-awesome-icon icon="times" class="icon" @click="close" size="lg"></font-awesome-icon></span>
          <p class="modal__header__title"><strong>Add Member</strong></p>
        </div>
        <div class="modal__body">
          <SearchBar @input="changeKeyword" @keyup="enterPressHandler" />
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
      display: table-cell;
    }

    &__user-list {
      max-height: 70vh;
      overflow: auto;
      padding: 0 20px;
    }

    &__container {
      display: flex;
      flex-direction: column;
      width: 30vw;
      min-width: 350px;
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
      margin: 5px 30px 10px 30px;
      text-align: left;

      &__result {
        max-height: 45vh;
        overflow: auto;
        padding: 15px;
      }

      &__card {
        cursor: pointer;
      }
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
