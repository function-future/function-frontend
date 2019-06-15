<template>
  <div class="scrollable-container">
    <div class="form-container">
      <div class="row">
        <div class="column image-column">
          <div class="image" :style="{ backgroundImage: 'url(' + userDetail.avatar + ')' }">
            <input type="file"
                   name="image"
                   accept="image/*"
                   id="upload-image"
                   @change="onFileChange($event)"
                   style="display: none"/>
            <label for="upload-image" class="image-edit"><font-awesome-icon icon="pencil-alt" class="icon"/> edit</label>
          </div>
          <div class="alert" v-if="maximumSizeAlert">
            <span>Please upload a picture smaller than 1 MB.</span>
          </div>
        </div>
        <div class="column input-column">
          <div class="input-wrapper">
            <div class="input-label inline">Name</div>
            <div class="input inline">
              <BaseInput v-model="userDetail.name"></BaseInput>
            </div>
          </div>
          <div class="input-wrapper">
            <div class="input-label inline">Phone</div>
            <div class="input inline">
              <BaseInput v-model="userDetail.phone"></BaseInput>
            </div>
          </div>
          <div class="input-wrapper">
            <div class="input-label inline">Email</div>
            <div class="input inline">
              <BaseInput v-model="userDetail.email"></BaseInput>
            </div>
          </div>
          <div class="input-wrapper" v-if="studentMode">
            <div class="input-label inline">University</div>
            <div class="input inline">
              <BaseInput v-model="userDetail.university"></BaseInput>
            </div>
          </div>
          <div class="input-wrapper" v-if="!studentMode">
            <div class="input-label inline">Role</div>
            <div class="input inline">
              <BaseSelect
                v-model="userDetail.role"
                :options="roles"></BaseSelect>
            </div>
          </div>
          <div class="input-wrapper">
            <div class="input-label inline">Address</div>
            <div class="input inline">
              <BaseInput v-model="userDetail.address"></BaseInput>
            </div>
          </div>
          <div class="input-wrapper" v-if="studentMode">
            <div class="input-label inline">Batch</div>
            <div class="input inline">
              <BaseInput v-model="userDetail.batch.code"></BaseInput>
            </div>
          </div>
        </div>
      </div>
      <div class="action">
        <div class="action-button">
          <BaseButton type="cancel" buttonClass="button-cancel" @click="cancel">Cancel</BaseButton>
        </div>
        <div class="action-button">
          <BaseButton type="submit" buttonClass="button-save" @click="save">Save</BaseButton>
        </div>
      </div>
    </div>
<!--    <ModalProfilePicturePreview v-if="visibleModal === true"-->
<!--                                :newImage="imagePreview"-->
<!--                                @close="visibleModal = false"-->
<!--                                @save="imageUpload">-->
<!--      <slot name="title">Confirm your new profile picture</slot>-->
<!--    </ModalProfilePicturePreview>-->
  </div>
</template>

<script type="text/javascript" src="./js/user-form.js"></script>

<style scoped>
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
</style>
