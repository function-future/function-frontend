<template>
  <div class="pagination-wrapper">
    <ul class="base-pagination">
      <li class="pagination-item">
        <button
          class="previous pagination-link" @click="previousPage"
          :disabled="previousButtonDisabled" :class="{'disabled': previousButtonDisabled}">
          Prev
        </button>
      </li>
      <li v-for="page in paginations" :key="page">
        <button class="pagination-link" @click="goToPage(page)"
                :class="{'active': activePage(page)}">{{ page }}</button>
      </li>
      <li class="pagination-item">
        <button class="next pagination-link" @click="nextPage"
                :disabled="nextButtonDisabled" :class="{'disabled': nextButtonDisabled}">
          Next
        </button>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript" src="./js/base-pagination.js"></script>

<style scoped lang="scss">
  .pagination-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
  }

  .base-pagination {
    border-radius: 12px;
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    padding: 0;
    display: flex;
    list-style-type: none;
    transition: all .4s ease;

    &:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }

    /*disable text highlight*/
    -webkit-user-select: none; /* Chrome all / Safari all */
    -moz-user-select: none;   /* Firefox all */
    -ms-user-select: none;  /* IE 10+ */
    user-select: none;  /* Likely future */
  }

  .pagination-link {
    font-weight: bold;
    border: none;
    display: block;
    background-color: #FFFFFF;
    padding: .75rem 1rem;
    color: #02AAF3;
    outline:none;

    &:hover {
      background-color: #F5F5F5;
    }

    &:active {
      opacity: 0.8;
    }
  }

  .disabled {
    color: #505050;

    &:hover {
      color: #505050;
      background-color: #FFFFFF;
      opacity: 1;
    }
  }

  .active {
    background-color: #02AAF3;
    color: #F2F2F2;

    &:hover {
      background-color: #02AAF3;
    }

    &:active {
      background-color: #02AAF3;
      opacity: 1;
    }
  }

  .previous {
    border-radius: 12px 0 0 12px;
    padding: .75rem 1.25rem;
  }

  .next {
    border-radius: 0 12px 12px 0;
    padding: .75rem 1.25rem;
  }
</style>
