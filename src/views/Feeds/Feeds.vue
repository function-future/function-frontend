<template>
  <div class="scrollable-container">
    <BaseCard class="sticky-notes-card" @click.native="goToStickyNotesDetail" cardClass="card-hover">
      <div class="sticky-notes-header sticky-notes-title">
        <h3>{{ stickyNotes.noteTitle }}</h3>
      </div>
      <div class="sticky-notes-header sticky-notes-date">
        {{ stickyNotes.updatedAt | moment("dddd, MMMM Do YYYY") }}
      </div>
      <div class="sticky-notes-content">
        <span>{{ stickyNotes.noteDescription }}</span>
      </div>
    </BaseCard>
    <BaseCard class="announcement-card">
      <h3>Announcements</h3>
      <div class="announcement-card-scrollable">
        <BaseCard class="announcement-box">
          <h4>Title</h4>
          <div class="announcement-box-content">
            <span>est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius duis at consectetur lorem donec massa sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum</span>
          </div>
        </BaseCard>
        <BaseCard class="announcement-box">
          <h4>Title</h4>
          <div class="announcement-box-content">
            <span>est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius duis at consectetur lorem donec massa sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum</span>
          </div>
        </BaseCard>
        <BaseCard class="announcement-box">
          <h4>Title</h4>
          <div class="announcement-box-content">
            <span>est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius duis at consectetur lorem donec massa sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum</span>
          </div>
        </BaseCard>
        <BaseCard class="announcement-box">
          <h4>Title</h4>
          <div class="announcement-box-content">
            <span>est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius duis at consectetur lorem donec massa sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum</span>
          </div>
        </BaseCard>
        <BaseCard class="announcement-box">
          <h4>Title</h4>
          <div class="announcement-box-content">
            <span>est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius duis at consectetur lorem donec massa sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum</span>
          </div>
        </BaseCard>
      </div>
    </BaseCard>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseCard from '@/components/BaseCard.vue'
import config from '@/config/index'

export default {
  name: 'feeds',
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
    this.$http.get(config.api.core.stickyNotes.get)
      .then(res => (this.stickyNotes = res.data.data))
      .catch(err => console.log(err))
  },
  methods: {
    goToStickyNotesDetail () {
      this.$router.push({ name: 'stickyNotes' })
    }
  }
}
</script>

<style scoped>
  .sticky-notes-card {
    min-height: 125px;
    cursor: pointer;
  }

  .sticky-notes-header {
    display: inline-block;
  }

  .sticky-notes-date {
    padding: 5px 0 5px 5px;
    float: right;
  }

  h3, h4 {
    margin: 5px 0 10px 0;
    text-align: left;
  }

  .sticky-notes-content {
    text-align: justify;
  }

  .announcement-card {
    min-height: 20vh;
    max-height: 60vh;
    padding-right: 15px;
  }

  .announcement-card-scrollable {
    min-height: 10vh;
    max-height: 45vh;
    overflow: auto;
    padding-top: 10px;
    padding-right: 15px;
  }

  .announcement-box {
    min-height: 100px;
    width: 100%;
    box-shadow: none;
    margin: 0 0 15px 0;
    border: 1px solid #828282;
  }
</style>
