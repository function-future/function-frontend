<template>
  <div>
    <div class="users-button-div">
      <tabs :tabs="tabs"
            :currentTab="currentTab"
            :wrapperClass="'default-tabs'"
            :tabClass="'default-tabs__item'"
            :tabActiveClass="'default-tabs__item_active'"
            :lineClass="'default-tabs__active-line'"
            @onClick="changeTab">
      </tabs>
      <div class="actions">
        <span v-if="accessList.add">
          <BaseButton type="submit" buttonClass="button-save" @click="goToAddUser">
            <span><font-awesome-icon icon="plus" class="icon"/> {{ addUserButtonLabel }}</span>
          </BaseButton>
        </span>
        <SearchBar class="search-user" @input="searchHandler" v-model="keyword"></SearchBar>
      </div>
    </div>
    <div class="tab-container">
      <div v-if="isLoading" class="loading">
        <font-awesome-icon icon="spinner" spin class="icon-loading" size="lg"></font-awesome-icon>
      </div>
      <div v-if="!isLoading" class="scrollable-tab">
        <div v-if="currentTab === 'student'">
          <div v-for="student in students" :key="student.id">
            <UserCard :user="student" @edit="goToEditUser" @delete="openDeleteConfirmationModal"></UserCard>
          </div>
        </div>
        <div v-if="currentTab === 'admin'">
          <div v-for="admin in admins" :key="admin.id">
            <UserCard :user="admin" @edit="goToEditUser" @delete="openDeleteConfirmationModal"></UserCard>
          </div>
        </div>
        <div v-if="currentTab === 'mentor'">
          <div v-for="mentor in mentors" :key="mentor.id">
            <UserCard :user="mentor" @edit="goToEditUser" @delete="openDeleteConfirmationModal"></UserCard>
          </div>
        </div>
        <div v-if="currentTab === 'judge'">
          <div v-for="judge in judges" :key="judge.id">
            <UserCard :user="judge" @edit="goToEditUser" @delete="openDeleteConfirmationModal"></UserCard>
          </div>
        </div>
        <BasePagination :paging="paging"
                        @loadPage="loadPage"
                        @previousPage="loadPreviousPage"
                        @nextPage="loadNextPage">
        </BasePagination>
      </div>
    </div>
    <modal-delete-confirmation v-if="showDeleteConfirmationModal"
                               @close="closeDeleteConfirmationModal"
                               @clickDelete="deleteThisUser">
      <div slot="description">Are you sure you want to delete selected user?</div>
    </modal-delete-confirmation>
  </div>
</template>

<script type="text/javascript" src="./js/users.js">
</script>

<style>
  .users-button-div {
    display: flex;
    text-align: right;
    margin-right: 20px;
    margin-top: 5px;
  }

  .actions {
    display: flex;
    align-items: center;
    margin-left: auto;
    font-size: 0.9rem;
    min-width: 350px;
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
    display: flex;
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

  .loading {
    margin-top: 50px;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon {
    margin-right: 3px;
  }

  .search-user {
    margin-left: 10px;
  }

  .search-outer {
    height: 50px !important;
  }
</style>
