<template>
  <div class="login">
    <transition appear
                appear-active-class="fade-enter-active">
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
            <div class="fail-login-alert" v-if="errorAlert && !loginSuccess">
              {{ errorAlert }}
              <font-awesome-icon icon="times" class="icon close-alert" size="lg" @click="errorAlert = ''"/>
            </div>
            <div class="success-login-alert" v-if="loginSuccess">
              Successfully logged in to your account, redirecting...
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
                         name="password" :type="type" placeholder="password" id="password"
                         @keyup.enter.native="login" class="password-wrapper">
                <button class="show-password" @click="showPassword = !showPassword">
                  <font-awesome-icon icon="eye" class="icon" size="lg" v-if="!showPassword"/>
                  <font-awesome-icon icon="eye-slash" class="icon" size="lg" v-else/>
                </button>
              </BaseInput>
              <div v-if="errors.has('password')"><span class="input-invalid-message">{{ errors.first('password') }}</span></div>
            </div>
            <div class="tooltip-wrapper">
              <div class="tooltip">
                <font-awesome-icon icon="info-circle" class="icon" size="lg"/> Password Hint
                <span class="tooltiptext">
                If you have not changed your password,<br>
                Default: <b>[lowercase no space full name]functionapp</b><br>
                Example: <b>oliversebastianfunctionapp</b>
              </span>
              </div>
            </div>
            <BaseButton type="submit" buttonClass="button-save" @click="login" class="login-button">
              <span v-if="!loggingIn">Login</span>
              <span v-if="loggingIn"><font-awesome-icon icon="spinner" spin class="icon"></font-awesome-icon></span>
            </BaseButton>
          </div>
        </div>
        <div class="login__footer"></div>
      </div>
    </transition>
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
      width: 42%;
      border-radius: 20px;
      margin-right: 30vw;
      margin-bottom: 10vh;
      box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);
      transition: all .2s ease;

      @media only screen and (min-width: 1400px) {
        width: 38%;
      }
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
    transition: all .5s ease;
  }

  .back-button {
    position: absolute;
    float: left;
    left: 25px;
    margin-top: 2px;
    color: white;
    transition: all .2s ease;

    &:hover {
      left: 23px;
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
    color: #F2F2F2;
    background-color: #ea3f6c;
    border-color: #F2F2F2;
  }

  .success-login-alert {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 10px 10px 18px;
    font-size: 0.75rem;
    margin-bottom: 10px;
    border-radius: 8px;
    color: #F2F2F2;
    background-color: #42b549;
    border-color: #c3e6cb;
  }

  .close-alert {
    margin-left: auto;
    margin-right: 10px;
    margin-top: 1px;
  }

  .fade-enter-active {
    animation: go .5s;
  }

  @keyframes go {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .tooltip {
    font-size: 0.8rem;
    position: relative;
    display: inline-block;

    &-wrapper {
      display: flex;
      justify-content: flex-end;
    }
  }

  .tooltip .tooltiptext {
    right: -20%;
    line-height: 17px;
    margin-top: 5px;
    padding: 10px 15px;
    transition: all .2s ease;
    visibility: hidden;
    width: 350px;
    background-color: #505050;
    color: #fff;
    text-align: left;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
  }

  .tooltip .tooltiptext::after {
    content: " ";
    position: absolute;
    bottom: 100%; /* At the bottom of the tooltip */
    left: 85%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #505050 transparent;
  }

  .password-wrapper {
    position: relative;
  }

  .show-password {
    width: 30px;
    padding: 0;
    text-align: center;
    position: absolute;
    top: 20px;
    right: 10px;
    color: #7f7f7f;
    border: none;
    background: none;
    cursor: pointer;
    outline: none;
  }
</style>
