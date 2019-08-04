<template>
    <div>
      <label v-if="label" class="input-label">{{ label }}</label>
      <input
        @input="updateValue"
        @keyup="emitKeyUp"
        @focus="emitFocus"
        class="input-box"
        v-bind="$attrs"
        :value="value"
        :class="inputType"/><!-- Binding attrs allows attribute inheritance such as type="text" , etc! -->
    </div>
</template>

<script type="text/javascript" src="./js/base-input.js">
</script>


<style scoped>
  .input-label {
    margin-right: 20px;
  }

  .input-box {
    background: #FFFFFF;
    border: 1px solid transparent;
    box-sizing: border-box;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 40px;
    padding: 10px 20px 10px 20px;
    margin: 10px 0 10px 0;
    font-size: 1em;
    width: 100%;
    outline: none;
  }

  .title {
    padding: 15px 25px 15px 25px;
    font-weight: bold;
    color: #505050;
  }

  .input-box:hover {
    transition: all .3s ease;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.1), 2px 2px 10px rgba(0,0,0,0.3);
  }

  .input-box:focus {
    box-shadow: 2px 2px 10px rgba(0,0,0,0.1), 2px 2px 10px rgba(0,0,0,0.3);
    width: 100%;
    outline: none;
  }

  .search-box {
    height: 30px;
    padding-right: 60px;
  }

  .search-box::placeholder {
    text-align: right;
    color: rgba(0, 0, 0, 0.2);
  }

  .message-box {
    margin: 0;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    border: 2px solid #02AAF3;
  }

  .reminder-input:disabled {
    background: #ffffff;
    color: rgb(84, 84, 84);
  }

  .wrong-input {
    border: 2px solid #cb2431;
  }

  .blue-input {
    background-color: #02AAF3;
    color: white;
  }
</style>
