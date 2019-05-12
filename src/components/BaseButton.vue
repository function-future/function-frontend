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
    padding: 5px 10px 5px 10px;
    width: 125px;
    border-radius: 40px;
    /*font-family: Roboto;*/
    color: white;
    font-style: normal;
    font-weight: bold;
    font-size: 1.2em;
    line-height: normal;
    text-align: center;
    transition: all .2s ease;
    margin: 2px 0 2px 0;
  }

  .button:active {
    opacity: 0.9;
  }

  .button:hover {
    box-shadow: 2px 2px 8px rgba(0,0,0,0.08), 2px 2px 10px rgba(0,0,0,0.15);
  }

  .button:focus {
    outline:none;
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

  .button-icon {
    width: unset;
    background: #02AAF3;
  }
</style>
