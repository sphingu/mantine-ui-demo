import { Text, Button, Stack, Container } from '@mantine/core'
import { ThemeProvider } from './ThemeProvider'
import {
  RouterProvider,
  createReactRouter,
  createRouteConfig,
  Link,
  Outlet,
} from '@tanstack/react-router'
import { About, Home } from './pages'
import { TanStackRouterDevtools, AppHeader } from './components'

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
      <RouterProvider router={router} />
      <TanStackRouterDevtools router={router} position="bottom-right" />
    </ThemeProvider>
  )
}
