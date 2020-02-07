<template>
  <div class="modal__mask">
    <div class="modal__wrapper" @click.self="closeLoginModal">
      <div class="modal__container">
        <div class="modal__header">
          <div class="modal__header__greetings-wrapper">
            <div class="modal__header__greetings-content">
              <div class="is-size-4 has-text-weight-bold has-text-grey-darker">Welcome back,</div>
              <div class="is-size-6 has-text-grey">Please login to your account</div>
            </div>
            <div @click="closeLoginModal">
              <b-icon icon="times" class="icon"/>
            </div>
          </div>
        </div>
        <div class="modal__body">
          <b-notification type="is-danger" :active.sync="errorAlert">
            You have entered an invalid email or password
          </b-notification>
          <section>
            <b-field label="Email">
              <b-input
                type="email"
                v-model="data.email"
                placeholder="Your email"
                @keyup.enter.native="login"
                v-validate.disable="'required|email'"
                required>
              </b-input>
            </b-field>
            <b-field label="Password">
              <b-input
                type="password"
                password-reveal
                v-model="data.password"
                placeholder="Your password"
                @keyup.enter.native="login"
                v-validate.disable="'required'"
                required>
              </b-input>
            </b-field>
            <div class="login-button">
              <button class="button is-primary is-fullwidth"
                      @click="login"
                      :class="{'is-loading': loggingIn}">
                Login
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./js/login.js"></script>

<style lang="scss" scoped>
  %flex-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .modal {
    &__mask {
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(10, 10, 10, 0.86);
      display: table;
      transition: opacity .3s ease;
    }

    &__wrapper {
      padding-top: 20vh;

      @media (max-width: 1023px) {
        height: 100%;
        display: flex;
        flex-direction: column-reverse;
        transition: opacity 0.3s ease-out, bottom 0.3s ease-out;
      }

      @media (max-height: 550px) {
        padding-top: 0;
      }
    }

    &__container {
      display: flex;
      flex-direction: column;
      width: 35vw;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 8px;
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;

      @media (max-width: 1023px) {
        width: 100%;
        height: auto;
        border-radius: 8px 8px 0 0;
      }

      @media (max-height: 350px) {
        padding-top: 5vh;
        padding-bottom: 15vh;
        height: 350px;
        overflow: auto;
      }
    }

    &__header {
      @extend %flex-center;
      flex-direction: column;
      background-color: #fff;
      border-radius: 8px 8px 0 0;
      height: 125px;
      position: relative;
      align-items: flex-start;
      padding: 1rem 2.5rem;

      img {
        height: 35px;
      }

      &__greetings {
        &-wrapper {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
          width: 100%;
        }
      }
    }

    &__body {
      padding: 0 2.5rem 3rem 2.5rem;
      text-align: left;
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

      @media (max-width: 1023px) {
        margin-bottom: 1rem;
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

  .icon {
    cursor: pointer;
    margin-top: 0.25rem;
    color: #363636;
    transition: all .2s ease;
    width: auto;
    height: auto;
  }

  .login-button {
    margin-top: 2rem;
  }
</style>
