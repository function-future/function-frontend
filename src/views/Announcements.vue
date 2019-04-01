<template>
  <div>
    <div class="button-div">
      <BaseButton type="submit" buttonClass="button-save">Add</BaseButton>
    </div>
    <BaseCard class="announcement-card">
      <div class="announcement-header announcement-title">
        <h3>Announcement Title Goes Here...</h3>
      </div>
      <div class="announcement-header announcement-date">
        January 19, 2019
      </div>
      <div class="announcement-preview">
        <span>est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius duis at consectetur lorem donec massa sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum</span>
      </div>
    </BaseCard>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'announcements',
  components: {
    BaseButton,
    BaseCard
  }
}
</script>

<style scoped>
  .announcement-card {
    min-height: 175px;
  }

  .announcement-card:hover {
    cursor: pointer;
    transition: all .3s ease;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.1), 2px 2px 10px rgba(0,0,0,0.3);
  }

  .announcement-header {
    display: inline-block;
  }

  .announcement-date {
    padding: 5px 0 5px 5px;
    float: right;
  }

  .announcement-preview {
    text-align: justify;
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
