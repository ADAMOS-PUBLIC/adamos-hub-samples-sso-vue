<template>
  <div class="q-gutter-md" :class="inline ? 'row' : 'column'">
    <div 
      v-for="color in colors" 
      :key="color.value" 
      :class="getClasses(color)"
      :style="getStyle(color)"
    >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    machine: { type: Object, required: true },
    inline: {type: Boolean, default: false}
  },

  computed: {
    colors() {
      console.log(this.machine)
      let colors = [
        { value: 'red', state: 'OFF' },
        { value: 'yellow', state: 'OFF' },
        { value: 'green', state: 'OFF' },
        { value: 'blue', state: 'OFF' },
        { value: 'white', state: 'OFF' },
      ]

      for (const color of colors) {
        const stacklight = this.getStacklight(color)
        if (stacklight) {
          color.state = stacklight.state
        }
      }
      return colors
    }
  },

  data () {
    return {
    }
  },

  methods: {
    getColor (value) {
      return value && value !== 'OFF' ? value.toLowerCase() : 'grey'
    },
    getStacklight (color) {
      if (!this.machine.stacklights) return false
      return this.machine.stacklights.find(stacklight => stacklight.value.toLowerCase() === color.value)
    },
    getClasses (color) {
      let result = ['light']

      if (color.state === 'ON') {
        result.push(`bg-${color.value}-8`)
      }
      else if (color.state === 'FLASHING') {
        result.push(`bg-${color.value}-8`)
        result.push('blink')
      }
      else {
        result.push(this.getColorClass(color.value))
      }

      return result
    },
    getColorClass (color) {
      switch (color) {
        case 'white':
          return `bg-${color}`
      
        default:
          return `bg-${color}-3`
      }
    },

    getStyle(color) {
      let style = ``;
      if (color.state === 'ON') {
        style = `${style} box-shadow: ${this.getBoxShadow(color.value)}`;
      }
      if (color.value === 'white') {
        style = `${style} border: 1px solid grey`
      }

      return style;
    },

    getBoxShadow(color) {
      return `0 0 6px ${color}`;
    }
  }
}
</script>

<style lang="scss" scoped>
.light {
  height: 30px; 
  width: 30px;
}

.blink {
  animation: blink-animation 1s infinite;
  -webkit-animation: blink-animation 1s infinite;
}
@keyframes blink-animation {
  to {
    opacity: 0.2;
  }
}
@-webkit-keyframes blink-animation {
  to {
    opacity: 0.2;
  }
}
</style>