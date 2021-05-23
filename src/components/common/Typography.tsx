import { computed, defineComponent, PropType } from '@vue/runtime-core';

type FontSizeType = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
type FontWeightType = 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
const Typography = defineComponent({
  props: {
    opposition: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    fontSize: {
      type: String as PropType<FontSizeType>,
      default: 'base',
    },
    hover: {
      type: Boolean,
      default: false,
    },
    fontWeight: {
      type: String as PropType<FontWeightType>,
      default: 'normal',
    },
  },
  setup(props, context) {
    const classes = computed(() => {
      const textColor = 'dark:text-gray-100 text-gray-700';
      const fontSize = `text-${props.fontSize}`;
      const fontWeight = `font-${props.fontWeight}`;
      const hover = props.hover ? 'hover:bg-indigo-700 hover:text-white' : '';
      return [textColor, fontSize, fontWeight, hover].join(' ');
    });
    return () => <div class={classes.value}>{context.slots.default && context.slots.default()}</div>;
  },
});
export default Typography;
