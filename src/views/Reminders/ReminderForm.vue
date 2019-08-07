<template>
  <div class="reminder-form__container">
    <BaseButton @click="handleTopBtnClick" buttonClass="button-save" class="reminder-form__edit-btn">{{ editMode ? 'Save' : 'Edit' }}</BaseButton>
    <h3>Title</h3>
    <BaseInput maxlength="30" class="reminder-form__input" inputType="reminder-input" :disabled="!editMode" v-model="title"></BaseInput>
    <h3>Description</h3>
    <BaseTextArea maxlength="140" class="reminder-form__input" inputType="reminder-input" :disabled="!editMode" v-model="description"></BaseTextArea>
    <h3>Members</h3>
    <div class="reminder-form__member">
      <template v-for="(user, index) in members">
        <UserSimpleCard :showRemove="editMode" @remove="removeMember(index)" class="reminder-form__member__card" :user="user" :key="user.id"></UserSimpleCard>
      </template>
      <font-awesome-icon v-if="editMode" @click="showModalMember = true" icon="plus" class="reminder-form__add-member-btn"></font-awesome-icon>
    </div>
    <h3>Time</h3>
    <h4>How Often ?</h4>
    <div class="reminder-form__time"><input type="radio" :disabled="!editMode" name="how-often" value="EVERY_DAY" v-model="timeType">
      <p>Every Day</p>
    </div>
    <div class="reminder-form__time"><input type="radio" :disabled="!editMode" value="WEEKLY" v-model="timeType" name="how-often">
      <p>Weekly on...</p>
    </div>
    <div class="reminder-form__days-container" v-if="timeType === 'WEEKLY'">
      <div
        class="reminder-form__day-card"
        v-for="(day, index) in days"
        :key="index"
        @click="dayClickHandler(day)"
        :class="{'reminder-form__day-card--border-blue': daysChosen.includes(day)}">
        <p>{{ toDisplayDay(day) }}</p>
      </div>
    </div>
    <div class="reminder-form__time"><input type="radio" :disabled="!editMode" value="MONTHLY" v-model="timeType" name="how-often">
      <p>Monthly on...</p>
    </div>
    <input v-if="timeType === 'MONTHLY'" :disabled="!editMode" v-model="date" class="reminder-form__date" type="number" min="1" max="31">
    <h4>When ?</h4>
    <VueCtkDateTimePicker
      class="reminder-form__time-picker"
      color="#02AAF3"
      button-color="#02AAF3"
      :only-time="true"
      :no-label="true"
      :disabled="!editMode"
      format="HH:mm"
      formatted="HH:mm"
      v-model="time"></VueCtkDateTimePicker>
    <ReminderMemberModal @addMember="addMemberHandler" :selectedUsers="members" @close="showModalMember = false" v-if="showModalMember"></ReminderMemberModal>
  </div>
</template>

<script src="./js/reminder-form.js">

</script>

<style scoped>
  h3 {
    margin: 20px 0 0 0;
    align-self: flex-start;
  }
  h4 {
    margin: 10px 0 0 0;
    align-self: flex-start;
  }
  p {
    margin: 0;
    align-self: flex-start;
  }

  .reminder-form__days-container {
    display: flex;
    flex-wrap: wrap;
    align-self: flex-start;
    margin-top: 10px;
  }

  .reminder-form__time-picker {
    width: 100px;
    margin: 10px auto 0 0;
  }

  .reminder-form__day-card {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 50px;
    margin-right: 10px;
    padding: 5px 10px;
    border-radius: 7px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.07);
    -moz-box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.07);
    box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.07);
    cursor: pointer;
  }

  .reminder-form__date {
    align-self: flex-start;
    width: 50px;
    border-radius: 7px;
    margin-top: 10px;
    border: 2px solid #02AAF3;
    outline: none;
    -webkit-appearance: none;
    text-align: center;
  }

  .reminder-form__day-card--border-blue {
    border: 2px solid #02AAF3;
  }

  .selected-user-card > p {
    margin: 0;
    font-size: 0.8rem;
  }

  .reminder-form__time {
    display: flex;
    align-self: flex-start;
    align-items: center;
    margin-top: 10px;
  }

  .reminder-form__time > input {
    margin: 0 10px 0 0;
  }

  .reminder-form__container {
    padding: 0 100px 0 100px;
    width: 50vw;
    max-height: 85vh;
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
