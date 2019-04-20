<template>
  <div>
    <div class="page-header">
      <BaseButton type="submit" buttonClass="button-save">
        <font-awesome-icon icon="plus" class="icon"/> New
      </BaseButton>
      <BaseSelect
        v-model="selectedFilter"
        :options="filters"></BaseSelect>
      <BaseSelect
        v-model="selectedSort"
        :options="sorts"></BaseSelect>
      <BaseInput
        class="search-box"
        v-model="searchValue"
        :placeholder="'Search'">
      </BaseInput>
    </div>
    <BaseCard class="assignment-card">
      <div class="card-header">
        Lorem Ipsum
      </div>
      <div class="card-body">
        <div class="assignment-description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam blanditiis debitis doloremque enim eveniet laudantium maiores molestiae necessitatibus non officia omnis, quasi quisquam quos repudiandae similique sint ullam vel vero!
        </div>
      </div>
      <div class="card-footer">
        <div class="completion-status">
          <div class="completion-status--box"
               :class="[isComplete ? 'complete ': 'pending']">
          </div>
          <span class="completion-status--text">Completed</span>
        </div>
        <div class="room-count">
          <font-awesome-icon icon="users"></font-awesome-icon>
          <span>10</span>
        </div>
        <div class="assignment-deadline">
          <font-awesome-icon icon="calendar"></font-awesome-icon>
          DD/MM/YYYY
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script type="text/javascript" src="./js/Assignment.js"/>

<style scoped>
  .page-header {
    padding: 0 15px;
  }
  .assignment-card {
    min-height: 175px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .assignment-card:hover {
    cursor: pointer;
    transition: all .3s ease;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.1), 2px 2px 10px rgba(0,0,0,0.3);
  }
  .page-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .search-box {
    justify-self: flex-end;
    margin-left: auto;
  }
  .card-header {
    font-weight: bolder;
    font-size: 1.4em;
  }
  .card-body {
    display: flex;
  }
  .assignment-deadline {
    display: flex;
    flex-wrap: wrap;
  }
  .assignment-deadline-date {
    font-weight: bolder;
  }
  .card-footer {
    font-size: 0.8em;
    display: flex;
    align-items: center;
  }
  .completion-status {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  .completion-status--box {
    height: 20px;
    width: 20px;
    margin-right: 5px;
  }
  .complete {
    background-color: limegreen;
  }
  .pending {
    background-color: red;
  }
  .room-count {
    margin-right: 20px;
  }
</style>
