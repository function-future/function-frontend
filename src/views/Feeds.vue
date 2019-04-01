<template>
  <div>
    <BaseCard class="sticky-notes-card">
      <div class="sticky-notes-header sticky-notes-title">
        <h3>Sticky Notes Title Goes Here...</h3>
      </div>
      <div class="sticky-notes-header sticky-notes-date">
        January 19, 2019
      </div>
      <div class="sticky-notes-content">
        <span>est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius duis at consectetur lorem donec massa sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum</span>
      </div>
    </BaseCard>
    <BaseCard class="announcement-card">
      <h3>Announcements</h3>
    </BaseCard>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseCard from '@/components/BaseCard.vue'

export default {
  name: 'feeds',
  components: {
    BaseCard
  }
}
</script>

<style>
  .sticky-notes-card {
    min-height: 125px;
  }

  .sticky-notes-header {
    display: inline-block;
  }

  .sticky-notes-date {
    padding: 5px 0 5px 5px;
    float: right;
  }

  h3 {
    margin: 5px 0 10px 0;
    text-align: left;
  }

  .sticky-notes-content {
    text-align: justify;
  }

  .announcement-card {
    min-height: 250px;
  }
</style>
