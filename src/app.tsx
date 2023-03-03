import { ReactComponentElement, ReactElement, useEffect } from 'react'
import { Container, Group, Loader } from '@mantine/core'
import {
  RouterProvider,
  Outlet,
  Router,
  RootRoute,
  Route,
} from '@tanstack/react-router'
import { Notifications } from '@mantine/notifications'
import {
  TodoPage,
  HomePage,
  Login,
  ProfilePage,
  CustomersPage,
  SettingsPage,
} from './pages'
import {
  TanStackRouterDevtools,
  AppHeader,
  RegisterHotKeys,
  RegisterSpotlight,
  AppBreadcrumb,
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
      <Container w="100%">
        <AppBreadcrumb />
      </Container>
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
let rootRoute = new RootRoute({ component: MainComponent })

const routes = {
  '/': { component: HomePage },
  '/todo': { component: TodoPage },
  '/profile': { component: ProfilePage },
  '/customers': { component: CustomersPage },
  '/settings': { component: SettingsPage },
  '/settings-measurements': { component: MeasurementConfigsPage },
}
const routeChildren = Object.entries(routes).map(
  ([path, routeInfo]) =>
    new Route({
      getParentRoute: () => rootRoute,
      path,
      component: routeInfo.component,
    })
)

const routeTree = rootRoute.addChildren(routeChildren)
const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface RegisterRouter {
    router: typeof router
  }
}

const queryClient = new QueryClient()

export default function App() {
  return (
    <ThemeProvider>
      <Notifications position="top-right" />

      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      {/* <TanStackRouterDevtools router={router} position="bottom-right" /> */}
    </ThemeProvider>
  )
}
