import { injectMouse } from '@/plugins/mouse';
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
    const { state: mouseState } = injectMouse();
    const randomValue = Math.floor(Math.random() * 8) + 4;
    const left = computed(() => `${parseFloat(props.left) + -mouseState.mx / randomValue}px`);
    return () => (
      <div
        class="dollar-conatiner"
        style={{
          left: left.value,
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
