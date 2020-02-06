<template>
  <transition name="modal" appear appear-active-class="fade-enter-active">
    <div class="modal__mask">
      <div class="modal__wrapper"  @click.self="close">
        <div class="modal__container">
          <div class="modal__header">
            <h3 class="modal__header__title">Final Score</h3>
            <span class="modal__close" @click="close"><b-icon icon="times" size="lg"></b-icon></span>
          </div>
          <div class="modal__body">
            <div class="columns is-mobile is-vcentered">
              <div class="column has-text-centered modal__body__empty-list">
                <span>{{studentData.name}}'s final score is</span>
                <b-field>
                  <b-input v-model="finalScore"
                           type="number"
                           min="0"
                           max="100">
                  </b-input>
                </b-field>
              </div>
            </div>
          </div>
          <div class="modal__footer">
            <b-button class="modal__footer__button" type="is-light" @click="close" expanded>Cancel</b-button>
            <b-button class="modal__footer__button" type="is-primary" @click="finalizeScore" expanded>Finalize</b-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/javascript" src="./js/modal-input-final-score.js"></script>

<style scoped lang="scss">
  @import "@/assets/css/main.scss";

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
      padding-top: 30vh;

      @media (max-width: 1023px) {
        height: 100vh;
        display: flex;
        flex-direction: column-reverse;
        transition: opacity 0.3s ease-out, bottom 0.3s ease-out;
      }
    }

    &__container {
      display: flex;
      flex-direction: column;
      width: 35vw;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;
      padding: 0.5rem 1rem;

      @media (max-width: 1023px) {
        width: 100%;
        height: auto;
        border-radius: 0.75rem 0.75rem 0 0;
      }
    }

    &__header {
      display: flex;
      align-items: center;
      margin: 0.5rem 0.25rem 0 0.25rem;

      &__title {
        padding: 0.3rem 0;
        margin: 0;
        text-align: left;
        font-weight: bold;
        font-size: 1em;
      }
    }

    &__body {
      min-height: 15vh;
      max-height: 40vh;
      overflow-y: auto;
      overflow-x: hidden;
      padding-right: 0.5rem;
      margin: 1rem 0.25rem;
      text-align: left;

      &__empty-list {
        margin-top: 0.75rem;

        button {
          margin-top: 0.5rem;
        }
      }
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
        display: flex;
        flex-direction: column-reverse;
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

  .modal-leave-active {
    transition: all .3s ease;
  }
  .modal-leave-to {
    opacity: 0;
  }

  .fade-enter-active {
    animation: go .3s;
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
