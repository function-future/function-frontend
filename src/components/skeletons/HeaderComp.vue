<template>
  <nav class="navbar">
    <router-link to="/" class="navbar-link">
      <img src="@/assets/logo.png">
    </router-link>
    <ul class="menu">
      <li><router-link :to="{ name: 'home' }" class="navbar-link">Feeds</router-link></li>
      <li><router-link :to="{ name: 'announcements' }" class="navbar-link">Announcements</router-link></li>
      <li><router-link :to="{ name: 'blogs' }" class="navbar-link">Blogs</router-link></li>
      <li><router-link :to="{ name: 'courses' }" class="navbar-link">Courses</router-link></li>
      <li><router-link :to="{ name: 'files' }" class="navbar-link">Files</router-link></li>
      <li><router-link :to="{ name: 'users' }" class="navbar-link">Users</router-link></li>
      <li><router-link :to="{ name: 'grades' }" class="navbar-link">Grades</router-link></li>
    </ul>
  </nav>
</template>

<script type="text/javascript" src="./js/HeaderComp.js">
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

  .menu {
    display: block;
    list-style-type: none;
    margin-right: 20px;
    padding-left: 0;
  }

  img {
    display: block;
    vertical-align: center;
    width: 125px;
    padding-bottom: 25px;
  }

  .navbar-link {
    display: block;
    text-decoration: none;
    color: white;
    font-size: 1em;
    padding: 5px;
    margin-left: 15px;
    text-align: left;
  }

  .navbar-link:hover {
    opacity: 0.9;
  }

  .navbar-link:active {
    opacity: 0.7;
  }

  .router-link-exact-active {
    font-weight: bold;
  }

  @media only screen and (min-width: 800px) {
    img {
      width: 150px;
    }

    .navbar-link {
      padding-left: 10px;
      font-size: 1.2em;
      margin-left: 25px;
    }
  }

  @media only screen and (min-width: 1500px) {
    img {
      width: 200px;
    }

    .navbar-link {
      padding-left: 10px;
      font-size: 1.4em;
      padding-top: 10px;
    }

  }
</style>
