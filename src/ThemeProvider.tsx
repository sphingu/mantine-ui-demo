import { MantineProvider, MantineThemeOverride } from '@mantine/core'

export const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  fontFamily: "'Montserrat', serif",
  // primaryColor: 'lime',
  focusRingStyles: {
    inputStyles: () => ({
      borderWidth: '2px',
    }),
  },
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
