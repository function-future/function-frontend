<template>
    <div class="card" :class="cardClass">
      <slot></slot>
    </div>
</template>

<script type="text/javascript" src="./js/base-card.js">
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

  .custom-card {
    border-radius: 15px;
    padding: 15px;
  }

  .card-hover:hover {
    cursor: pointer;
    transition: all .3s ease;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.1), 2px 2px 10px rgba(0,0,0,0.3);
  }

  .no-pointer:hover {
    cursor: default;
  }
</style>
