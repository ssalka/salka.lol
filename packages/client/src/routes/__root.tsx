import { createRootRoute, Outlet } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

import { config } from '@ssalka/common/config';
import { Toaster } from '@ssalka/ui/components/toaster';

/** NOTE this module is not included in the production build - it is specifically excluded in `vite.config.ts` */
const TanStackRouterDevtools = lazy(() =>
  config.client.loadDevTools
    ? import('@tanstack/react-router-devtools').then(module => ({
        default: module.TanStackRouterDevtools,
      }))
    : Promise.resolve({ default: () => null }),
);

const Root: React.FC = () => {
  return (
    <>
      <Outlet />
      <Toaster />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  );
};

export const Route = createRootRoute({
  component: Root,
});
