<template>
  <div class="auto-overflow-container">
    <div class="profile__container columns">
      <div class="profile__container__image-wrapper column is-4">
        <figure class="profile__container__image image is-128x128 is-image-horizontal-center">
          <img class="is-rounded" :src="avatarPreview">
        </figure>
        <div class="profile__container__image-change-confirmation" v-if="changeProfilePictureConfirmation">
          <div class="buttons">
            <b-button type="is-light" @click="cancelChangeProfilePicture">Cancel</b-button>
            <b-button type="is-primary"
                      @click="sendUpdatedProfilePictureId"
                      :loading="updatingProfilePicture">
              Save
            </b-button>
          </div>
        </div>
        <div v-else>
          <label for="upload-image"
                 class="button is-primary is-outlined"
                 :class="{'is-loading': uploadingProfilePicture}">
            Edit Picture
          </label>
          <input type="file"
                 name="image"
                 accept=".jpg, .jpeg, .png"
                 id="upload-image"
                 @change="onFileChange($event)"
                 style="display: none"/>
        </div>
        <div class="is-size-7 has-text-grey has-text-centered profile__container__image-message">
          <span :class="{'has-text-danger': maximumSizeAlert}">
            Only picture (PNG or JPG) smaller than 1 MB is allowed.
          </span>
        </div>
      </div>
      <div class="profile__container__form column is-8">
        <div class="profile__container__form-input">
          <b-field label="Name" label-position="on-border">
            <b-input disabled
                     v-model="profile.name"
                     name="name">
            </b-input>
          </b-field>
        </div>
        <div class="profile__container__form-input">
          <b-field label="Phone" label-position="on-border">
            <b-input disabled
                     v-model="profile.phone"
                     name="phone"
                     type="tel">
            </b-input>
          </b-field>
        </div>
        <div class="profile__container__form-input">
          <b-field label="Email" label-position="on-border">
            <b-input disabled
                     v-model="profile.email"
                     name="email"
                     type="email">
            </b-input>
          </b-field>
        </div>
        <div class="profile__container__form-input" v-if="profile.role === 'STUDENT'">
          <b-field label="University" label-position="on-border">
            <b-input disabled
                     v-model="profile.university"
                     name="university">
            </b-input>
          </b-field>
        </div>
        <div class="profile__container__form-input" v-if="profile.role !== 'STUDENT'">
          <b-field label="University" label-position="on-border">
            <b-input disabled
                     v-model="profile.role"
                     name="role">
            </b-input>
          </b-field>
        </div>
        <div class="profile__container__form-input">
          <b-field label="Address" label-position="on-border">
            <b-input disabled
                     v-model="profile.address"
                     name="address">
            </b-input>
          </b-field>
        </div>
        <div class="profile__container__form-input" v-if="profile.role === 'STUDENT'">
          <b-field label="Batch" label-position="on-border">
            <b-input disabled
                     v-model="profile.batch.code"
                     name="batch">
            </b-input>
          </b-field>
        </div>
        <div class="profile__container__form-input is-hidden-touch">
          <b-button type="is-primary" @click="goToChangePassword">
            Change Password
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/profile.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .profile {
    &__container {
      padding: 1rem 1.25rem;
      margin: 0 0.25rem 0.25rem 0.25rem;

      &__image {
        margin-bottom: 0.75rem;

        &-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 3rem;

          @media only screen and (max-width: 768px) {
            margin-bottom: 0.5rem;
          }
        }

        &-change-confirmation {
          display: flex;
        }

        &-message {
          margin-top: 0.75rem;
        }
      }

      &__form {
        margin-bottom: 3rem;

        &-input {
          margin-bottom: 1.5rem;
        }

        &-actions {
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
</style>
