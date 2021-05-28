import { computed, defineComponent } from '@vue/runtime-core';
const RoatateDollar = defineComponent({
  props: {
    left: {
      type: String,
      default: '0',
    },
    duration: {
      type: String,
      default: '10s',
    },
    rotateDuration: {
      type: String,
      default: '5s',
    },
    delay: {
      type: String,
      default: '10s',
    },
  },
  setup(props) {
    const dollar = computed(() => require('@/assets/icon/dollar.svg'));
    return () => (
      <div
        class="dollar-conatiner"
        style={{
          left: props.left,
          animationDuration: props.duration,
          animationDelay: props.delay,
        }}
      >
        <img
          src={dollar.value.default}
          class="dollar-img"
          style={{
            animationDuration: props.rotateDuration,
          }}
        />
      </div>
    );
  },
});
export default RoatateDollar;
