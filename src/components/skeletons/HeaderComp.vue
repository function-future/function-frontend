<template>
  <div class="navbar">
    <router-link to="/" class="navbar-link">
      <img src="@/assets/Logo.png">
    </router-link>
      <router-link to="/" class="navbar-link">Feeds</router-link>
      <router-link to="/" class="navbar-link">Announcements</router-link>
      <router-link to="/" class="navbar-link">Blogs</router-link>
      <router-link to="/" class="navbar-link">Courses</router-link>
      <router-link to="/" class="navbar-link">Files</router-link>
      <router-link to="/" class="navbar-link">Users</router-link>
      <router-link to="/" class="navbar-link">Grades</router-link>
  </div>
</template>

<script>
  export default {
    data () {

    },
    methods: {}
  }
</script>

<style>
  .navbar {
    z-index: 1;
    background-color: #02AAF3;
    height: 100%;
    border-radius: 0 40px 40px 0px;
    box-shadow: 0px 5px 35px 0px rgba(130, 130, 130, 0.5);
    padding-top: 30px;
  }

  img {
    vertical-align: center;
    width: 150px;
    padding-bottom: 25px;
  }

  img:hover {
    opacity: 0.9;
  }

  img:active {
    opacity: 0.7;
  }

  .navbar-link {
    display: block;
    text-decoration: none;
    color: white;
    font-size: 1.2em;
    padding: 5px;
    margin-left: 25px;
    text-align: left;
  }

  .navbar-link:hover {
    color: rgba(255,255,255,0.7);
  }

  .navbar-link:active {
    color: rgba(255,255,255,0.4);
  }

</style>
