<template>
  <div>
    <label v-if="label" class="select-label">{{ label }}</label>
    <select
      @input="updateValue"
      class="select-box"
      v-bind="$attrs"
      :selected="option === value"><!-- Binding attrs allows attribute inheritance such as type="text" , etc! -->
      <option v-for="option in options" :key="option">{{option}}</option>
    </select>
  </div>
</template>

<script type="text/javascript" src="./js/BaseSelect.js">
</script>

<style scoped>
  .select-label {
    margin-right: 20px;
  }

  .select-box {
    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    padding: 10px 20px 10px 20px;
    margin: 10px;
    font-size: 1em;
  }

  .select-box:focus {
    outline: none;
  }
</style>
