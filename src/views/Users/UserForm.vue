<template>
  <div class="auto-overflow-container">
    <b-loading :is-full-page="false" :active.sync="isLoading"></b-loading>
    <div class="user-form__container">
      <div class="user-form__container__image-wrapper">
        <div class="user-form__container__image-content" :style="{ backgroundImage: 'url(' + avatarPreview + ')' }">
          <input type="file"
                 name="image"
                 accept=".jpg, .jpeg, .png"
                 id="upload-image"
                 @change="onFileChange($event)"
                 style="display: none"/>
          <label for="upload-image" class="image-edit"><b-icon icon="pencil-alt"></b-icon> edit</label>
        </div>
        <div class="alert" v-if="maximumSizeAlert">
          <span>Please upload a picture smaller than 1 MB.</span>
        </div>
      </div>
      <div class="user-form__container__form">
        <div class="user-form__container__form-input">
          <b-field label="Name">
            <b-input autofocus
                     v-model="userDetail.name"
                     name="name"
                     v-validate.continues="'required|alpha_spaces'">
            </b-input>
          </b-field>
          <div v-if="errors.has('name')"><span class="input-invalid-message">{{ errors.first('name') }}</span></div>
        </div>
        <div class="user-form__container__form-input">
          <b-field label="Phone">
            <b-input v-model="userDetail.phone"
                     name="phone"
                     type="tel"
                     v-validate.continues="'required|numeric|min:10|max:13'">
            </b-input>
          </b-field>
          <div v-if="errors.has('phone')"><span class="input-invalid-message">{{ errors.first('phone') }}</span></div>
        </div>
        <div class="user-form__container__form-input">
          <b-field label="Email">
            <b-input v-model="userDetail.email"
                     name="email"
                     type="email"
                     v-validate.continues="'required|email'">
            </b-input>
          </b-field>
          <div v-if="errors.has('email')"><span class="input-invalid-message">{{ errors.first('email') }}</span></div>
        </div>
        <div class="user-form__container__form-input" v-if="studentMode">
          <b-field label="University">
            <b-input v-model="userDetail.university"
                     name="university"
                     v-validate.continues="'required|min:2'">
            </b-input>
          </b-field>
          <div v-if="errors.has('university')"><span class="input-invalid-message">{{ errors.first('university') }}</span></div>
        </div>
        <div class="user-form__container__form-input" v-if="!studentMode">
          <b-field label="Role">
            <b-select v-model="userDetail.role"
                      placeholder="Select role"
                      name="role"
                      expanded
                      v-validate.continues="'required'">
              <option
                v-for="role in roles"
                :value="role.id"
                :key="role.id">
                {{ role.name }}
              </option>
            </b-select>
          </b-field>
          <div v-if="errors.has('role')"><span class="input-invalid-message">{{ errors.first('role') }}</span></div>
        </div>
        <div class="user-form__container__form-input">
          <b-field label="Address">
            <b-input v-model="userDetail.address"
                     name="address"
                     v-validate.continues="'required|min:5'">
            </b-input>
          </b-field>
          <div v-if="errors.has('address')"><span class="input-invalid-message">{{ errors.first('address') }}</span></div>
        </div>
        <div class="user-form__container__form-input" v-if="studentMode">
          <b-field label="Batch">
            <b-input v-model="userDetail.batch.code"
                     name="batch"
                     v-validate.continues="'required'">
            </b-input>
          </b-field>
          <div v-if="errors.has('batch')"><span class="input-invalid-message">{{ errors.first('batch') }}</span></div>
        </div>
      </div>
    </div>
  </div>
  <!--<div class="scrollable-container">-->
    <!--<div class="form-container" v-if="!isLoading || !editMode">-->
      <!--<div class="row">-->
        <!--<div class="column image-column">-->

        <!--</div>-->
        <!--<div class="column input-column">-->
          <!--<div class="input-wrapper">-->
            <!--<div class="input-label inline">Name</div>-->
            <!--<div class="input inline">-->
              <!--<BaseInput autofocus-->
                         <!--v-model="userDetail.name"-->
                         <!--v-validate.continues="'required|alpha_spaces'"-->
                         <!--name="name"></BaseInput>-->
              <!--<div v-if="errors.has('name')"><span class="input-invalid-message">{{ errors.first('name') }}</span></div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="input-wrapper">-->
            <!--<div class="input-label inline">Phone</div>-->
            <!--<div class="input inline">-->
              <!--<BaseInput v-model="userDetail.phone"-->
                         <!--v-validate.continues="'required|numeric|min:10|max:13'"-->
                         <!--name="phone" type="tel"></BaseInput>-->
              <!--<div v-if="errors.has('phone')"><span class="input-invalid-message">{{ errors.first('phone') }}</span></div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="input-wrapper">-->
            <!--<div class="input-label inline">Email</div>-->
            <!--<div class="input inline">-->
              <!--<BaseInput v-model="userDetail.email"-->
                         <!--v-validate.continues="'required|email'"-->
                         <!--name="email" type="email"></BaseInput>-->
              <!--<div v-if="errors.has('email')"><span class="input-invalid-message">{{ errors.first('email') }}</span></div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="input-wrapper" v-if="studentMode">-->
            <!--<div class="input-label inline">University</div>-->
            <!--<div class="input inline">-->
              <!--<BaseInput v-model="userDetail.university"-->
                         <!--v-validate.continues="'required|min:2'"-->
                         <!--name="university"></BaseInput>-->
              <!--<div v-if="errors.has('university')"><span class="input-invalid-message">{{ errors.first('university') }}</span></div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="input-wrapper" v-if="!studentMode">-->
            <!--<div class="input-label inline">Role</div>-->
            <!--<div class="input inline">-->
              <!--<BaseSelect-->
                <!--v-model="userDetail.role"-->
                <!--v-validate.continues="'required'"-->
                <!--name="role"-->
                <!--:options="roles"></BaseSelect>-->
              <!--<div v-if="errors.has('role')"><span class="input-invalid-message">{{ errors.first('role') }}</span></div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="input-wrapper">-->
            <!--<div class="input-label inline">Address</div>-->
            <!--<div class="input inline">-->
              <!--<BaseInput v-model="userDetail.address"-->
                         <!--v-validate.continues="'required|min:5'"-->
                         <!--name="address"></BaseInput>-->
              <!--<div v-if="errors.has('address')"><span class="input-invalid-message">{{ errors.first('address') }}</span></div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="input-wrapper" v-if="studentMode">-->
            <!--<div class="input-label inline">Batch</div>-->
            <!--<div class="input inline">-->
              <!--<div class="batch-select" @click="showSelectBatchModal = true">-->
                <!--<BaseInput v-model="userDetail.batch.code"-->
                           <!--v-validate.continues="'required'"-->
                           <!--name="batch" :disabled="true"-->
                           <!--placeholder="Select Student Batch">-->
                <!--</BaseInput>-->
              <!--</div>-->
              <!--<div v-if="errors.has('batch')"><span class="input-invalid-message">{{ errors.first('batch') }}</span></div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="action">-->
        <!--<div class="action-button">-->
          <!--<BaseButton type="cancel" buttonClass="button-cancel" @click="cancel">Cancel</BaseButton>-->
        <!--</div>-->
        <!--<div class="action-button">-->
          <!--<BaseButton type="submit" buttonClass="button-save" @click="save" :disabled="isSubmitting">Save</BaseButton>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="loading" v-if="isLoading && editMode">-->
      <!--<font-awesome-icon icon="spinner" spin class="icon-loading" size="lg"></font-awesome-icon>-->
    <!--</div>-->
    <!--<modal-select-batch v-if="showSelectBatchModal" @close="closeModal"-->
                <!--@select="selectBatch">-->
    <!--</modal-select-batch>-->
  <!--</div>-->
</template>

<script type="text/javascript" src="./js/user-form.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .user-form {
    &__container {
      padding: 1rem 1.25rem;

      &__image {}

      &__form {
        &-input {
          margin-bottom: 0.75rem;
        }
      }
    }
  }

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
    width: 5vw;
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
    text-align: right;
    width: 100%;
  }

  .alert {
    margin-top: 10px;
    text-align: left;
    color: #cb2431 !important;
  }

  .input {
    width: 80%;
  }

  .batch-select {
    width: 40%;
  }

  .inline {
    display: inline-block;
  }

  .action {
    display: flex;
    justify-content: flex-end;
    margin-right: 5px;
  }

  .action-button {
    display: inline-block;
    padding-left: 5px;
    padding-right: 5px;
  }

  .loading {
    margin-top: 50px;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
