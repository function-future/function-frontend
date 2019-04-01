<template>
  <div>
    <h1 class="title-text"><slot></slot></h1>
  </div>
</template>

<script type="text/javascript" src="./js/BaseTitle.js">
</script>

<style scoped>
  .title-text {
    color: #505050;
  }

  h1 {
    text-align: left;
    padding: 5px 0 5px 5px;
    margin: 20px 0 10px 0;
  }
</style>
