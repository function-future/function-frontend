<template>
  <div class="reminder-form__container">
    <b-button @click="handleTopBtnClick"
              size="is-medium"
              class="reminder-form__edit-btn is-primary">{{ editMode ? 'Save' : 'Edit' }}
    </b-button>
    <b-field label="Title" label-position="on-border">
      <b-input expanded maxlength="30" class="reminder-form__input" inputType="reminder-input" :disabled="!editMode"
               size="is-medium"
               v-model="title"></b-input>
    </b-field>
    <b-field label="Description" label-position="on-border">
      <b-input expanded maxlength="140" class="reminder-form__input" inputType="reminder-input" :disabled="!editMode"
               type="textarea"
               size="is-medium"
               v-model="description"></b-input>
    </b-field>
    <div class="reminder-form__detail">
      <h3>Members</h3>
      <div class="reminder-form__member">
        <template v-for="(user, index) in members">
          <UserSimpleCard :showRemove="editMode" @remove="removeMember(index)" class="reminder-form__member__card"
                          :user="user" :key="user.id"></UserSimpleCard>
        </template>
        <b-button class="is-rounded is-primary create-button reminder-form__add-member-btn"
                  icon-left="plus"
                  size="is-small"
                  type="submit"
                  v-if="editMode" @click="showModalMember = true">
          <span>New</span>
        </b-button>
      </div>
      <h3>Time</h3>
      <h4>How Often ?</h4>
      <div class="reminder-form__time"><input type="radio" :disabled="!editMode" name="how-often" value="EVERY_DAY"
                                              v-model="timeType">
        <p>Every Day</p>
      </div>
      <div class="reminder-form__time"><input type="radio" :disabled="!editMode" value="WEEKLY" v-model="timeType"
                                              name="how-often">
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
      <div class="reminder-form__time"><input type="radio" :disabled="!editMode" value="MONTHLY" v-model="timeType"
                                              name="how-often">
        <p>Monthly on...</p>
      </div>
      <input v-if="timeType === 'MONTHLY'" :disabled="!editMode" v-model="date" class="reminder-form__date"
             type="number" min="1" max="31">
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
      <ReminderMemberModal @addMember="addMemberHandler" :selectedUsers="members" @close="showModalMember = false"
                           v-if="showModalMember"></ReminderMemberModal>
    </div>
  </div>
</template>

<script src="./js/reminder-form.js">

</script>

<style lang="scss" scoped>
  h3 {
    margin: 1.3rem 0 0 0;
    align-self: flex-start;
    font-size: 1.5rem;
  }

  h4 {
    margin: 0.8rem 0 0 0;
    align-self: flex-start;
    font-size: 1.3rem;
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
    max-height: 85vh;
    overflow: auto;
    margin: 0 auto;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    @media only screen and (max-width: 1023px) {
      width: 100vw;
      padding: 10px;
      max-height: 80vh;
    }
  }

  .reminder-form__input {
    width: 100%;
  }

  .reminder-form__edit-btn {
    width: auto;
    font-size: 0.9em;
    align-self: flex-end;
    margin-bottom: 20px;
  }

  .reminder-form__add-member-btn {
    align-self: center;
    margin: 3px 10px 3px 3px;
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

</style>
