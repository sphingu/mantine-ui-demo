import { Container } from '@mantine/core'
import { ThemeProvider } from './ThemeProvider'
import {
  RouterProvider,
  createReactRouter,
  createRouteConfig,
  Outlet,
} from '@tanstack/react-router'
import { About, Home } from './pages'
import {
  TanStackRouterDevtools,
  AppHeader,
  RegisterHotKeys,
  RegisterSpotlight,
} from './components'
import { NotificationsProvider } from '@mantine/notifications'

const rootRoute = createRouteConfig({
  component: () => (
    <>
      <AppHeader
        links={[
          { label: 'Home', link: '/' },
          { label: 'About', link: '/about' },
        ]}
      />
      <Container className="one box-style">
        <Outlet />
      </Container>
      <RegisterHotKeys />
      <RegisterSpotlight />
    </>
  ),
})

const indexRoute = rootRoute.createRoute({
  path: '/',
  component: Home,
})

const aboutRoute = rootRoute.createRoute({
  path: '/about',
  component: About,
})

const routeConfig = rootRoute.addChildren([indexRoute, aboutRoute])

const router = createReactRouter({ routeConfig })

declare module '@tanstack/react-router' {
  interface RegisterRouter {
    router: typeof router
  }
}

export default function App() {
  return (
    <ThemeProvider>
      <NotificationsProvider>
        <RouterProvider router={router} />
      </NotificationsProvider>
      <TanStackRouterDevtools router={router} position="bottom-right" />
    </ThemeProvider>
  )
}
