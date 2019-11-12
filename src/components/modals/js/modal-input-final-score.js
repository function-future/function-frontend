import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'modal-input-final-score',
  props: [
    'studentData',
    'point'
  ],
  data () {
    return {
      finalScore: 0
    }
  },
  created () {
    this.finalScore = this.point
  },
  computed: {},
  methods: {
    ...mapActions([
      'fetchBatches'
    ]),
    close () {
      this.$emit('close')
    },
    finalizeScore () {
      this.$emit('finalizeScore', this.finalScore)
    }
  }
}
