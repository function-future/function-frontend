<template>
  <div class="scrollable-container">
    <div class="edit-container">
      <div class="title">
        <BaseInput class="input-title" inputType="title"></BaseInput>
      </div>
      <div class="description">
        <!--<BaseInput class="input-description"></BaseInput>-->
        <BaseTextArea class="input-description"></BaseTextArea>
      </div>
      <div class="action">
        <div class="submit-button">
          <BaseButton type="submit" buttonClass="button-save">Save</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BaseInput from '@/components/BaseInput'
  import BaseCard from '@/components/BaseCard'
  import BaseButton from '@/components/BaseButton'
  import BaseTextArea from '@/components/BaseTextArea'

  export default {
    components: {
      BaseButton,
      BaseCard,
      BaseInput,
      BaseTextArea
    }
  }
</script>

<style>
  .edit-container {
    margin: 10px;
  }

  .input-title {
    margin-right: 10px;
    width: 100%;
    font-size: 1.2em;
  }

  .description {
    height: 425px;
  }

  .input-description {
    height: 400px;
  }

  .action {
    display: flex;
    justify-content: flex-end;
  }
</style>
