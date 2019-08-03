<template>
  <div class="scrollable-container">
    <div class="form-container">
      <div class="row">
        <div class="column image-column">
          <div class="image" :style="{ backgroundImage: 'url(' + avatarPreview + ')' }">
            <label class="image-edit" v-if="!showModalChangeProfilePicture">
              <input type="file"
                     name="image"
                     accept="image/*"
                     @change="onFileChange($event)"
                     style="display: none"/>
              <font-awesome-icon icon="pencil-alt" class="icon"/> edit
            </label>
          </div>
          <div class="alert" v-if="maximumSizeAlert">
            <span>Please upload a picture smaller than 1 MB.</span>
          </div>
        </div>
        <div class="column input-column">
          <div class="input-wrapper">
            <div class="input-label inline">Name</div>
            <div class="input inline">
              <BaseInput v-model="profile.name" disabled>
              </BaseInput>
            </div>
          </div>
          <div class="input-wrapper">
            <div class="input-label inline">Phone</div>
            <div class="input inline">
              <BaseInput v-model="profile.phone" disabled></BaseInput>
            </div>
          </div>
          <div class="input-wrapper">
            <div class="input-label inline">Email</div>
            <div class="input inline">
              <BaseInput v-model="profile.email" disabled></BaseInput>
            </div>
          </div>
          <div class="input-wrapper" v-if="profile.role === 'STUDENT'">
            <div class="input-label inline">University</div>
            <div class="input inline">
              <BaseInput v-model="profile.university" disabled></BaseInput>
            </div>
          </div>
          <div class="input-wrapper" v-if="profile.role !== 'STUDENT'">
            <div class="input-label inline">Role</div>
            <div class="input inline">
              <BaseInput v-model="profile.role" disabled></BaseInput>
            </div>
          </div>
          <div class="input-wrapper">
            <div class="input-label inline">Address</div>
            <div class="input inline">
              <BaseInput v-model="profile.address" disabled></BaseInput>
            </div>
          </div>
          <div class="input-wrapper" v-if="profile.role === 'STUDENT'">
            <div class="input-label inline">Batch</div>
            <div class="input inline">
              <BaseInput v-model="profile.batch.code" disabled></BaseInput>
            </div>
          </div>
          <div class="input-wrapper change-password-wrapper">
            <div class="input-label inline"></div>
            <BaseButton type="submit" buttonClass="button-save" @click="goToChangePassword"
                        class="change-password-button">
              Change Password
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
    <modal-change-profile-picture-preview @save="sendUpdatedProfilePictureId"
                                  @close="showModalChangeProfilePicture = false"
                                  v-if="showModalChangeProfilePicture"
                                  :newAvatar="newAvatar">
    </modal-change-profile-picture-preview>
  </div>
</template>

<script type="text/javascript" src="./js/profile.js"></script>

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
    width: 15%;
    text-align: left;
  }

  .input-wrapper {
    margin-left: 25px;
    text-align: left;
    width: 100%;
  }

  .input {
    width: 50%;

    @media only screen and (max-width: 1200px) {
      width: 65%;
    }
  }

  .inline {
    display: inline-block;
  }

  .alert {
    margin-top: 10px;
    text-align: left;
    color: #cb2431 !important;
  }

  .change-password-wrapper {
    margin-top: 15px;
  }

  .change-password-button {
    font-size: 14px;
    padding: 10px 20px;
    width: auto;
  }

  /deep/ {
    .input-box:disabled {
      background: #f2f2f2;
      border: #f2f2f2;
    }

    .input-box:hover {
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
    }
  }
</style>
