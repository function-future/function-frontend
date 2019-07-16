<template>
  <div class="scrollable-container">
    <div class="form-container">
      <div class="row">
        <div class="column input-column">
          <div class="input-wrapper">
            <div class="input-label inline">Current Password</div>
            <div class="input inline">
              <BaseInput v-model="data.oldPassword" autofocus
                         type="password"
                         v-validate.continues="'required'"
                         name="current password">
              </BaseInput>
              <div v-if="errors.has('current password')">
                <span class="input-invalid-message">{{ errors.first('current password') }}</span>
              </div>
            </div>
          </div>
          <div class="input-wrapper">
            <div class="input-label inline">New Password</div>
            <div class="input inline">
              <BaseInput v-model="data.newPassword"
                         type="password"
                         v-validate.continues="'required|min:5'"
                         name="password" ref="password">
              </BaseInput>
              <div v-if="errors.has('password')">
                <span class="input-invalid-message">{{ errors.first('password') }}</span>
              </div>
            </div>
          </div>
          <div class="input-wrapper">
            <div class="input-label inline">Repeat New Password</div>
            <div class="input inline">
              <BaseInput v-model="repeatPassword"
                         type="password"
                         v-validate.continues="'required|min:5|confirmed:password'"
                         name="repeatPassword" data-vv-as="password">
              </BaseInput>
              <div v-if="errors.has('repeatPassword')">
                <span class="input-invalid-message">{{ errors.first('repeatPassword') }}</span>
              </div>
            </div>
          </div>
          <div class="input-wrapper">
            <div class="input-label inline"></div>
            <div class="input inline">
              <div class="action">
                <div class="action-button">
                  <BaseButton type="cancel" buttonClass="button-cancel" @click="cancel">Cancel</BaseButton>
                </div>
                <div class="action-button">
                  <BaseButton type="submit" buttonClass="button-save" @click="save">Save</BaseButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/change-password.js"></script>

<style lang="scss" scoped>
  .form-container {
    margin: 10px;
  }

  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }

  .column {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }

  .image-column {
    padding: 20px 10px;
    width: 15vw;
  }

  .image-title {
    text-align: left;
  }

  .image {
    width: 100%;
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    padding-top: 100%;
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .image-edit {
    cursor: pointer;
    background-color: #828282;
    color: #FFFFFF;
    padding: 5px 10px;
    border-radius: 5px;
    opacity: 0.9;
    position: absolute;
    right: 10px;
    bottom: 10px;
  }

  .input-column {
    flex: 2
  }

  .input-label {
    width: 20%;
    text-align: left;

    @media only screen and (max-width: 1150px) {
      width: 30%;
    }
  }

  .input-wrapper {
    margin-left: 5px;
    text-align: left;
    width: 100%;
  }

  .action {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }

  .action-button {
    display: inline-block;
    padding-left: 10px;
  }

  .input {
    width: 35%;

    @media only screen and (max-width: 1200px) {
      width: 45%;
    }
  }

  .inline {
    display: inline-block;
  }

  .input-invalid-message {
    color: #FF0000;
    font-size: 0.75em;
    float: left;
    margin-left: 2vw;
  }
</style>
