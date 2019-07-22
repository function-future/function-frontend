<template>
  <div>
    <div class="button__wrapper">
      <div class="breadcrumb-wrapper" v-if="paths.length">
        <ul class="breadcrumb">
          <li v-for="(path, index) in paths" :key="index" class="breadcrumb-list">
            <span class="breadcrumb-name" @click="goToPreviousFolder(path)"
                  :class="{ bold: path === $route.params.parentId }">{{ path }}</span>
            <span class="divider" v-if="index+1 !== paths.length"> > </span>
          </li>
        </ul>
      </div>
      <div class="button-div" v-if="accessList.add">
        <label class="add-button">
          <input type="file" @change="onFileChange($event)">
          <span><font-awesome-icon icon="plus" class="icon"/> File</span>
        </label>
      </div>
      <div class="button-div end" v-if="accessList.add && currentUser.role === 'ADMIN'">
        <BaseButton type="submit" buttonClass="button-save" @click="showCreateModal = true">
          <span><font-awesome-icon icon="plus" class="icon"/> Folder</span>
        </BaseButton>
      </div>
    </div>
    <div class="scrollable-container">
      <div class="wrapper">
        <h3 class="title">Folders</h3>
        <div class="file__wrapper">
          <div class="file" @click="goToFolder(folder.id)"
               v-for="folder in folderList" :key="folder.id">
            <BaseCard cardClass="card-hover" class="file__card">
              <font-awesome-icon icon="folder" class="icon" size="lg"></font-awesome-icon>
              <div class="file__title">{{ showLimitedPreviewText(folder.name) }}</div>
              <div class="actions" v-if="true">
              <span class="delete-btn"
                    @click.stop="openDeleteConfirmationModal(folder.id, folder.type)"
                    v-if="accessList.delete">
                <font-awesome-icon icon="trash-alt" class="action-icon red"></font-awesome-icon>
              </span>
              </div>
            </BaseCard>
          </div>
        </div>
      </div>
      <div class="wrapper">
        <h3 class="title">Files</h3>
        <div class="file__wrapper">
          <div class="file" @click="downloadFileFromUrl"
               v-for="file in fileList" :key="file.id">
            <BaseCard cardClass="card-hover" class="file__card">
              <font-awesome-icon icon="file" class="icon" size="lg"></font-awesome-icon>
              <div class="file__title">{{ showLimitedPreviewText(file.name) }}</div>
              <div class="actions" v-if="true">
              <span class="delete-btn"
                    @click.stop="openDeleteConfirmationModal(file.id, file.type)"
                    v-if="accessList.delete">
                <font-awesome-icon icon="trash-alt" class="action-icon red"></font-awesome-icon>
              </span>
              </div>
            </BaseCard>
          </div>
        </div>
      </div>
    </div>
    <infinite-loading @infinite="initPage"
                      :identifier="infiniteId"
                      spinner="spiral"
                      force-use-infinite-wrapper=".scrollable-container">
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="showDeleteConfirmationModal = false"
                               @clickDelete="deleteThisFile">
      <div slot="description">Are you sure you want to delete this {{ selectedFileType }}?</div>
    </modal-delete-confirmation>
    <modal-create-folder v-if="showCreateModal"
                         @close="showCreateModal = false"
                         @create="createFolderFromModal">
    </modal-create-folder>
    <modal-file-upload-progress v-if="true">
    </modal-file-upload-progress>
  </div>
</template>

<script type="text/javascript" src="./js/files.js"></script>

<style lang="scss" scoped>
  .button-div {
    margin-bottom: 0;
    margin-right: 0;
    margin-left: auto;
    font-size: 14px;
  }

  .end {
    margin-left: 10px;
    margin-bottom: 0;
  }

  .wrapper {
    margin-bottom: 10px;
  }

  .file {
    flex: 0 0 20%;

    @media only screen and (max-width: 1500px) {
      flex: 0 0 25%;
    }

    @media only screen and (max-width: 1225px) {
      flex: 0 0 33%;
    }

    @media only screen and (max-width: 1000px) {
      flex: 0 0 50%;
    }

    &__wrapper {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      margin-right: 15px;
      margin-bottom: 10px;
    }

    &__card {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      box-shadow: none;
      border: 1px solid #828282;
      border-radius: 12px;
      padding: 15px 20px 15px 20px;
      margin: 10px;

      &:hover {
        box-shadow: none;
        opacity: 0.9;
      }
    }

    &__title {
      font-size: 13px;
    }
  }

  .actions {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: auto;
  }

  .action-icon {
    margin-right: 5px;

    &:hover {
      opacity: 0.8;
    }
  }

  .icon {
    margin-right: 15px;
  }

  .title {
    text-align: left;
    padding-left: 15px;
    margin-bottom: 5px;
  }

  .file {
  }

  .loading {
    margin-top: 50px;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button {
    &-back {
      cursor: pointer;
      font-size: 12px;

      &:hover {
        opacity: 0.9;
      }
    }

    &__wrapper {
      display: flex;
      align-items: center;
      margin-right: 30px;
    }
  }

  .folder-title {
    font-size: 16px;
    font-weight: bold;
    margin-left: 10px;
    padding-left: 10px;
    border-left: 1px solid #BDBDBD;
  }

  .disable-selection {
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer */
    -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
    -webkit-user-select: none; /* Chrome, Safari, and Opera */
    -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
  }

  .add-button {
    background: #02AAF3;
    border: none;
    padding: 5px 20px 5px 20px;
    width: 125px;
    border-radius: 30px;
    color: white;
    font-style: normal;
    font-weight: bold;
    font-size: 1.2em;
    line-height: normal;
    text-align: center;
    -webkit-transition: all .2s ease;
    transition: all .2s ease;
    margin: 2px 0 2px 0;
    cursor: pointer;

    &:hover {
      box-shadow: 2px 2px 8px rgba(0,0,0,0.08), 2px 2px 10px rgba(0,0,0,0.15);
    }

    input {
      display: none;
    }
  }

  .breadcrumb-wrapper {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    flex: 0 1 auto;
    margin-bottom: 5px;
  }

  .breadcrumb {
    align-items: center;
    display: inline-flex;
    margin: 0;
    padding-left: 5px;
    list-style-type: none;
  }

  .breadcrumb-name {
    color: #02AAF3;
    text-decoration: underline;
    padding-left: 5px;
    cursor: pointer;
  }

  .breadcrumb-name:hover {
    opacity: 0.8;
  }

  .divider {
    text-decoration: none;
    color: #505050;
    padding: 0 5px;
  }

  .bold {
    font-weight: bold;
  }
</style>
