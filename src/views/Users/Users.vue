<template>
  <div>
    <div class="button-div">
      <tabs :tabs="tabs"
            :currentTab="currentTab"
            :wrapperClass="'default-tabs'"
            :tabClass="'default-tabs__item'"
            :tabActiveClass="'default-tabs__item_active'"
            :lineClass="'default-tabs__active-line'"
            @onClick="changeTab">
      </tabs>
      <BaseButton type="submit" buttonClass="button-save">
        <span><font-awesome-icon icon="plus" class="icon"/> New</span>
      </BaseButton>
    </div>
    <div class="tab-container">
      <div class="scrollable-tab" v-if="currentTab === 'students'">
        <div v-for="student in students" :key="student.id">
          <UserCard :user="student"></UserCard>
        </div>
      </div>
      <div class="scrollable-tab" v-if="currentTab === 'admins'">
        <div v-for="admin in admins" :key="admin.id">
          <UserCard :user="admin"></UserCard>
        </div>
      </div>
      <div class="scrollable-tab" v-if="currentTab === 'mentors'">
        <div v-for="mentor in mentors" :key="mentor.id">
          <UserCard :user="mentor"></UserCard>
        </div>
      </div>
      <div class="scrollable-tab" v-if="currentTab === 'judges'">
        <div v-for="judge in judges" :key="judge.id">
          <UserCard :user="judge"></UserCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/Users.js">
</script>

<style>
  .button-div {
    text-align: right;
    margin-right: 20px;
  }

  .tab-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    max-height: 80vh;
  }

  .scrollable-tab {
    flex-grow: 1;
    max-height: 95%;
    overflow-y: auto;
  }

  .default-tabs {
    float: left;
    position: relative;
    margin: 0 10px 0 25px;
  }

  .default-tabs__item {
    display: inline-block;
    margin: 0 5px;
    padding: 10px;
    font-size: 16px;
    letter-spacing: 1px;
    color: gray;
    text-decoration: none;
    border: none;
    background-color: transparent;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.25s;
  }

  .default-tabs__item_active {
    color: #505050;
  }

  .default-tabs__item:hover {
    border-bottom: 2px solid #02AAF3;
    color: #505050;
  }

  .default-tabs__item:focus {
    outline: none;
    border-bottom: 2px solid #02AAF3;
    color: #505050;
  }

  .default-tabs__item:first-child {
    margin-left: 0;
  }

  .default-tabs__item:last-child {
    margin-right: 0;
  }

  .default-tabs__active-line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: #02AAF3;
    transition: transform 0.4s ease, width 0.4s ease;
  }
</style>
