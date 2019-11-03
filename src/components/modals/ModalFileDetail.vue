<template>
  <transition name="modal" appear appear-active-class="fade-enter-active">
    <div class="modal__mask">
      <div class="modal__wrapper" @click.self="close">
        <div class="modal__container">
          <div class="modal__header">
            <h3 class="modal__header__title">File Version</h3>
            <span class="modal__close" @click="close"><b-icon icon="times"></b-icon></span>
          </div>
          <div class="modal__body">
            <div class="columns is-multiline" v-if="isLoading">
              <div class="column is-12" v-for="n in 3" :key="n">
                <ListItem :minHeight="'50px'" :simple="true" :loading="isLoading"></ListItem>
              </div>
            </div>
            <div class="columns is-mobile" v-for="(value, name) in fileDetail.versions" :key="name" v-else>
              <div class="column">
                <ListItem :minHeight="'50px'">
                  <template #content>
                    <div class="modal__body__file-version__content">
                      <div class="modal__body__file-version__content-info">
                        <span class="has-text-weight-bold is-size-4 modal__body__file-version__content-info-number">
                          {{ name }}
                        </span>
                        <span>
                          {{ value.timestamp | moment("MMMM Do, YYYY") }}
                        </span>
                      </div>
                      <a class="modal__body__file-version__content-link"
                         :href="value.url" target="_blank" style="color: #4a4a4a">
                        <b-icon icon="download" size="is-small"></b-icon>
                      </a>
                    </div>
                  </template>
                </ListItem>
              </div>
            </div>
            <div class="columns is-mobile is-vcentered" v-if="!fileDetail.versions && !isLoading">
              <div class="column has-text-centered modal__body__empty-list">
                No versions available
              </div>
            </div>
          </div>
          <div class="modal__footer">
            <b-button class="modal__footer__button" type="is-light" @click="close" expanded>Cancel</b-button>
            <label class="modal__footer__button button is-primary is-fullwidth"
                   :class="{'is-loading': isUploading}"
                   v-if="!isLoading && accessList.edit && (ownerOfTheFile || currentUser.role === 'ADMIN')"
                   expanded>
              <input type="file" @change="onFileChange($event)" v-if="!isUploading" style="display: none">
              Upload New Version
            </label>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script src="./js/modal-file-detail.js"></script>

<style lang="scss" scoped>
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
      min-height: 25vh;
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

      &__file-version {
        &__content {
          display: flex;
          align-items: center;
          justify-content: space-between;

          &-info {
            display: flex;
            align-items: center;

            &-number {
              margin-right: 0.75rem;
            }
          }

          &-link {
            display: flex;
            align-items: center;
          }
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
