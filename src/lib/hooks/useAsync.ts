/* eslint-disable @typescript-eslint/no-explicit-any */
import { onMounted, reactive, UnwrapRef } from 'vue';
import { AxiosPromise } from 'axios';

function useAsync<T>(callback: () => AxiosPromise<T>) {
  const state = reactive({
    data: null as null | T,
    error: null as any,
    loading: false,
  });

  const fetchData = async () => {
    state.loading = true;

    try {
      const res = await callback();
      state.data = res.data as UnwrapRef<T>;
      state.error = false;
    } catch (e) {
      state.error = e;
    } finally {
      state.loading = false;
    }
  };

  onMounted(async () => {
    fetchData();
  });

  return { state, fetchData };
}

export default useAsync;
