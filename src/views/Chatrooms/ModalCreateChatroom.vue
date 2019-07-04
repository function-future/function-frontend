<template>
  <div class="modal__mask">
    <div class="modal__wrapper">
      <div class="modal__container">
        <div class="modal__header">
          <span class="modal__close"><font-awesome-icon icon="times" class="icon" @click="close" size="lg"></font-awesome-icon></span>
          <p class="modal__header__title"><strong>Create Chatroom</strong></p>
        </div>
        <div class="modal__body">
          <SearchBar @input="changeKeyword" />
          <div v-if="usersWithoutSelectedOne.length > 0" class="modal__body__result">
            <template v-for="user in usersWithoutSelectedOne">
              <UserListCard :name="user.name"
                            :university="user.university"
                            :role="user.role"
                            :batch="user.batch.name"
                            :key="user.id"
                            :avatar="user.avatar"
                            @click="selectedUsers.push(user)"
                            class="modal__body__card"></UserListCard>
            </template>

          </div>
          <p>{{ selectedUsers.length }} selected</p>
          <div class="selected-user">
            <template v-for="(user, index) in selectedUsers">
              <div class="selected-user-card" :key="user.id">
                <p>{{ user.name }}</p>
                <font-awesome-icon icon="times" class="selected-user-remove" @click="selectedUsers.splice(index, 1)" size="lg" />
              </div>
            </template>
          </div>
          <BaseInput
            v-model="name"
            v-if="selectedUsers.length > 1"
            placeholder="Group Name"
            @focus="wrongName = false"
            @keyup="enterPressed"
            class="group-name-input"
            :inputType="wrongName ? 'wrong-input' : ''" />
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

  .selected-user {
    display: flex;
    flex-wrap: wrap;
  }

  .selected-user-card {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 3px;
    padding: 5px;
    border-radius: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.1);
    -moz-box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.1);
    box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.1);
  }

  .selected-user-card > p, .selected-user-remove {
    margin: 0;
    font-size: 0.8rem;
  }

  .selected-user-remove {
    margin-left: 10px;
    cursor: pointer;
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
      margin: 5px 30px;
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

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #FFF;
    -webkit-box-shadow: inset 1px 1px 2px rgba(0,0,0,0.1);
  }
  ::-webkit-scrollbar-thumb {
    background: #CCC;
    -webkit-box-shadow: inset 1px 1px 2px rgba(0,0,0,0.2);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #AAA;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #888;
    -webkit-box-shadow: inset 1px 1px 2px rgba(0,0,0,0.3);
  }
</style>
