<template>
  <div class="breadcrumb-wrapper" v-if="breadcrumbAvailable">
    <ul class="breadcrumb">
      <li v-for="(breadcrumb, index) in breadcrumbList" :key="index" class="breadcrumb-list">
        <span class="breadcrumb-name" @click="routeTo(index)">{{ breadcrumb.name }}</span>
        <span class="divider" v-if="index+1 !== breadcrumbList.length"> > </span>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript" src="./js/breadcrumbs.js"></script>

<style scoped>
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
</style>
