<template>
  <div class="auto-overflow-container">
    <div class="judging_container">
      <div class="judging-form__container">
        <div class="judging-form__container-title">
          <b-field label="Title">
            <b-input autofocus
                     placeholder="Insert title here"
                     v-model="judgingDetail.name"
                     name="title"
                     v-validate.disable="'required'">
            </b-input>
          </b-field>
          <div v-if="errors.has('title')"><span class="input-invalid-message">{{ errors.first('title') }}</span></div>
        </div>
        <div class="judging-form__container-description">
          <input type="hidden"
                 v-model="judgingDetail.description"
                 name="description"
                 v-validate.disable="'required'" />
          <Editor label="Description"
                  v-model="judgingDetail.description"
                  ref="editor"
                  placeholder="Insert description here">
          </Editor>
          <div v-if="errors.has('description')"><span class="input-invalid-message">{{ errors.first('description') }}</span></div>
        </div>
        <div class="judging-form__container-students">
          <template>
            <section>
              <b-collapse class="card" aria-id="contentIdForA11y3">
                <div
                  slot="trigger"
                  slot-scope="props"
                  class="card-header"
                  role="button"
                  aria-controls="contentIdForA11y3">
                  <p class="card-header-title">
                    Students
                  </p>
                  <a class="card-header-icon">
                    <b-icon
                      :icon="props.open ? 'chevron-down' : 'chevron-up'">
                    </b-icon>
                  </a>
                </div>
                <div class="card-content">
                  <div class="content">
                    <div v-if="studentNotEmpty">
                      <div v-for="student in judgingDetail.students" :key="student.id">
                        <UserListItem :imageUrl="student.avatar">
                          <template #name>
                            {{ student.name }}
                          </template>
                          <template #info>
                            <div>{{ student.batch.name }}</div>
                            <div>{{ student.university }}</div>
                          </template>
                          <template #actions>
                            <div class="card-content-action">
                        <span @click="removeStudentFromJudging(student)">
                        <b-icon icon="trash-alt" class="icon is-danger" size="is-small"></b-icon>
                        </span>
                            </div>
                          </template>
                        </UserListItem>
                      </div>
                    </div>
                    <div v-else>
                      <EmptyState src="users">
                        <template #title>
                          Looks like there is no students selected yet
                        </template>
                        <template #message>
                          You need to select them before creating a session!
                        </template>
                      </EmptyState>
                    </div>
                    <div class="buttons is-right judging-form__container-students-add">
                      <b-button type="is-primary" :disabled="disableButtonAddStudent" @click="toggleSelectStudentModal">Add Student</b-button>
                    </div>
                  </div>
                </div>
              </b-collapse>
            </section>
          </template>
        </div>
        <div class="judging-form__container-actions">
          <div class="buttons">
            <b-button type="is-light" @click="cancel">Cancel</b-button>
            <b-button type="is-primary" @click="validateJudging" :loading="isSubmitting">Save</b-button>
          </div>
        </div>
      </div>
      <ModalSelectMultipleStudents  v-if="showSelectStudentModal"
                                    :currentlySelected="judgingDetail.students"
                                    @close="closeSelectStudentModal"
                                    @selected="setSelectedStudents">
      </ModalSelectMultipleStudents>
    </div>
  </div>
</template>

<script type="text/javascript" src="./js/judging-form.js"></script>

<style lang="scss" scoped>
  @import "@/assets/css/main.scss";

  .judging_container {
    @media only screen and (max-width: 1023px) {
      margin-bottom: 10vh;
    }
  }

  .judging-form {
    &__container {
      padding: 1rem 1.25rem;
      margin-bottom: 2rem;

      &-title {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
      }

      &-description {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
      }

      &-students {
        margin-bottom: 1rem;

        &-add {
          margin-top: 1rem;
        }
      }

      &-actions {
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  /deep/ figure {
    margin-right: 0!important;
    margin-left: 0!important;
  }

  .card-content {
    @media only screen and (max-width: 1023px) {
      padding: 0;
    }

    &-action {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }
</style>
