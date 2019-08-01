<template>
  <div class="breadcrumb-wrapper" v-if="breadcrumbAvailable">
    <ul class="breadcrumb">
      <li v-for="(breadcrumb, index) in breadcrumbList" :key="index" class="breadcrumb-list" transition="list">
        <span class="breadcrumb-name" @click="routeTo(index)"
              :class="{'active': breadcrumb.link === $route.name}">
              {{ breadcrumb.name }}
        </span>
        <span class="divider" v-if="index+1 !== breadcrumbList.length">
          <font-awesome-icon icon="chevron-right" class="icon"/>
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
  }

  .breadcrumb {
    color: #828282;
    font-size: 0.8rem;
    align-items: center;
    display: inline-flex;
    list-style-type: none;
    padding: 7px 25px;
    border-radius: 30px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    margin-top: 5px;
    margin-left: 5px;
    transition: all 1s ease-in-out;

    &-list {
      animation: fadein .5s;
    }
  }

  @keyframes fadein {
    from {opacity: 0;}
    to   {opacity: 1;}
  }

  .breadcrumb-name {
    padding-left: 5px;
    cursor: pointer;
  }

  .breadcrumb-name:hover {
    opacity: 0.8;
  }

  .divider {
    text-decoration: none;
    color: #828282;
    padding: 0 5px;
  }

  .active {
    font-weight: bold;
    color: #02AAF3;
  }
</style>
