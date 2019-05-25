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
    <BaseCard class="comparisons-card">
      <div class="card-header">
        Lorem Ipsum
      </div>
      <div class="card-body">
        <div class="comparisons-description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam blanditiis debitis doloremque enim eveniet laudantium maiores molestiae necessitatibus non officia omnis, quasi quisquam quos repudiandae similique sint ullam vel vero!
        </div>
        <div class="comparisons-deadline">
          <font-awesome-icon icon="calendar-alt"></font-awesome-icon>Used at
          <span class="comparisons-deadline-date">
            31 May 2019
          </span>
        </div>
      </div>
      <div class="card-footer">
        <div class="completion-status">
          <div class="completion-status--box"
               :class="[isComplete ? 'complete ': 'pending']"></div>
          <span>Viewed</span>
        </div>
        <div class="total-members">
          <font-awesome-icon icon="users"></font-awesome-icon>
          <span>3/5 tries</span>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script type="text/javascript" src="./js/Comparisons.js"/>

<style scoped>
  .page-header {
    padding: 0 15px;
  }
  .comparisons-card {
    min-height: 175px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .comparisons-card:hover {
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
  .comparisons-deadline {
    display: flex;
    flex-wrap: wrap;
  }
  .comparisons-deadline-date {
    font-weight: bolder;
  }
  .card-footer {
    font-size: 0.8em;
    display: flex;
    align-items: center;
  }
  .completion-status {
    margin-right: 20px;
    display: flex;
    align-items: center;
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
    background-color: deepskyblue;
  }
  .retry-count {
    display: flex;
    align-items: center;
  }
</style>
