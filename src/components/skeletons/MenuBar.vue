<template>
  <b-menu  class="navbar">
    <b-menu-list class="menu-list">
      <b-menu-item class="menu-item"
                   label="Feeds"
                   tag="router-link" exact
                   :to="{ name: 'feeds' }">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Announcements"
                   tag="router-link"
                   :to="{ name: 'announcements' }">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Blogs"
                   tag="router-link"
                   :to="{ name: 'activityBlogs' }">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Courses"
                   tag="router-link"
                   :to="{ name: 'courseBatches' }"
                   v-if="menuList.courses">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Files"
                   tag="router-link"
                   :to="{ name: 'files' }"
                   v-if="menuList.files">
      </b-menu-item>
      <b-menu-item class="menu-item"
                   label="Users"
                   tag="router-link"
                   :to="{ name: 'users' }"
                   v-if="menuList.users">
      </b-menu-item>
      <!--<b-menu-item-->
        <!--icon="settings"-->
        <!--:active="isActive"-->
        <!--:expanded="isActive"-->
        <!--@click="isActive = !isActive">-->
        <!--<template slot="label" slot-scope="props">-->
          <!--Administrator-->
          <!--<b-icon-->
            <!--class="is-pulled-right"-->
            <!--:icon="props.expanded ? 'menu-down' : 'menu-up'">-->
          <!--</b-icon>-->
        <!--</template>-->
        <!--<b-menu-item icon="account" label="Users"></b-menu-item>-->
        <!--<b-menu-item icon="cellphone-link">-->
          <!--<template slot="label" slot-scope="props">-->
            <!--Devices-->
            <!--<b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">-->
              <!--<b-icon icon="dots-vertical" slot="trigger"></b-icon>-->
              <!--<b-dropdown-item aria-role="listitem">Action</b-dropdown-item>-->
              <!--<b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>-->
              <!--<b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>-->
            <!--</b-dropdown>-->
          <!--</template>-->
        <!--</b-menu-item>-->
        <!--<b-menu-item icon="cash-multiple" label="Payments" disabled></b-menu-item>-->
      <!--</b-menu-item>-->
    </b-menu-list>
    <!--<b-menu-list>-->
      <!--<b-menu-item-->
        <!--label="Expo"-->
        <!--icon="link"-->
        <!--tag="router-link"-->
        <!--target="_blank"-->
        <!--to="/expo">-->
      <!--</b-menu-item>-->
    <!--</b-menu-list>-->
  </b-menu>
</template>

<script src="./js/menu-bar.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .navbar {
    /*background-color: #02AAF3;*/
    /*height: 100%;*/
    /*border-radius: 0 18px 18px 0px;*/
    /*box-shadow: 0px 5px 35px 0px rgba(130, 130, 130, 0.5);*/
    /*overflow: hidden;*/
    /*padding: 50px 25px;*/
    /*text-align: left;*/
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 16rem;
    padding: 2rem 1rem;
    background: #f5f5f5;
  }

  .menu-list {

  }

  .menu-item {
    color: #FFFFFF;
  }
</style>
