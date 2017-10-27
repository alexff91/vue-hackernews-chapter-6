<template>
  <div
  class="progress"
  :class="{
    error: error,
    show: show
  }"
  :style="{
    'width': percent+'%'
  }"></div>
</template>

<script>
export default {
  data () {
    return {
      percent: 0,
      show: false,
      error: false,
      duration: 6000
    }
  },
  methods: {
    start () {
      this.show = true
      this.error = false
      if (this._timer) {
        clearInterval(this._timer)
        this.percent = 0
      }
      this._cut = 10000 / Math.floor(this.duration)
      this._timer = setInterval(() => {
        this.increase(this._cut)
      }, 100)
    },
    increase (num) {
      this.percent = this.percent + Math.floor(num)
    },
    finish () {
      this.percent = 100
      this.hide()
    },
    hide () {
      this.show = false
      clearInterval(this._timer)
      this._timer = null
    },
    fail () {
      this.error = true
    }
  }
}
</script>

<style scoped>
.progress {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 2px;
  width: 0%;
  transition: width 0.2s, opacity 0.4s;
  opacity: 0;
  background-color: #ffca2b;
  z-index: 999999;
}

.show {
  opacity: 1;
}

.error {
  background-color: #ff0000;
}
</style>
