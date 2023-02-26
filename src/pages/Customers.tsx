import { ActionIcon, Center, createStyles, Title } from '@mantine/core'
import { IconSettings, IconUserPlus } from '@tabler/icons'
import { Customer } from '../components'
import { usePageTitle } from '../hooks'

const useStyles = createStyles((theme) => ({
  section: {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
}))

export const CustomersPage = () => {
  const { classes } = useStyles()
  usePageTitle('Customers')
  return (
    <section className={classes.section}>
      <header>
        <Title>Customers</Title>
        <ActionIcon variant="filled" color="blue" size="lg">
          <IconUserPlus size={20} />
        </ActionIcon>
      </header>
      <Customer.List />
    </section>
  )
}
