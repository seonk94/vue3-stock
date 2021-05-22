import { defineComponent } from '@vue/runtime-core';

const SwitchButton = defineComponent({
  props: {
    label: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: 'toggle-button',
    },
    checked: {
      type: Boolean,
      default: false,
    },
    leftEmoji: {
      type: String,
    },
    rightEmoji: {
      type: String,
    },
  },
  emits: ['updateValue'],
  setup(props, context) {
    const handleClick = (e: Event) => {
      e.preventDefault();
      context.emit('updateValue');
    };
    return () => (
      <div class="flex items-center justify-center ">
        <label for={props.id} class="flex items-center cursor-pointer" onClick={handleClick}>
          <div class="relative">
            <input type="checkbox" checked={props.checked} id={props.id} class="sr-only" />
            <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
            <div class="dot absolute z-10 left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
            {props.leftEmoji && (
              <div class="absolute h-full w-7 justify-center flex items-center opacity-50 left-0 top-0">{props.leftEmoji}</div>
            )}
            {props.rightEmoji && (
              <div class="absolute h-full w-7 justify-center flex items-center opacity-50 right-0 top-0">{props.rightEmoji}</div>
            )}
          </div>
          <div class="ml-3 text-white font-medium">{props.label}</div>
        </label>
      </div>
    );
  },
});
export default SwitchButton;
