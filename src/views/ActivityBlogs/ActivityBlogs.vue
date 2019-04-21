<template>
  <div class="scrollable-container">
    <div class="button-div">
      <BaseButton type="submit" buttonClass="button-save">
        <span><font-awesome-icon icon="plus" class="icon"/> New</span>
      </BaseButton>
    </div>
    <BaseCard class="blog-card" cardClass="card-hover">
      <div class="blog-header blog-title">
        <h3>Blog Title Goes Here...</h3>
      </div>
      <div class="blog-header float-right">
        <div class="blog-date">
          January 19, 2019
        </div>
        <div class="blog-action">
          <span><font-awesome-icon icon="edit" class="icon blue" size="lg"></font-awesome-icon></span>
          <span><font-awesome-icon icon="trash-alt" class="icon red" size="lg"></font-awesome-icon></span>
        </div>
      </div>
      <div class="blog-preview">
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
  .blog-card {
    min-height: 175px;
  }

  .blog-header {
    display: inline-block;
  }

  .blog-date {
    padding: 5px 15px 5px 5px;
    display: inline-block;
  }

  .blog-action {
    display: inline-block;
    padding-left: 15px;
    border-left: 1px solid #BDBDBD;
  }

  .blog-action span {
    padding: 5px;
    transition: all .2s ease;
  }

  .blog-action span:hover {
    opacity: 0.8;
  }

  .blog-action span:active {
    opacity: 0.9;
  }

  .blog-preview {
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

  .button-save {
    width: 150px;
  }

  .float-right {
    float: right;
  }
</style>
