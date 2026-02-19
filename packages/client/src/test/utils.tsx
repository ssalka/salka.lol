import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
  type ResolveParams,
} from '@tanstack/react-router';
import { act, render } from '@testing-library/react';

import { config } from '@ssalka/common/config';

import { toAppUrl, type AppPathname, type RouterPathnameArgs } from '@/lib/routing';
import { getUserActions } from '@/state/user';

import { routeTree } from '../routeTree.gen';

export async function renderPage<T extends AppPathname>(...args: RouterPathnameArgs<T>) {
  const pageUrl = toAppUrl(...(args as [T, ResolveParams<T>]));
  const history = createMemoryHistory({ initialEntries: [pageUrl] });
  const router = createRouter({
    routeTree,
    history,
    origin: config.client.url,
    defaultPendingMinMs: 0,
  });

  const app = render(<RouterProvider<typeof router> router={router} />);

  await act(() => router.load());

  // Check if any route match ended up with an error (caught by error boundaries)
  // and throw it so the test fails appropriately
  for (const match of router.state.matches) {
    if (match.status === 'error' && match.error) {
      throw match.error as Error;
    }
  }

  return { app, router };
}

export { getUserActions };
