import React from 'react'
import ReactDOM from 'react-dom/client'
import {Button, MantineProvider} from '@mantine/core'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Button>Hello Mantine</Button>
    </MantineProvider>
  </React.StrictMode>,
)
