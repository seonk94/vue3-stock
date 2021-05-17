import { defineComponent } from '@vue/runtime-core';
import DefaultButton from '../button/DefaultButton';

const ModalContainer = defineComponent({
  props: {
    successValid: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close', 'success'],
  setup(props, context) {
    const handleClose = () => {
      context.emit('close');
    };
    const handleSuccess = () => {
      context.emit('success');
    };
    return () => (
      <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <div class="inline-block overflow-visible align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">{context.slots.body && context.slots.body()}</div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <DefaultButton onClick={handleSuccess} disabled={!props.successValid} color="green">
                Add
              </DefaultButton>
              <DefaultButton onClick={handleClose}>Close</DefaultButton>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
export default ModalContainer;
