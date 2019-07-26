<template>
  <div class="scrollable-container">
    <BaseCard  class="file__wrapper">
      <div class="file__header row">
        <div class="col">
          <div class="title">File Name</div>
        </div>
        <div class="col actions-div">
          <span @click.stop="" v-if="accessList.edit">
            <font-awesome-icon icon="edit" class="icon blue" size="lg"></font-awesome-icon>
          </span>
          <span @click.stop="" v-if="accessList.delete">
            <font-awesome-icon icon="trash-alt" class="icon red" size="lg"></font-awesome-icon>
          </span>
        </div>
      </div>
    </BaseCard>
    <BaseCard  class="version__wrapper">
      <div class="title">File Version</div>
      <div class="version__scrollable">
        <div class="version__card disable-selection" v-for="index in 4">
          <div class="version__card-number">{{index}}</div>
          <div class="version__card-detail">
            <div class="version__card-date">January 15, 2019</div>
            <div class="version__card-download">
              <font-awesome-icon icon="download" class="icon-download"></font-awesome-icon>
              Download
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script src="./js/file-detail.js"></script>

<style lang="scss" scoped>
  .scrollable-container {
    display: flex;
    width: 100%;
  }

  .row {
    display: flex;
    align-items: center;
  }

  .col {
    vertical-align: middle;
    display: flex;
    flex-direction: column;
  }

  .actions-div {
    border-left: 1px solid #BDBDBD;
    padding: 5px 5px 5px 15px;
    margin: auto 0 auto auto;
    align-self: flex-end;
    flex-direction: row;

    span{
      transition: all .2s ease;

      &:hover {
        opacity: 0.8;
      }

      &:active {
        opacity: 0.9;
      }
    }
  }

  .title {
    font-size: 1.3rem;
    font-weight: bold;
    margin: 5px 5px 10px 5px;
  }

  .file {
    &__wrapper {
      display: flex;
      flex-direction: column;
      height: 300px;
      width: 60%;

      @media only screen and (max-width: 1200px) {
        width: 50%;
      }
    }
  }

  .version {
    &__wrapper {
      display: flex;
      flex-direction: column;
      height: 300px;
      width: 35%;

      @media only screen and (max-width: 1200px) {
        width: 50%;
      }
    }

    &__scrollable {
      overflow: auto;
      display: flex;
      flex-direction: column;
    }

    &__card {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      box-shadow: none;
      border: 1px solid #828282;
      border-radius: 12px;
      padding: 10px;
      margin: 5px;
      min-height: 50px;

      &-number {
        font-size: 1.7rem;
        margin-right: 10px;
        margin-left: 10px;
        font-weight: bold;
      }

      &-detail {
        margin-left: 15px;
      }

      &-date {
        font-weight: bold;
        margin-bottom: 5px;
      }

      &-download {
        cursor: pointer;
        font-size: 0.9rem;
      }
    }
  }

  .icon {
    margin-right: 10px;

    &-download {
      margin-right: 5px;
    }
  }

  .disable-selection {
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer */
    -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
    -webkit-user-select: none; /* Chrome, Safari, and Opera */
    -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
  }
</style>
