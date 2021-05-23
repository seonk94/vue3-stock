import { defineComponent } from '@vue/runtime-core';

const TableHeader = defineComponent({
  props: {
    headers: {
      type: Array as () => Array<string>,
      default: () => [],
    },
  },
  setup(props) {
    const TH = (header: string) => (
      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {header}
      </th>
    );
    return () => (
      <thead class="bg-gray-100 dark:bg-gray-700">
        <tr>{props.headers.map((header) => TH(header))}</tr>
      </thead>
    );
  },
});
export default TableHeader;
