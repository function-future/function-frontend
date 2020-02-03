<template>
    <div class="logging-room-create" v-if="accessList.edit">
      <div class="logging-room-create__container">
        <div class="logging-room-create__content">
          <div class="logging-room-create__save-button">
            <b-button class="is-rounded is-primary  save-btn"
                      type="submit" buttonClass="button-save"
                      icon-left="save"
                      @click="saveLoggingRoom">
              <span>Save</span>
            </b-button>
          </div>
          <div class="logging-room-create__input-title">
            <label>{{titleLabel}}</label>
            <b-input class="input-title" v-model="titleTemp"></b-input>
          </div>
          <div class="logging-room-create__input-description">
            <label>{{descriptionLabel}}</label>
            <b-input type="textarea" class="input-description" v-model="descriptionTemp"></b-input>
          </div>
          <div class="logging-room-create__input-participant">
            MEMBERS
            <div class="logging-room-create__input-participant__add-btn">
              <b-button class="is-rounded is-primary  add-btn"
                        type="submit"
                        buttonClass="button-save"
                        icon-left="plus"
                        @click="participantModal = true">
                <span>Add</span>
              </b-button>
            </div>
          </div>
          <div class="logging-room-create__participant-list">
            <template v-for="(member,index) in membersTemp">
              <UserSimpleCard :user="member" @remove="removeParticipant(index)"></UserSimpleCard>
            </template>
          </div>
        </div>
        <ReminderMemberModal
          @addMember="addParticipant"
          :selectedUsers="members"
          :isLoggingRoomSearch="true"
          @close="participantModal = false"
          v-if="participantModal"></ReminderMemberModal>
      </div>
    </div>
</template>

<script src="./js/logging-room-create.js">
</script>

<style lang="scss" scoped>

  * {
    padding: 0px;
    margin: 0px;
  }

  .logging-room-create {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 90vh;
    width: 100%;

    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 40vw;

      @media only screen and (max-width: 1023px) {
        width: 100vw;
        padding: 10px;
      }
    }

    &__content {
      width: 100%;
      display: flex;
      background: #FFFFFF;
      border: 1px solid #F2F2F2;
      box-sizing: border-box;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      text-align: left;
      margin: 5px 10px;
      padding: 10px;
      flex-direction: column;
      height: auto;
    }

    &__input-participant {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &__add-btn {
        margin: 5px 0px;
        font-size: 0.5rem;
        width: fit-content;
      }
    }

    &__participant-list {
      display: flex;
    }

    &__save-button {
      display: flex;
      justify-content: flex-end;
    }
  }

  .icon-plus {
    font-size: small;
  }

  .add-btn {
    width: 75px;
  }
</style>
