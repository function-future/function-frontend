<template>
  <div class="scrollable-container">
    <BaseCard class="card" cardClass="card-hover">
      <div class="header">
        <h3>Announcement Title Goes Here...</h3>
      </div>
      <div class="header float-right">
        <div class="date">
          January 19, 2019
        </div>
        <div class="action">
          <span @click="addStickyNote"><font-awesome-icon icon="edit" class="icon blue" size="lg"></font-awesome-icon></span>
        </div>
      </div>
      <div class="preview">
        <span>est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius duis at consectetur lorem donec massa sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum</span>
      </div>
    </BaseCard>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseCard from '@/components/BaseCard'

export default {
  name: 'announcements',
  components: {
    BaseCard
  },
  methods: {
    addStickyNote () {
      this.$router.push({ name: 'addStickyNote' })
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
