import { defineComponent } from '@vue/runtime-core';

const DefaultInput = defineComponent({
  props: {
    name: {
      type: String,
    },
    id: {
      type: String,
    },
    placeholder: {
      type: String,
    },
  },
  setup(props) {
    return () => (
      <div>
        {/* <label for="price" class="block text-sm font-medium text-gray-700">
          Price
        </label> */}
        <div class="mt-1 relative rounded-md shadow-sm">
          {/* <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-gray-500 sm:text-sm">$</span>
          </div> */}
          <input
            type="text"
            name={props.name}
            id={props.id}
            class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-4 sm:text-sm border-gray-300 rounded-md"
            placeholder={props.placeholder}
          />
          {/* <div class="absolute inset-y-0 right-0 flex items-center">
            <label for="currency" class="sr-only">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
            >
              <option>USD</option>
              <option>CAD</option>
              <option>EUR</option>
            </select>
          </div> */}
        </div>
      </div>
    );
  },
});
export default DefaultInput;
