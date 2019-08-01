<template>
  <nav class="navbar">
    <router-link to="/" class="navbar-link">
      <img src="@/assets/logo.png">
    </router-link>
    <ul class="menu">
      <li><router-link :to="{ name: 'feeds' }" class="navbar-link" exact>Feeds</router-link></li>
      <li><router-link :to="{ name: 'announcements' }" class="navbar-link">Announcements</router-link></li>
      <li><router-link :to="{ name: 'activityBlogs' }" class="navbar-link">Blogs</router-link></li>
      <li v-if="menuList.courses"><router-link :to="{ name: 'courseBatches' }" class="navbar-link">Courses</router-link></li>
      <li v-if="menuList.files"><router-link :to="{ name: 'files' }" class="navbar-link">Files</router-link></li>
      <li v-if="menuList.users"><router-link :to="{ name: 'users' }" class="navbar-link">Users</router-link></li>
      <li class="navbar-link grades-menu" @click="toggleGradesMenu" v-if="menuList.assignments">
        <span>Grades</span>
        <span v-if="!showGrades"><font-awesome-icon icon="chevron-down" class="icon"/></span>
        <span v-if="showGrades"><font-awesome-icon icon="chevron-up" class="icon"/></span>
      </li>
      <transition name="fade">
        <ul v-if="showGrades" class="grades-submenu">
          <li v-if="menuList.questionBanks"><router-link :to="{ name: 'questionBanks' }" class="navbar-link">Question Banks</router-link></li>
          <li v-if="menuList.quizzes"><router-link :to="{ name: quizRoute }" class="navbar-link">Quizzes</router-link></li>
          <li v-if="menuList.assignments"><router-link :to="{ name: assignmentRoute }" class="navbar-link">Assignments</router-link></li>
          <li v-if="menuList.comparisons"><router-link :to="{ name: 'judgingBatch' }" class="navbar-link">Comparisons</router-link></li>
          <li v-if="menuList.points"><router-link :to="{ name: 'points' }" class="navbar-link">Points</router-link></li>
        </ul>
      </transition>
      <li v-if="menuList.chatrooms">
        <router-link class="navbar-link" :to="{ name: 'chatrooms' }">Chatrooms</router-link>
      </li>
      <li v-if="menuList.reminders">
        <router-link class="navbar-link" :to="{ name: 'reminders' }">Reminders</router-link>
      </li>
      <li v-if="menuList.myQuestionnaire">
        <router-link class="navbar-link" :to="{ name: 'myQuestionnaire'}" >My Questionnaire</router-link>
      </li>
      <li class="navbar-link questionnaire-menu" @click="toggleQuestionnaireMenu" v-if="menuList.questionnaireAdmin">
        <span>Questionnaires Admin</span>
        <font-awesome-icon icon="chevron-down" class="icon icon-questionnaire" v-if="!showQuestionnaire"/>
        <font-awesome-icon icon="chevron-up" class="icon icon-questionnaire" v-else/>
      </li>
      <transition name="fade">
        <ul v-if="showQuestionnaire" class="questionnaire-submenu">
          <li><router-link :to="{ name: 'questionnaires' }" class="navbar-link">Questionnaires</router-link></li>
          <li><router-link :to="{ name: 'questionnaireResults' }" class="navbar-link">Results</router-link></li>
        </ul>
      </transition>
    </ul>
  </nav>
</template>

<script type="text/javascript" src="./js/header-comp.js">
</script>

<style scoped>
  .navbar {
    z-index: 1;
    background-color: #02AAF3;
    height: 100%;
    border-radius: 0 40px 40px 0px;
    box-shadow: 0px 5px 35px 0px rgba(130, 130, 130, 0.5);
    overflow: hidden;
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
    padding-top: 30px;
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

  .router-link-exact-active, .router-link-active {
    font-weight: bold;
  }

  .grades-menu, .questionnaire-menu {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }

  .grades-submenu, .questionnaire-submenu {
    list-style-type: none;
  }

  .fade-enter-active {
    transition: opacity 1s;
  }

  .fade-leave-active {
    transition: opacity .1s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
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

    .grades-submenu, .questionnaire-submenu {
      font-size: 0.8em;
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

    .grades-submenu, .questionnaire-submenu {
      font-size: 0.6em;
    }

  }

  @media only screen and (max-width: 1700px) {
    .icon-questionnaire {
      padding-top: 15px;
    }
  }
</style>
