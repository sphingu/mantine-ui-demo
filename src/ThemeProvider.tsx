import { MantineProvider, MantineThemeOverride } from '@mantine/core'

export const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  fontFamily: "'Montserrat', serif",
  // primaryColor: 'lime',
  focusRingStyles: {
    inputStyles: () => ({
      borderWidth: '2px',
      outline: `2px solid #228be6`,
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
