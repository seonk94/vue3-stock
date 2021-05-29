import { injectTheme } from '@/plugins/theme';
import { defineComponent } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import SwitchButton from '../button/SwitchButton';

const Appbar = defineComponent({
  setup() {
    const router = useRouter();
    const { themeState, themeAction } = injectTheme();

    const pushHome = () => {
      router.push('manage');
    };
    return () => (
      <nav class="bg-gray-800 sticky top-0">
        <div class="flex items-center  px-2 sm:px-6 lg:px-8">
          {/* <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8"> */}
          <div class="relative flex items-center justify-between h-16">
            <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start" onClick={pushHome}>
              <h3 class="text-3xl font-bold text-gray-300">Dividend</h3>
            </div>
          </div>
          <div class="flex-grow" />

          <SwitchButton
            checked={themeState.theme === 'dark'}
            leftEmoji="☀️"
            rightEmoji="🌙"
            onUpdateValue={() => themeAction.toggleTheme()}
          />
        </div>
      </nav>
    );
  },
});
export default Appbar;
