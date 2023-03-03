import { Title } from '@mantine/core'
import { SettingsGrid } from '../components'
import { usePageTitle } from '../hooks'

export const SettingsPage = () => {
  usePageTitle('Settings')
  return (
    <>
      <Title>Settings</Title>
      <SettingsGrid />
    </>
  )
}
