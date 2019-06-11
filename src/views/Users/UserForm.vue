<template>
  <div class="scrollable-container">
    <div class="column">
      <div>image</div>
    </div>
    <div class="column">
      <div class="input">
        <BaseInput class="input-box" v-model="user.name"></BaseInput>
      </div>
      <div class="input">
        <BaseInput class="input-box" v-model="user.phone"></BaseInput>
      </div>
      <div class="input">
        <BaseInput class="input-box" v-model="user.email"></BaseInput>
      </div>
      <div class="input">
        <BaseInput class="input-box" v-model="user.university"></BaseInput>
      </div>
      <div class="input">
        <BaseInput class="input-box" v-model="user.address"></BaseInput>
      </div>
      <div class="input">
        <BaseInput class="input-box" v-model="user.batch"></BaseInput>
      </div>
      <div class="input">
        <BaseInput class="input-box" v-model="user.division"></BaseInput>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/user-form.js"></script>

<style scoped>
  .column {
    display: inline-block;
    margin: 10px;
  }

  .input-box {
    width: 100%;
  }
</style>
