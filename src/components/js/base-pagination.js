export default {
  name: 'BasePagination',
  props: {
    paging: {
      required: true
    }
  },
  computed: {
    previousButtonDisabled () {
      return this.paging.page === 1
    },
    nextButtonDisabled () {
      return this.paging.page === this.totalPage
    },
    totalPage () {
      return Math.ceil(this.paging.totalRecords / this.paging.size)
    },
    paginations () {
      const visiblePagesCount = 8
      const currentPage = this.paging.page
      const pageCount = this.totalPage
      const visiblePagesThreshold = Math.ceil((visiblePagesCount - 1) / 2)
      const paginationArray = Array(visiblePagesCount - 1).fill(0)

      if (pageCount <= visiblePagesCount) {
        return pageCount
      }

      if (currentPage <= visiblePagesThreshold + 1) {
        paginationArray[0] = 1
        const paginations = paginationArray.map(
          (paginationTrigger, index) => {
            return paginationArray[0] + index
          }
        )
        paginations.push(pageCount)
        return paginations
      }

      if (currentPage >= pageCount - visiblePagesThreshold + 1) {
        const paginations = paginationArray.map(
          (paginationTrigger, index) => {
            return pageCount - index
          }
        )
        paginations.reverse().unshift(1)
        return paginations
      }

      paginationArray[0] = currentPage - visiblePagesThreshold + 1
      const paginations = paginationArray.map(
        (paginationTrigger, index) => {
          return paginationArray[0] + index
        })
      paginations.unshift(1)
      paginations[paginations.length - 1] = pageCount
      return paginations
    }
  },
  methods: {
    activePage (page) {
      return this.paging.page === page
    },
    previousPage () {
      this.$emit('previousPage')
    },
    nextPage () {
      this.$emit('nextPage')
    },
    goToPage (page) {
      this.$emit('loadPage', page)
    }
  }
}
