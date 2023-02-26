import { useEffect } from 'react'
import { Container, Group, Loader } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import {
  RouterProvider,
  createReactRouter,
  createRouteConfig,
  Outlet,
} from '@tanstack/react-router'
import { TodoPage, HomePage, Login, ProfilePage, CustomersPage } from './pages'
import {
  TanStackRouterDevtools,
  AppHeader,
  RegisterHotKeys,
  RegisterSpotlight,
} from './components'
import { ThemeProvider } from './ThemeProvider'
import { useSessionStore } from './stores'
import { githubOAuthHelpers } from './helpers'
import { QueryClientProvider, QueryClient } from 'react-query'
import { MeasurementConfigsPage } from './pages/MeasurementConfigs'

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
          { label: 'Todo', link: '/todo' },
          { label: 'Profile', link: '/profile' },
          { label: 'Customers', link: '/customers' },
          { label: 'Measurement Configs', link: '/measurement-configs' },
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
  component: HomePage,
})

const todoRoute = rootRoute.createRoute({
  path: '/todo',
  component: TodoPage,
})

const profileRoute = rootRoute.createRoute({
  path: '/profile',
  component: ProfilePage,
})
const customersRoute = rootRoute.createRoute({
  path: '/customers',
  component: CustomersPage,
})
const measurementConfigsRoute = rootRoute.createRoute({
  path: '/measurement-configs',
  component: MeasurementConfigsPage,
})

const routeConfig = rootRoute.addChildren([
  indexRoute,
  todoRoute,
  profileRoute,
  customersRoute,
  measurementConfigsRoute,
])

const router = createReactRouter({ routeConfig })

declare module '@tanstack/react-router' {
  interface RegisterRouter {
    router: typeof router
  }
}

const queryClient = new QueryClient()

export default function App() {
  return (
    <ThemeProvider>
      <NotificationsProvider position="top-right">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </NotificationsProvider>
      <TanStackRouterDevtools router={router} position="bottom-right" />
    </ThemeProvider>
  )
}
