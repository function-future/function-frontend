<template>
  <div class="scrollable-container">
    <div class="edit-container">
      <div class="title">
        <BaseInput class="input-title" inputType="title" v-model="stickyNotes.noteTitle"></BaseInput>
      </div>
      <div class="description">
        <BaseTextArea class="input-description" v-model="stickyNotes.noteDescription"></BaseTextArea>
      </div>
      <div class="action">
        <div class="submit-button">
          <BaseButton type="submit" buttonClass="button-save" @click="postStickyNote">Save</BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import config from '@/config/index'

export default {
  components: {
    BaseButton,
    BaseInput,
    BaseTextArea
  },
  data () {
    return {
      stickyNotes: {
        noteTitle: '',
        noteDescription: '',
        updatedAt: ''
      }
    }
  },
  created () {
    this.$http.get(config.api.core.stickyNotes.get)
      .then(res => (this.stickyNotes = res.data.data))
      .catch(err => console.log(err))
  },
  methods: {
    postStickyNote () {
      let payload = {
        noteTitle: this.stickyNotes.noteTitle,
        noteDescription: this.stickyNotes.noteDescription
      }

      this.$http.post(config.api.core.stickyNotes.post, payload)
        .then(res => { this.$router.push({ name: 'stickyNotes' }) })
        .catch(err => console.log(err)) // TODO: add error modal
    }
  }
}
</script>

<style>
  .edit-container {
    margin: 10px;
  }

  .input-title {
    margin-right: 10px;
    width: 100%;
    font-size: 1.2em;
  }

  .description {
    height: 425px;
  }

  .input-description {
    height: 400px;
  }

  .action {
    display: flex;
    justify-content: flex-end;
  }
</style>
