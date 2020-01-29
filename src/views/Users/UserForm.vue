<template>
  <div class="auto-overflow-container">
    <b-loading :is-full-page="false" :active.sync="isLoading"></b-loading>
    <div class="user-form__container columns" v-if="!isLoading">
      <div class="user-form__container__image-wrapper column is-4">
        <figure class="user-form__container__image image is-128x128 is-image-horizontal-center">
          <img class="is-rounded" :src="avatarPreview">
        </figure>
        <label for="upload-image"
               class="button is-primary is-outlined">
          Edit Picture
        </label>
        <input type="file"
               name="image"
               accept=".jpg, .jpeg, .png"
               id="upload-image"
               @change="onFileChange($event)"
               style="display: none"/>
        <div class="is-size-7 has-text-grey has-text-centered user-form__container__image-message">
          <span :class="{'has-text-danger': maximumSizeAlert}">
            Only picture (PNG or JPG) smaller than 1 MB is allowed.
          </span>
        </div>
      </div>
      <div class="user-form__container__form column is-8">
        <div class="user-form__container__form-input">
          <b-field label="Name" label-position="on-border">
            <b-input autofocus
                     v-model="userDetail.name"
                     name="name"
                     @focus="hideBottomNavBar"
                     @blur="showBottomNavBar"
                     v-validate.continues="'required|alpha_spaces'">
            </b-input>
          </b-field>
          <div v-if="errors.has('name')"><span class="input-invalid-message">{{ errors.first('name') }}</span></div>
        </div>
        <div class="user-form__container__form-input">
          <b-field label="Phone" label-position="on-border">
            <b-input v-model="userDetail.phone"
                     name="phone"
                     type="tel"
                     @focus="hideBottomNavBar"
                     @blur="showBottomNavBar"
                     v-validate.continues="'required|numeric|min:10|max:13'">
            </b-input>
          </b-field>
          <div v-if="errors.has('phone')"><span class="input-invalid-message">{{ errors.first('phone') }}</span></div>
        </div>
        <div class="user-form__container__form-input">
          <b-field label="Email" label-position="on-border">
            <b-input v-model="userDetail.email"
                     name="email"
                     type="email"
                     @focus="hideBottomNavBar"
                     @blur="showBottomNavBar"
                     v-validate.continues="'required|email'">
            </b-input>
          </b-field>
          <div v-if="errors.has('email')"><span class="input-invalid-message">{{ errors.first('email') }}</span></div>
        </div>
        <div class="user-form__container__form-input" v-if="studentMode">
          <b-field label="University" label-position="on-border">
            <b-input v-model="userDetail.university"
                     name="university"
                     @focus="hideBottomNavBar"
                     @blur="showBottomNavBar"
                     v-validate.continues="'required|min:2'">
            </b-input>
          </b-field>
          <div v-if="errors.has('university')"><span class="input-invalid-message">{{ errors.first('university') }}</span></div>
        </div>
        <div class="user-form__container__form-input" v-if="!studentMode">
          <b-field label="Role" label-position="on-border">
            <b-select v-model="userDetail.role"
                      placeholder="Select role"
                      name="role"
                      expanded
                      v-validate.continues="'required'">
              <option v-for="role in roles"
                      :value="role.value"
                      :key="role.value">
                {{ role.name }}
              </option>
            </b-select>
          </b-field>
          <div v-if="errors.has('role')"><span class="input-invalid-message">{{ errors.first('role') }}</span></div>
        </div>
        <div class="user-form__container__form-input">
          <b-field label="Address" label-position="on-border">
            <b-input v-model="userDetail.address"
                     name="address"
                     @focus="hideBottomNavBar"
                     @blur="showBottomNavBar"
                     v-validate.continues="'required|min:5'">
            </b-input>
          </b-field>
          <div v-if="errors.has('address')"><span class="input-invalid-message">{{ errors.first('address') }}</span></div>
        </div>
        <div class="user-form__container__form-input" v-if="studentMode">
          <b-field label="Batch" label-position="on-border">
            <b-select v-model="userDetail.batch.code"
                      placeholder="Select batch"
                      name="batch"
                      expanded
                      :loading="isFetchingBatches"
                      v-validate.continues="'required'">
              <option v-for="batch in batches"
                      :value="batch.code"
                      :key="batch.code">
                {{ batch.name }}
              </option>
            </b-select>
          </b-field>
          <div v-if="errors.has('batch')"><span class="input-invalid-message">{{ errors.first('batch') }}</span></div>
        </div>
        <div class="user-form__container__form-actions">
          <div class="buttons">
            <b-button type="is-light" @click="cancel">Cancel</b-button>
            <b-button type="is-primary" @click="save" :loading="isSubmitting">Save</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/user-form.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .user-form {
    &__container {
      padding: 1rem 1.25rem;
      margin: 0.25rem 0;

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

        &-message {
          margin-top: 0.75rem;
        }
      }

      &__form {
        &-input {
          margin-bottom: 1.25rem;
        }

        &-actions {
          display: flex;
          justify-content: flex-end;

          @media only screen and (max-width: 768px) {
            margin-bottom: 2.5rem;
          }
        }
      }
    }
  }
</style>
