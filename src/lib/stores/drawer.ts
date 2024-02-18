import { drawerComponents, type DrawerComponent } from '$lib/components/drawers';
import { writable } from 'svelte/store';

const currentDrawerComponentStore = () => {
  const { subscribe, set } = writable<DrawerComponent | null>(null);

  return {
    subscribe,
    open: (name: string | null) => set(name ? drawerComponents[name] : null),
  };
};

export const currentDrawerComponent = currentDrawerComponentStore();
