<template>
  <div class="auto-overflow-container">
    <div class="columns">
      <div class="column is-6 is-full-touch">
        <div class="change-password-form__container">
          <b-notification type="is-danger" :active.sync="showErrorMessage">
            Old password is not valid
          </b-notification>
          <div class="change-password-form__container-input">
            <b-field label="Old password" label-position="on-border">
              <b-input v-model="data.oldPassword" autofocus
                       type="password"
                       v-validate.continues="'required'"
                       @focus="hideBottomNavBar"
                       @blur="showBottomNavBar"
                       name="current password">
              </b-input>
            </b-field>
            <div v-if="errors.has('current password')">
              <span class="input-invalid-message">{{ errors.first('current password') }}</span>
            </div>
          </div>
          <div class="change-password-form__container-input">
            <b-field label="New password" label-position="on-border">
              <b-input v-model="data.newPassword"
                       type="password"
                       v-validate.continues="'required|min:5'"
                       @focus="hideBottomNavBar"
                       @blur="showBottomNavBar"
                       name="password" ref="password">
              </b-input>
            </b-field>
            <div v-if="errors.has('password')">
              <span class="input-invalid-message">{{ errors.first('password') }}</span>
            </div>
          </div>
          <div class="change-password-form__container-input">
            <b-field label="Confirm new password" label-position="on-border">
              <b-input v-model="repeatPassword"
                       type="password"
                       v-validate.continues="'required|min:5|confirmed:password'"
                       @focus="hideBottomNavBar"
                       @blur="showBottomNavBar"
                       name="repeatPassword" data-vv-as="password" @keyup.enter.native="save">
              </b-input>
            </b-field>
            <div v-if="errors.has('repeatPassword')">
              <span class="input-invalid-message">{{ errors.first('repeatPassword') }}</span>
            </div>
          </div>
          <div class="change-password-form__container-actions">
            <div class="buttons">
              <b-button type="is-light" @click="cancel">Cancel</b-button>
              <b-button type="is-primary" @click="save" :loading="isSubmitting">Save</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/change-password.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .change-password-form {
    &__container {
      padding: 2rem 1.25rem;
      margin-bottom: 10vh;

      &-input {
        display: flex;
        flex-direction: column;
        margin-bottom: 1.25rem;
      }

      &-actions {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
