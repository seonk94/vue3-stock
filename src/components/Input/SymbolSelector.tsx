import { injectSymbol } from '@/lib/provider/SymbolProvider';
import { computed, defineComponent, reactive, ref } from '@vue/runtime-core';

const SymbolSelector = defineComponent({
  emits: ['select'],
  setup(props, context) {
    const { symbolState } = injectSymbol();
    const ulRef = ref<HTMLElement>();
    const state = reactive({
      showList: false,
      search: '',
    });

    const exactMatchSymbol = computed(() => symbolState.symbols.find((symbol) => symbol.symbol === state.search.toUpperCase()));

    const filterList = computed(() => {
      const uppercaseSearch = state.search.toUpperCase();
      if (uppercaseSearch === '') return [];

      const symbolSet = new Set<IexSymbol>();
      if (exactMatchSymbol.value) symbolSet.add(exactMatchSymbol.value);
      symbolState.symbols.forEach((symbol) => {
        const isIncludes = symbol.symbol.includes(uppercaseSearch);
        if (isIncludes) symbolSet.add(symbol);
      });

      return [...symbolSet];
    });

    const openList = () => {
      state.showList = true;
    };
    const closeList = () => {
      state.showList = false;
    };
    const handleBlur = (e: FocusEvent) => {
      const relatedTarget = e.relatedTarget;
      if (relatedTarget && ulRef.value && ulRef.value.contains(relatedTarget as HTMLElement)) {
        return;
      }
      closeList();
    };
    const handleInput = (e: Event) => {
      state.search = (e.target as HTMLInputElement).value;
      openList();
    };
    const handleSelect = (item: IexSymbol) => {
      state.search = item.symbol;
      context.emit('select', item.symbol);
      closeList();
    };
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && exactMatchSymbol.value) {
        handleSelect(exactMatchSymbol.value);
        closeList();
      }
    };

    return () => (
      <div>
        {/* <label id="listbox-label" class="block text-sm font-medium text-gray-700">
          Assigned to
        </label> */}
        <div class="mt-1 relative">
          <div>
            <div
              class="mt-1 relative rounded-md shadow-sm"
              aria-haspopup="listbox"
              aria-expanded={state.showList}
              aria-labelledby="listbox-label"
            >
              <input
                onFocus={openList}
                onBlur={handleBlur}
                onInput={handleInput}
                onKeydown={handleKeydown}
                type="text"
                value={state.search}
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-4 sm:text-sm border-gray-300 rounded-md"
              />
              <span class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  class="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>

          {state.showList && (
            <ul
              ref={ulRef}
              class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              tabindex="-1"
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
            >
              {filterList.value.slice(0, 35).map((item) => (
                <li
                  class="text-gray-900 cursor-pointer hover:bg-indigo-600 hover:text-white relative py-2 pl-3 pr-9"
                  id="listbox-option-0"
                  role="option"
                  onClick={() => handleSelect(item)}
                >
                  <div class="flex items-center">
                    <span class="font-normal ml-3 block truncate">{item.symbol}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  },
});
export default SymbolSelector;
