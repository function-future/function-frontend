<template>
  <div class="reminder-form__container">
    <BaseButton @click="handleTopBtnClick" buttonClass="button-save" class="reminder-form__edit-btn">{{ edit ? 'Save' : 'Edit' }}</BaseButton>
    <h3>Title</h3>
    <BaseInput maxlength="30" class="reminder-form__input" inputType="reminder-input" :disabled="!edit" :value="reminder ? reminder.title : ''"></BaseInput>
    <h3>Description</h3>
    <BaseTextArea maxlength="140" class="reminder-form__input" inputType="reminder-input" :disabled="!edit" :value="reminder ? reminder.description : ''"></BaseTextArea>
    <h3>Members</h3>
    <div class="reminder-form__member">
      <template v-for="(user, index) in computedUser">
        <UserSimpleCard :showRemove="edit" @remove="removeMember(index)" class="reminder-form__member__card" :user="user" :key="user.id"></UserSimpleCard>
      </template>
      <font-awesome-icon v-if="edit" @click="showModalMember = true" icon="plus" class="reminder-form__add-member-btn"></font-awesome-icon>
    </div>
    <h3>Time</h3>
    <!--    {{ editMode }}-->
<!--    {{ $route.params.reminderId }}-->
    <ReminderMemberModal @addMember="addMemberHandler" :selectedUsers="computedUser" @close="showModalMember = false" v-if="showModalMember"></ReminderMemberModal>
  </div>
</template>

<script src="./js/reminder-form.js">

</script>

<style scoped>
  h3 {
    margin: 10px 0 0 0;
    align-self: flex-start;
  }

  .reminder-form__container {
    padding: 0 10px;
    max-width: 50vw;
    max-height: 88vh;
    overflow: auto;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .reminder-form__input {
    width: 100%;
  }

  .reminder-form__edit-btn {
    height: 50%;
    width: auto;
    font-size: 0.9em;
    align-self: flex-end;
  }

  .reminder-form__add-member-btn {
    align-self: center;
    cursor: pointer;
  }

  .reminder-form__member {
    margin-top: 10px;
    display: flex;
    align-self: flex-start;
    flex-wrap: wrap;
  }

  .reminder-form__member__card {
    margin-right: 10px;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #FFF;
    -webkit-box-shadow: inset 1px 1px 2px rgba(0,0,0,0.1);
  }
  ::-webkit-scrollbar-thumb {
    background: #CCC;
    -webkit-box-shadow: inset 1px 1px 2px rgba(0,0,0,0.2);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #AAA;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #888;
    -webkit-box-shadow: inset 1px 1px 2px rgba(0,0,0,0.3);
  }

</style>
