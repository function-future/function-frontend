<template>
  <div class="breadcrumb-wrapper disable-selection" v-if="breadcrumbAvailable">
    <ul class="breadcrumb">
      <li v-for="(breadcrumb, index) in breadcrumbs" :key="index" class="breadcrumb-list" transition="list">
        <span class="breadcrumb-name" @click="routeTo(breadcrumb)"
              :class="{'active': breadcrumb.link === $route.name, 'no-pointer': !breadcrumb.link}">
              {{ breadcrumb.name }}
        </span>
        <span class="divider" v-if="index+1 !== breadcrumbs.length">
          <b-icon icon="chevron-right" class="icon"/>
        </span>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript" src="./js/breadcrumbs.js"></script>

<style lang="scss" scoped>
  .breadcrumb-wrapper {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    flex: 0 1 auto;
    margin: 0 1rem 0 2rem;
  }

  .breadcrumb {
    color: #FFFFFF;
    margin-top: 0.25rem;
    font-size: 1rem;
    align-items: center;
    display: inline-flex;
    list-style-type: none;
    transition: all 1s ease-in-out;

    &-list {
      display: flex;
      animation: fadein .5s;

      &:before {
        content: '';
      }
    }
  }

  @keyframes fadein {
    from {opacity: 0;}
    to   {opacity: 1;}
  }

  .breadcrumb-name {
    max-width: 125px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }

  .breadcrumb-name:hover {
    opacity: 0.8;
  }

  .divider {
    text-decoration: none;
    color: #F5F5F5;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .active {
    max-width: 200px;
    font-weight: bold;
    color: #F5F5F5;
  }

  .no-pointer {
    cursor: default;
  }

  .disable-selection {
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer */
    -khtml-user-select: none; /* KHTML browsers (e.g. Konqueror) */
    -webkit-user-select: none; /* Chrome, Safari, and Opera */
    -webkit-touch-callout: none; /* Disable Android and iOS callouts*/
  }
</style>
