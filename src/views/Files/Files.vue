<template>
  <div class="auto-overflow-container">
    <div class="breadcrumb-mobile__wrapper is-hidden-desktop">
      <div class="breadcrumb-mobile__container">
        <div class="breadcrumb-mobile__back"
             @click="goToFolder(breadcrumbsMobile.id)">
          <b-icon icon="chevron-left"></b-icon>
        </div>
        <div class="breadcrumb-mobile__title">
          <span>{{ currentFolderName }}</span>
        </div>
      </div>
    </div>
    <div class="breadcrumb__wrapper is-hidden-touch">
      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul v-if="!breadcrumbs.length">
          <li><a>root</a></li>
        </ul>
        <ul v-if="breadcrumbs.length">
          <li v-for="(breadcrumb, index) in breadcrumbs"
              :key="index"
              :class="{ 'is-active': breadcrumb.id === $route.params.parentId }">
            <a @click="goToFolder(breadcrumb.id)">
              {{ breadcrumb.name }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="files__container">
      <div class="files__container__actions">
        <label class="button is-primary is-rounded" v-if="accessList.add"
               :class="{'is-loading': isUploading}">
          <b-icon icon="file" size="is-small"></b-icon> File
          <input type="file" @change="onFileChange($event)" v-if="!isUploading" style="display: none">
        </label>
        <b-button rounded
                  @click="showCreateModal = true"
                  v-if="accessList.add && currentUser.role === 'ADMIN'"
                  icon-left="folder"
                  type="is-primary">
          Folder
        </b-button>
      </div>
      <div class="files__container__content__folders" v-if="folderList.length">
        <div class="files__container__content__folders-title">
          <span class="has-text-weight-bold">Folders</span>
        </div>
        <div class="files__container__content__folders__list">
          <div class="columns is-multiline is-mobile is-2 is-variable">
            <div class="column is-3-fullhd is-3-widescreen is-4-desktop is-4-tablet is-6-mobile"
                 v-for="folder in folderList" :key="folder.id">
              <div class="files__container__content__folders__list-item card">
                <div class="files__container__content__folders__list-item-title" @click="goToFolder(folder.id)">
                  <b-icon icon="folder"></b-icon>
                  <span class="has-text-weight-bold is-size-7-touch" :title="folder.name">
                    {{ showLimitedPreviewText(folder.name) }}
                  </span>
                </div>
                <div class="files__container__content__folders__list-item-actions" v-if="currentUser.role === 'ADMIN'">
                  <b-dropdown aria-role="list"
                              position="is-bottom-left"
                              @click.prevent.stop>
                    <button class="button is-text" slot="trigger">
                      <b-icon icon="ellipsis-v" size="is-small" class="icon"></b-icon>
                    </button>
                    <b-dropdown-item
                      aria-role="listitem"
                      @click="openRenameFileFolderModal(folder.id, folder.name, folder.type)"
                      v-if="accessList.edit && currentUser.role === 'ADMIN'">
                      <span class="icon-wrapper">
                        <b-icon icon="edit" class="icon" size="is-small"></b-icon>
                        Rename
                      </span>
                    </b-dropdown-item>
                    <b-dropdown-item
                      aria-role="listitem"
                      @click="openDeleteConfirmationModal(folder.id, folder.type)"
                      v-if="accessList.delete && currentUser.role === 'ADMIN'">
                      <span class="icon-wrapper">
                        <b-icon icon="trash-alt" class="icon" size="is-small"></b-icon>
                        Delete
                      </span>
                    </b-dropdown-item>
                    <b-dropdown-item
                      aria-role="listitem"
                      class="is-hidden-desktop">
                      <b-button type="is-light" expanded>Cancel</b-button>
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="files__container__content__files" v-if="fileList.length">
        <div class="files__container__content__files-title">
          <span class="has-text-weight-bold">Files</span>
        </div>
        <div class="files__container__content__files__list">
          <div class="columns is-multiline is-mobile is-2 is-variable">
            <div class="column is-3-fullhd is-3-widescreen is-4-desktop is-4-tablet is-6-mobile"
                 v-for="file in fileList" :key="file.id">
              <div class="files__container__content__files__list-item card">
                <div class="files__container__content__files__list-item-title" @click="openFilePreview(file.id)">
                  <b-icon icon="file"></b-icon>
                  <span class="has-text-weight-bold is-size-7-touch" :title="file.name">
                    {{ showLimitedPreviewText(file.name) }}
                  </span>
                </div>
                <div class="files__container__content__files__list-item-actions">
                  <b-dropdown aria-role="list"
                              position="is-bottom-left"
                              @click.prevent.stop>
                    <button class="button is-text" slot="trigger">
                      <b-icon icon="ellipsis-v" size="is-small" class="icon"></b-icon>
                    </button>
                    <b-dropdown-item custom aria-role="menuitem" class="is-hidden-desktop">
                      <div class="is-size-6">{{ file.name }}</div>
                      <div>Uploaded by <b>{{ file.author.name }}</b></div>
                    </b-dropdown-item>
                    <b-dropdown-item
                      @click="openFileVersion(file.id)"
                      aria-role="listitem">
                      <span class="icon-wrapper">
                        <b-icon icon="info-circle" class="icon" size="is-small"></b-icon>
                        File version
                      </span>
                    </b-dropdown-item>
                    <b-dropdown-item
                      aria-role="listitem">
                      <a :href="file.file" download style="color: #4a4a4a">
                        <span class="icon-wrapper">
                        <b-icon icon="download" class="icon" size="is-small"></b-icon>
                        Download
                      </span>
                      </a>
                    </b-dropdown-item>
                    <b-dropdown-item
                      aria-role="listitem"
                      @click="openRenameFileFolderModal(file.id, file.name, file.type)"
                      v-if="accessList.edit && ((currentUser.id === file.author.id) || currentUser.role === 'ADMIN')">
                      <span class="icon-wrapper">
                        <b-icon icon="edit" class="icon" size="is-small"></b-icon>
                        Rename
                      </span>
                    </b-dropdown-item>
                    <b-dropdown-item
                      aria-role="listitem"
                      @click="openDeleteConfirmationModal(file.id, file.type)"
                      v-if="accessList.delete && ((currentUser.id === file.author.id) || currentUser.role === 'ADMIN')">
                      <span class="icon-wrapper">
                        <b-icon icon="trash-alt" class="icon" size="is-small"></b-icon>
                        Delete
                      </span>
                    </b-dropdown-item>
                    <b-dropdown-item
                      aria-role="listitem"
                      class="is-hidden-desktop">
                      <b-button type="is-light" expanded>Cancel</b-button>
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <infinite-loading @infinite="initPage"
                        :identifier="infiniteId"
                        spinner="spiral"
                        force-use-infinite-wrapper=".scrollable-container">
        <div slot="no-more"></div>
        <div slot="no-results" class="is-empty">
          <EmptyState src="folder">
            <template #title>
              This folder is empty
            </template>
          </EmptyState>
        </div>
      </infinite-loading>
      <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                                 @close="closeDeleteConfirmationModal"
                                 @clickDelete="deleteThisFile">
        <div slot="description">Are you sure you want to delete this {{ selectedFileType }}?</div>
      </modal-delete-confirmation>
      <modal-create-folder v-if="showCreateModal"
                           @close="showCreateModal = false"
                           @create="createFolderFromModal">
      </modal-create-folder>
      <modal-rename-file-folder v-if="showRenameFileFolderModal"
                                :currentTitle="currentTitle"
                                @close="closeRenameFileFolderModal"
                                @submit="renameFileFolderFromModal">
      </modal-rename-file-folder>
      <transition name="slide-fade" mode="out-in">
        <modal-file-upload-progress v-if="showFileUploadModal"
                                    @close="closeFileUploadModal"
                                    :list="fileUploadList"
                                    :isUploading="isUploading">
        </modal-file-upload-progress>
      </transition>
      <modal-file-version v-if="showFileVersionModal"
                          @close="closeFileVersion"
                          :id="selectedId">
      </modal-file-version>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/files.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .auto-overflow-container {
    overflow-y: hidden;
  }

  .breadcrumb {
    &__wrapper {
      padding: 0.25rem 1.25rem 0.75rem 1.25rem;
      background-color: #ffffff;
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
      margin-bottom: 0.25rem;
    }

    &-mobile {
      &__wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        padding: 1rem;
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.15);
        margin-bottom: 0.25rem;
      }

      &__back {
        position: absolute;
        float: left;
        left: 25px;
        margin-top: 2px;
        transition: all .2s ease;

        &:hover {
          opacity: 0.9;
        }

        &:active {
          opacity: 0.8;
        }
      }

      &__title {
        span {
          font-size: 1.1rem;
          font-weight: bold;
        }
      }
    }
  }

  .files {
    &__container {
      overflow-y: scroll;
      height: 92%;
      display: flex;
      flex-direction: column;
      padding: 1.25rem 1.25rem 5rem 1.25rem;
      margin-bottom: 8vh;

      &__actions {
        z-index: 5;
        margin-bottom: 0.75rem;

        * {
          margin-left: 0.25rem;
          margin-right: 0.25rem;

          &:first-child {
            margin-left: 0;
            margin-right: 0;
          }
        }

        @media only screen and (max-width: 1023px) {
          margin-bottom: 0;
          display: flex;
          flex-direction: column;
          position: fixed;
          right: 5vw;
          bottom: 75px;
          transition: all 0.1s ease-in-out;
          border-radius: 50%;

          button {
            margin: 0.25rem 0;
            box-shadow: 2px 2px 16px 4px rgba(0, 0, 0, 0.1);
          }
        }
      }

      &__header {
        margin-bottom: 0.75rem;

        &__info {
          border-left: 1px solid #BDBDBD;
          padding-left: 0.5rem;
        }
      }

      &__content {
        @media only screen and (max-width: 1023px) {
          margin-bottom: 15vh;
        }

        &__folders {
          &__list {
            padding: 0.75rem 0;
            margin-bottom: 0.5rem;

            &-item {
              min-height: 60px;
              cursor: pointer;
              border-radius: 0.25rem;
              padding: 0.75rem 1rem;
              display: flex;
              justify-content: space-between;

              @media only screen and (max-width: 1023px) {
                padding: 0.75rem 0.75rem;
              }

              &-title {
                width: 100%;
                display: flex;
                align-items: center;
                font-size: 0.875rem;
              }
            }
          }
        }

        &__files {
          &__list {
            padding: 0.75rem 0;
            margin-bottom: 0.5rem;

            &-item {
              min-height: 60px;
              cursor: pointer;
              border-radius: 0.25rem;
              padding: 0.75rem 1rem;
              display: flex;
              justify-content: space-between;

              @media only screen and (max-width: 1023px) {
                padding: 0.75rem 0.75rem;
              }

              &-title {
                width: 100%;
                display: flex;
                align-items: center;
                font-size: 0.875rem;
              }
            }
          }
        }
      }
    }
  }
</style>
