export default {
  name: 'Timer',
  timers: {
    countdown: {
      time: 1000, autostart: true, repeat: true }
  },
  props: [
    'timeLimit'
  ],
  data () {
    return {
      timer: null,
      totalTime: 0
    }
  },
  computed: {
    minutes () {
      const minutes = Math.floor(this.totalTime / 60);
      return this.padTime(minutes);
    },
    seconds () {
      const seconds = this.totalTime - (this.minutes * 60);
      return this.padTime(seconds);
    },
    remainingTime () {
      return this.totalTime / (this.timeLimit * 60) * 100
    }
  },
  created () {
    this.totalTime = this.timeLimit*60
  },
  methods: {
    padTime: function(time) {
      return (time < 10 ? '0' : '') + time;
    },
    countdown: function() {
      this.totalTime !== 0 ? this.totalTime-- : this.timeUp();
    },
    pause () {
      if (this.totalTime !== 0)
        this.$timer.stop('countdown')
    },
    timeUp () {
      this.$timer.stop('countdown')
      this.$emit('finish')
    }
  }
}
