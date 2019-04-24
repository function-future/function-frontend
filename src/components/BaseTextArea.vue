<template>
    <div>
      <label v-if="label" class="textarea-label">{{ label }}</label>
      <textarea
        @input="updateValue"
        class="textarea-box"
        v-bind="$attrs">
      </textarea><!-- Binding attrs allows attribute inheritance such as type="text" , etc! -->
    </div>
</template>

<script type="text/javascript" src="./js/BaseTextArea.js">
</script>

<style scoped>
  .textarea-label {
    margin-right: 20px;
  }

  .textarea-box {
    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    padding: 20px;
    margin: 10px 0 10px 0;
    font-size: 1em;
    resize: none;
    width: 100%;
    height: 100%;
    outline: none;
  }

  .textarea-box:hover {
    transition: all .3s ease;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.1), 2px 2px 10px rgba(0,0,0,0.3);
  }

  .textarea-box:focus {
    box-shadow: 2px 2px 10px rgba(0,0,0,0.1), 2px 2px 10px rgba(0,0,0,0.3);
  }
</style>
