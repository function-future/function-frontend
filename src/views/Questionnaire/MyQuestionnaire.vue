<template>
  <div class="my-questionnaire-outer">
    <BaseCard class="my-questionnaire-card">
      <div class="search-bar-my-questionnaire">
        <SearchBar/>
      </div>
      <div>
        <span>Hello world</span>
      </div>
    </BaseCard>
  </div>
</template>

<script src="./js/MyQuestionnaire.js">

</script>

<style scoped>
  .my-questionnaire-outer {
    display: flex;
    justify-content: center;
    height: 80vh;
  }

  .my-questionnaire-card {
    width: 900px;
    padding: 0;
    height: 80vh;
  }
</style>
