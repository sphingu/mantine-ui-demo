import { ActionIcon, Center, createStyles, Drawer, Title } from '@mantine/core'
import { IconSettings, IconUserPlus } from '@tabler/icons'
import { useState } from 'react'
import { Customer } from '../components'
import { CustomDrawerWithTarget } from '../components/common/CustomDrawer'
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
  usePageTitle('Customers')
  const { classes } = useStyles()
  const [isOpened, setIsOpened] = useState(false)
  const toggleOpened = () => setIsOpened((state) => !state)

  return (
    <section className={classes.section}>
      <header>
        <Title>Customers</Title>
        <ActionIcon
          variant="filled"
          color="blue"
          size="lg"
          onClick={toggleOpened}
        >
          <IconUserPlus size={20} />
        </ActionIcon>
      </header>
      <Customer.List onAddClick={toggleOpened} />

      <Drawer
        opened={isOpened}
        onClose={toggleOpened}
        title={
          <Title order={1} style={{ margin: 0 }}>
            Add Customer
          </Title>
        }
        padding="xl"
        size="xl"
      >
        <Customer.CreateOrUpdate onSuccess={toggleOpened} />
      </Drawer>
    </section>
  )
}
