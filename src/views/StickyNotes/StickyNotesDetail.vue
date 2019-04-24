<template>
  <div class="scrollable-container">
    <BaseCard class="card" cardClass="card-hover">
      <div class="header">
        <h3>{{ stickyNotes.noteTitle }}</h3>
      </div>
      <div class="header float-right">
        <div class="date">
          {{ stickyNotes.updatedAt | moment("dddd, MMMM Do YYYY") }}
        </div>
        <div class="action">
          <span @click="goToAddStickyNote"><font-awesome-icon icon="edit" class="icon blue" size="lg"></font-awesome-icon></span>
        </div>
      </div>
      <div class="preview">
        <span>{{ stickyNotes.noteDescription }}</span>
      </div>
    </BaseCard>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseCard from '@/components/BaseCard'
import axios from 'axios'

export default {
  name: 'announcements',
  components: {
    BaseCard
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
    axios.get('/api/core/sticky-notes')
      .then(res => this.stickyNotes = res.data.data)
      .catch(err => console.log(err))
  },
  computed: {
    noteDate: function () {
      let dateObj = new Date(this.stickyNotes.updatedAt + 1000)
      let day = dateObj.getDay()
      let year = dateObj.getFullYear()
      let month = dateObj.getMonth() + 1
      let date = dateObj.getDate()
      return day + ', ' + date + ' ' + month + ' ' + year
    }
  },
  methods: {
    goToAddStickyNote () {
      this.$router.push({ name: 'editStickyNote' })
    }
  }
}
</script>

<style scoped>
  .card {
    min-height: 80vh;
  }

  .header {
    display: inline-block;
  }

  .date {
    padding: 5px 15px 5px 5px;
    display: inline-block;
  }

  .float-right {
    float: right;
  }

  .preview {
    text-align: justify;
  }

  .action {
    border-left: 1px solid #BDBDBD;
    padding-left: 15px;
    display: inline-block;
  }

  .action span {
    padding: 5px;
    transition: all .2s ease;
  }

  .action span:hover {
    opacity: 0.8;
  }

  .action span:active {
    opacity: 0.9;
  }

  h3 {
    margin: 5px 0 15px 0;
    text-align: left;
  }

  .button-div {
    text-align: right;
    margin-right: 20px;
  }
</style>
