<template>
  <div>
    <button v-on="$listeners" v-bind="$attrs" class="button" :class="buttonClass">
      <slot></slot>
    </button>
  </div>
</template>

<script type="text/javascript" src="./js/BaseButton.js">
</script>

<style scoped>
  .button {
    border: none;
    padding: 10px;
    width: 150px;
    border-radius: 40px;
    /*font-family: Roboto;*/
    color: white;
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
    line-height: normal;
    text-align: center;
  }

  .button-save {
    background: #02AAF3;
  }

  .button-cancel {
    background: #828282;
  }

  .button-delete {
    background: #FF0000;
  }

  .button-edit {
    background: #45C92F;
  }
</style>
