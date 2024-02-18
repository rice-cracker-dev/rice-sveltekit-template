import type { DrawerSettings } from '@skeletonlabs/skeleton';
import NavbarDrawer from './NavbarDrawer.svelte';
import NavbarSearch from './NavbarSearch.svelte';

export type DrawerComponent = {
  options: DrawerSettings;
  component: ConstructorOfATypedSvelteComponent;
};

export const drawerComponents: { [s: string]: DrawerComponent } = {
  navbar: {
    options: { regionDrawer: 'w-full sm:max-w-[50%]', position: 'right' },
    component: NavbarDrawer,
  },

  navbarSearch: {
    options: {
      regionDrawer: 'w-full h-auto p-4 lg:py-32 lg:pointer-events-none',
      bgDrawer: 'bg-surface-100-800-token lg:!bg-transparent',
      bgBackdrop: 'backdrop-blur-xl',
      shadow: 'shadow-none',
      position: 'top',
    },
    component: NavbarSearch,
  },
};
