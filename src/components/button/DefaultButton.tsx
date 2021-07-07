import { computed, defineComponent } from '@vue/runtime-core';

const DefaultButton = defineComponent({
  props: {
    color: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const classes = computed(() => {
      const text = props.color === '' ? 'text-gray-700' : `text-white`;
      const border = props.color === '' ? 'border' : `border-transparent`;
      const bg = props.color === '' ? 'bg-white' : `bg-${props.color}-500`;
      const hover = props.color === '' ? 'hover:bg-gray-50' : `hover:bg-${props.color}-700`;
      const focus = props.color === '' ? 'focus:ring-gray-500' : `focus:ring-${props.color}-500`;
      const disabled = props.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
      return [
        'w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm',
        border,
        text,
        bg,
        hover,
        focus,
        disabled,
      ].join(' ');
    });
    return () => (
      <button type="button" class={classes.value}>
        {context.slots.default && context.slots.default()}
      </button>
    );
  },
});
export default DefaultButton;
