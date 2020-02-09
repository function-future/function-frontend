<template>
  <transition name="modal" appear appear-active-class="fade-enter-active">
    <div class="modal__mask">
      <div class="modal__wrapper">
        <div class="modal__container">
          <div class="modal__header">
            <h3 class="modal__header__title">Quiz Submitted!</h3>
          </div>
          <div class="modal__body">
            <div class="modal__body__card card">
              <div class="modal__body__card-image card-image">
                <figure class="image is-2by1">
                  <img :src="source" alt="Image">
                </figure>
              </div>
              <div class="modal__body__card-content card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">Trials Left</p>
                    <p class="subtitle is-6">{{ trialsLeft }} remaining</p>
                  </div>
                  <div class="media-right">
                    <div class="modal__body__card-content-point">
                      <span>
                      {{ result }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal__footer buttons">
            <b-button type="is-primary" outlined :disabled="trialsLeft < 1" @click="retry">Retry</b-button>
            <b-button type="is-success" outlined @click="finish">Finish</b-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/javascript" src="./js/quiz-modal.js"></script>

<style lang="scss" scoped>
  @import '@/assets/css/main.scss';

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
        height: 100%;
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
        height: fit-content;
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
      max-height: 45vh;
      overflow-y: auto;
      overflow-x: hidden;
      margin: 1rem 0.25rem;
      text-align: left;

      &__card {

        &-image {

        }

        &-content {

          &-point {
            border-radius: 50%;
            width: 50px;
            height: 50px;
            padding: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 3px solid #BDBDBD;
          }

        }

      }
    }

    &__footer {
      margin-bottom: 0.5rem;
      text-align: left;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;

      &__button {
        margin: 0.25rem;
      }

      @media (max-width: 1023px) {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: row;
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

  .card {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
</style>
