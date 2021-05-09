import { computed, defineComponent } from '@vue/runtime-core';

const IconButton = defineComponent({
  props: {
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const icon = computed(() => {
      return require(`@/assets/icon/${props.icon}.svg`);
    });

    const styles = computed(() => {
      return {
        width: '20px',
        height: '20px',
      };
    });

    const classes = computed(() => {
      const text = props.color === '' ? 'text-gray-700' : `text-white`;
      const border = props.color === '' ? 'border' : `border-transparent`;
      const bg = props.color === '' ? 'bg-white' : `bg-${props.color}-500`;
      const hover = props.color === '' ? 'hover:bg-gray-50' : `hover:bg-${props.color}-700`;
      const focus = props.color === '' ? 'focus:ring-gray-500' : `focus:ring-${props.color}-500`;
      return ['font-bold p-2 rounded-full', border, text, bg, hover, focus].join(' ');
    });

    return () => (
      <button class={classes.value}>
        <img class="icon" src={icon.value.default} style={styles.value}></img>
      </button>
    );
  },
});
export default IconButton;
