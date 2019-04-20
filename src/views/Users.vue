<template>
  <div class="scrollable-container">
    <div class="button-div">
      <BaseButton type="submit" buttonClass="button-save">
        <span><font-awesome-icon icon="plus" class="icon"/> New</span>
      </BaseButton>
    </div>
    <UserCard></UserCard>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseButton from '@/components/BaseButton'
import UserCard from '@/components/users/UserCard'

export default {
  name: 'announcements',
  components: {
    UserCard,
    BaseButton
  }
}
</script>

<style scoped>
  .button-div {
    text-align: right;
    margin-right: 20px;
  }
</style>
