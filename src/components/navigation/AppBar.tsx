import { defineComponent, ref } from '@vue/runtime-core';

const Appbar = defineComponent({
  setup() {
    return () => (
      <nav class="bg-gray-800">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div class="relative flex items-center justify-between h-16">
            <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <h3 class="text-3xl font-bold text-gray-300">Dividend</h3>
            </div>
          </div>
        </div>
      </nav>
    );
  },
});
export default Appbar;
