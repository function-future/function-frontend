<template>
    <div>
      <label v-if="label" class="input-label">{{ label }}</label>
      <input
        @input="updateValue"
        class="input-box"
        v-bind="$attrs" /><!-- Binding attrs allows attribute inheritance such as type="text" , etc! -->
    </div>
</template>

<script type="text/javascript" src="./js/BaseInput.js">
</script>

<style scoped>
  .input-label {
    margin-right: 20px;
  }

  .input-box {
    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    padding: 10px 20px 10px 20px;
    margin: 10px;
    font-size: 1em;
  }
</style>
