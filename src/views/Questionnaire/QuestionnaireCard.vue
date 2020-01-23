<template>
    <div class="questionnaire-card__outer" @click="$emit('click')" :class="{disabled:isDisable, edit:isEdit}">
      <div class="questionnaire-card__content">
        <div v-if="!isDetail" class="questionnaire-card__content__detail">
          <span class="questionnaire-card__content__detail__title">
            {{ computedTitle }}
          </span>
          <span class="questionnaire-card__content__detail__description">
            {{ computedDescription }}
          </span>
        </div>
        <div v-else class="questionnaire-card__content__detail">
          <span class="questionnaire-card__content__detail__title">
            {{title}}
          </span>
          <span class="questionnaire-card__content__detail__description">
            {{ description }}
          </span>
        </div>
        <div v-if="!isResult" class="questionnaire-card__content__date">
          <div class="questionnaire-card__content__date__start-date">
            Start Date : {{ computedStartDate }}
          </div>
          <div class="questionnaire-card__content__date__due-date">
            Due Date : {{ computedDueDate }}
          </div>
        </div>
      </div>
      <div v-if="isResult" class="questionnaire-card__content__score">
        <span class="questionnaire-card__content__score__icon">
          <font-awesome-icon icon="star" size="2x" class="star-icon">
          </font-awesome-icon>
        </span>
        <span class="questionnaire-card__content__score__score-number">
          <strong>{{score.toFixed(1)}}/6.0</strong>
        </span>
      </div>
      <div v-if="isEdit" class="questionnaire-edit">
        <div class="button-create">
          <span> <font-awesome-icon @click="goToEdit" icon="edit" class="blue icon-edit"></font-awesome-icon></span>
        </div>
        <div class="button-delete">
          <span><font-awesome-icon @click="$emit('clickDelete')" icon="trash-alt" class="red icon-delete"></font-awesome-icon></span>
        </div>
      </div>
    </div>
</template>

<script src="./js/questionnaire-card.js">
</script>

<style lang="scss" scoped>

  .questionnaire-card {
    &__outer {
      display: flex;
      background: #FFFFFF;
      border: 1px solid #F2F2F2;
      box-sizing: border-box;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      text-align: left;
      margin: 5px 10px;
      padding: 10px;
      cursor: pointer;
      height: auto;
    }

    &__content {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      width: 100%;

      &__detail {
        display: flex;
        flex-direction: column;

        &__title {
          font-weight: bold;
          font-size: 1.2rem;
        }

        &__description {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          word-break: break-all;
        }
      }

      &__date {
        display: flex;
        justify-content: space-between;
        width: 100%;
        flex-grow: 1;
        font-weight: bold;

        &__start-date {
          color: green;
        }

        &__due-date {
          color: red;
        }
      }

      &__score {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &__icon {
          color: #f1c40f;
        }

        &__score-number {
          text-align: center;
          padding-top: 10px;
        }
      }
    }
  }

    .disabled {
      background-color: #f3f3f3;
      cursor: default;
    }

    .edit {
      cursor: default;
    }

    .questionnaire-edit {
      display: flex;
      height: auto;
      padding-right: 10px;
    }

    .icon-edit {
      cursor:pointer;
    }

    .icon-delete {
      cursor: pointer;
    }


    .detail {
      font-size: 2rem;
    }

    .blue {
      color: #02AAF3;
    }

    .red {
      color: red;
    }

    .disabled{
      opacity: 0.5;
      background-color: white;
    }
</style>
