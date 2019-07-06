<template>
  <div class="login">
    <div class="login__wrapper">
      <div class="login__header">
        <span class="back-button" @click="back">
            <font-awesome-icon icon="arrow-left" class="icon" size="lg"/>
          </span>
        <img src="@/assets/logo.png">
      </div>
      <div class="login__body">
        <div class="login__body--title">Login</div>
        <div class="login__body--form">
          <div class="fail-login-alert" v-if="errorAlert">
            {{ errorAlert }}
            <font-awesome-icon icon="times" class="icon close-alert" size="lg" @click="errorAlert = ''"/>
          </div>
          <div>
            <BaseInput v-model="data.email" v-validate.disable="'required|email'"
                       name="email" placeholder="email" id="email"
                       @keyup.enter.native="login">
            </BaseInput>
            <div v-if="errors.has('email')"><span class="input-invalid-message">{{ errors.first('email') }}</span></div>
          </div>
          <div>
            <BaseInput v-model="data.password" v-validate.disable="'required'"
                       name="password" type="password" placeholder="password" id="password"
                       @keyup.enter.native="login">
            </BaseInput>
            <div v-if="errors.has('password')"><span class="input-invalid-message">{{ errors.first('password') }}</span></div>
          </div>
          <BaseButton type="submit" buttonClass="button-save" @click="login" class="login-button">Login</BaseButton>
        </div>
      </div>
      <div class="login__footer"></div>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/login.js"></script>

<style lang="scss" scoped>
  %flex-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .login {
    @extend %flex-center;
    align-items: flex-end;
    height: 100%;
    font-size: 1rem;

    &__wrapper {
      display: flex;
      flex-direction: column;
      width: 45%;
      border-radius: 20px;
      margin-right: 30vw;
      box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);
    }

    &__header {
      @extend %flex-center;
      background-color: #02AAF3;
      border-radius: 15px 15px 0 0;
      height: 75px;
      position: relative;

      img {
        height: 35px;
      }
    }

    &__body {
      @extend %flex-center;
      height: auto;
      border-radius: 0 0 15px 15px;

      &--title {
        font-weight: bold;
        margin-top: 25px;
        margin-bottom: 5px;
        width: 100%;
      }

      &--form {
        width: 80%;
        margin-bottom: 25px;
        margin-top: 10px;
      }
    }
  }

  .login-button {
    width: 100%;
    padding: 10px;
    margin: 10px 0 10px 0;
  }

  .back-button {
    position: absolute;
    float: left;
    left: 25px;
    margin-top: 2px;
    color: white;

    &:hover {
      opacity: 0.8;
    }
  }

  .input-invalid-message {
    color: #FF0000;
    font-size: 0.75em;
    float: left;
    margin-left: 1.5vw;
  }

  .fail-login-alert {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 10px 10px 18px;
    font-size: 0.75rem;
    margin-bottom: 10px;
    border-radius: 8px;
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }

  .close-alert {
    margin-left: auto;
    margin-right: 10px;
    margin-top: 1px;
  }
</style>
