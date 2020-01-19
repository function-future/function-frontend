<template>
  <div class="modal__mask">
    <div class="modal__wrapper">
      <div class="modal__container">
        <div class="modal__header">
          <span class="modal__close"><font-awesome-icon icon="times" class="icon" @click="close"
                                                        size="lg"></font-awesome-icon></span>
          <p class="modal__header__title"><strong>{{ chatroomId ? 'Update Chatroom' : 'Create Chatroom' }}</strong></p>
        </div>
        <div class="modal__body">
          <template v-if="!isNext">
            <b-input
              @keyup="enterSearchHandler"
              @input="changeKeyword"
              icon="search"
              placeholder="Search..."
              class="is-rounded chatroom-list__search"/>
            <div v-if="usersWithoutSelectedOne.length > 0" class="modal__body__result">
              <template v-for="(user, index) in usersWithoutSelectedOne">
                <UserListCard :name="user.name"
                              :university="user.university"
                              :role="user.role"
                              :batch="user.batch ? user.batch.name : null"
                              :key="user.id"
                              :avatar="user.avatar"
                              @click="selectedUsers.push(user)"
                              class="modal__body__card"></UserListCard>
              </template>

            </div>
            <p>{{ selectedUsers.length }} members</p>
            <div class="selected-user">
              <template v-for="(user, index) in selectedUsers">
                <UserSimpleCard @remove="selectedUsers.splice(index, 1)" :key="user.id" :index="index" :user="user"/>
              </template>
            </div>
          </template>
          <div class="group-section" v-else>
            <figure class="image is-64x64 group-section-element">
              <img class="is-rounded image is-64x64" style="object-fit: cover"
                   :src="picture || require('@/assets/profile-picture-placeholder.png')">
            </figure>
            <label for="upload-image"
                   class="button is-primary is-outlined group-section-element" :class="{ 'is-loading': isUploading }">
              Edit Picture
            </label>
            <input type="file"
                   name="image"
                   accept=".jpg, .jpeg, .png"
                   id="upload-image"
                   @change="onFileChange($event)"
                   style="display: none"/>
            <b-input
              v-model="chatroom.name"
              placeholder="Group Name"
              @keyup="enterPressed"
              maxlength="29"
              v-validate.continues="'required'"/>
          </div>
        </div>
        <div class="modal__footer">
          <b-button v-if="!isNext" class="modal__footer__button" type="is-primary" size="is-medium" @click="nextOrSave">
            {{
            selectedUsers.length > 1 ? 'Next' : 'Save' }}
          </b-button>
          <div v-else class="modal__footer__button-group">
            <b-button class="modal__footer__button" type="is-light" size="is-medium" @click="isNext = false">Back
            </b-button>
            <b-button class="modal__footer__button" type="is-primary" size="is-medium" @click="create">Save</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/modal-chatroom.js">
</script>

<style lang="scss" scoped>
  .recommendation-user {
    border: 2px solid #0074D9;
  }

  .selected-user {
    display: flex;
    flex-wrap: wrap;
    max-height: 30vh;
    overflow: auto;
  }

  .group-section {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .group-section-element {
    margin-bottom: 20px;
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
      width: 30vw;
      @media (max-width: 1023px) {
        height: 100%;
        display: flex;
        flex-direction: column-reverse;
        transition: opacity 0.3s ease-out, bottom 0.3s ease-out;
      }
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
        height: 30vh;
        overflow: auto;
        margin: 10px 0;
      }

      &__card {
        cursor: pointer;
      }
    }

    &__footer {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      &__button {
        margin: 0.25rem;
      }

      &__button-group {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
      }

      @media (max-width: 1023px) {
        display: flex;
        flex-direction: column-reverse;
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

  @keyframes go {
    from {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }

</style>
