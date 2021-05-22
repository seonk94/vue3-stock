import { App, ref } from 'vue';

export const createTheme = () => {
  const theme = ref<'light' | 'dark'>('light');

  (function checkLocalStorage() {
    const storageTheme = localStorage.getItem('theme');
    if (storageTheme && (storageTheme === 'dark' || storageTheme === 'light')) theme.value = storageTheme;
  })();

  const action = {
    toggleTheme: () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', theme.value);
    },
  };
  return {
    theme,
    themeAction: action,
  };
};

export function injectTheme() {
  const theme = createTheme();

  if (!theme) throw new Error('Use Theme Error');

  return theme;
}

export default {
  install: (app: App) => {
    const theme = injectTheme();
    app.config.globalProperties.$theme = theme;
  },
};
