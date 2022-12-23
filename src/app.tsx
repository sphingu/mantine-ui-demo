import { useEffect } from 'react'
import { Container, Group, Loader } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import {
  RouterProvider,
  createReactRouter,
  createRouteConfig,
  Outlet,
} from '@tanstack/react-router'
import { About, Home, Login } from './pages'
import {
  TanStackRouterDevtools,
  AppHeader,
  RegisterHotKeys,
  RegisterSpotlight,
} from './components'
import { ThemeProvider } from './ThemeProvider'
import { useSessionStore } from './stores'
import { githubOAuthHelpers } from './helpers'

const MainComponent = () => {
  const sessionStore = useSessionStore()

  useEffect(() => {
    sessionStore.fetchUserInfo()

    const {
      data: { subscription: authListener },
    } = githubOAuthHelpers.onAuthStatusChange(sessionStore.setUserInfo)
    return () => authListener?.unsubscribe()
  }, [])

  return (
    <>
      <AppHeader
        isAuthenticated={sessionStore.isAuthenticated()}
        links={[
          { label: 'Home', link: '/' },
          { label: 'About', link: '/about' },
        ]}
        onLogout={sessionStore.logOut}
      />
      <Container className="one box-style">
        {sessionStore.loading ? (
          <Group position="center">
            <Loader />
          </Group>
        ) : sessionStore.isAuthenticated() ? (
          <Outlet />
        ) : (
          <Login onLoginClick={sessionStore.login} />
        )}
      </Container>
      <RegisterHotKeys />
      <RegisterSpotlight />
    </>
  )
}

const rootRoute = createRouteConfig({
  component: MainComponent,
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
