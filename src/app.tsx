import { Text, Button, Stack } from '@mantine/core'
import { ThemeProvider } from './ThemeProvider'
import {
  RouterProvider,
  createReactRouter,
  createRouteConfig,
  Link,
  Outlet,
} from '@tanstack/react-router'
import { About, Home } from './pages'
import { Header, TanStackRouterDevtools } from './components'

const rootRoute = createRouteConfig({
  component: () => (
    <>
      {/* Header  */}
      <Header />
      {/* Content */}
      <Outlet />
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

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <TanStackRouterDevtools router={router} />
    </ThemeProvider>
  )
}
