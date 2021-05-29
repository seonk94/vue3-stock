import { App, inject, reactive } from 'vue';

const MouseSymbol = Symbol();

export const createMouse = () => {
  const state = reactive({
    x: 0,
    y: 0,
    mx: 0,
    my: 0,
    speed: 0.05,
  });

  console.log('call this');
  window.addEventListener('mousemove', (e: MouseEvent) => {
    state.x = e.clientX - window.innerWidth / 2;
    state.y = e.clientY - window.innerHeight / 2;

    state.mx += (state.x - state.mx) * state.speed;
    state.my += (state.y - state.my) * state.speed;
  });

  return {
    state,
  };
};

export function injectMouse() {
  const mouse = inject(MouseSymbol) as ReturnType<typeof createMouse>;

  if (!mouse) throw new Error('Use Mouse Error');

  return mouse;
}

export default {
  install: (app: App) => {
    const mouse = createMouse();
    app.provide(MouseSymbol, mouse);
    app.config.globalProperties.$mouse = mouse;
  },
};
