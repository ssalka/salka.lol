import { QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

import { config } from '@ssalka/common/config';
import { Toaster } from '@ssalka/ui/components/toaster';

import { queryClient } from '@/lib/api';
import { useInitTracking } from '@/lib/hooks/tracking';

/** NOTE this module is not included in the production build - it is specifically excluded in `vite.config.ts` */
const TanStackRouterDevtools = lazy(() =>
  config.client.loadDevTools
    ? import('@tanstack/react-router-devtools').then(module => ({
        default: module.TanStackRouterDevtools,
      }))
    : Promise.resolve({ default: () => null }),
);

const Root: React.FC = () => {
  useInitTracking();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </QueryClientProvider>
  );
};

export const Route = createRootRoute({
  component: Root,
});
