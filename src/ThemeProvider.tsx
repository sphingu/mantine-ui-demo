import { MantineProvider, MantineThemeOverride } from '@mantine/core'

export const theme: MantineThemeOverride = {
  colorScheme: 'light',
  fontFamily: "'Montserrat', serif",
  // primaryColor: 'lime',
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
      theme={theme}
    >
      {children}
    </MantineProvider>
  )
}
