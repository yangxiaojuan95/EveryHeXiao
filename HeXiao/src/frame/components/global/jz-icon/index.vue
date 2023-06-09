<script lang="tsx">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'JzIcon',
  props: {
    icon: {
      type: String,
      default: ''
    },
    fontSize: {
      type: Number,
      default: 16
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const { icon } = toRefs(props)

    const wrapSize = props.fontSize + 4

    const style = {
      width: wrapSize + 'px',
      height: wrapSize + 'px',
      lineHeight: wrapSize + 'px',
      fontSize: props.fontSize + 'px'
    }

    const onclick = () => {
      emit('click')
    }

    return () => {
      return (
        <i class={ [icon.value, 'icon'] } style={ style } onClick={ onclick } /> 
      )
    }
  }
})
</script>

<style scoped>
.icon {
  text-align: center;
  fill: currentColor;
  overflow: hidden;
  font-size: 16px;
  vertical-align: middle;
}
</style>