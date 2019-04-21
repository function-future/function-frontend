<template>
  <div class="scrollable-container">
    <BaseCard>
      <div class="title">
        <BaseInput class="input-title"></BaseInput>
      </div>
      <div class="description">
        <BaseInput class="input-description"></BaseInput>
      </div>
      <div class="action">
        <BaseButton type="submit" buttonClass="button-save">Save</BaseButton>
      </div>
    </BaseCard>
  </div>
</template>

<script>
  import BaseInput from '@/components/BaseInput'
  import BaseCard from '@/components/BaseCard'
  import BaseButton from '@/components/BaseButton'

  export default {
    components: {
      BaseButton,
      BaseCard,
      BaseInput
    }
  }
</script>

<style>
  .input-title {
    margin-right: 10px;
  }
</style>
