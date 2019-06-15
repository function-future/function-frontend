<template>
  <div>
    <label v-if="label" class="select-label">{{ label }}</label>
    <select
      @input="updateValue"
      class="select-box"
      v-bind="$attrs"><!-- Binding attrs allows attribute inheritance such as type="text" , etc! -->
      <option
        v-for="option in options"
        :key="option"
        :value="option"
        :selected="option === value">{{option}}</option>
    </select>
  </div>
</template>

<script type="text/javascript" src="./js/base-select.js">
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
    font-size: 1em;
    width: 100%;
  }

  .select-box:focus {
    outline: none;
  }
</style>
