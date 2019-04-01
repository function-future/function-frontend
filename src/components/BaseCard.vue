<template>
    <div class="card">
      <slot></slot>
    </div>
</template>

<script type="text/javascript" src="./js/BaseCard.js">
</script>

<style scoped>
  .card {
    background: #FFFFFF;
    border: 1px solid #F2F2F2;
    box-sizing: border-box;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    padding: 15px 25px 15px 25px;
    margin: 15px;
    text-align: left;
  }
</style>
