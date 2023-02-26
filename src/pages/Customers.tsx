import { ActionIcon, createStyles, Drawer, Title } from '@mantine/core'
import { IconUserPlus } from '@tabler/icons'
import { Customer } from '../components'
import { usePageTitle } from '../hooks'
import { useCustomerStore } from '../stores'

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.sm,
  },
}))

export const CustomersPage = () => {
  usePageTitle('Customers')
  const { classes } = useStyles()
  const { selectedId, isDrawerOpen, toggleOpenDrawer } = useCustomerStore()
  const toggleOpenAddEditDrawer = () => toggleOpenDrawer()

  return (
    <>
      <header className={classes.header}>
        <Title>Customers </Title>
        <ActionIcon
          variant="filled"
          color="blue"
          size="lg"
          onClick={toggleOpenAddEditDrawer}
        >
          <IconUserPlus size={20} />
        </ActionIcon>
      </header>
      <Customer.List onAddClick={toggleOpenAddEditDrawer} />
      <Drawer
        opened={isDrawerOpen}
        onClose={toggleOpenAddEditDrawer}
        title={
          <Title order={1} style={{ margin: 0 }}>
            {selectedId ? 'Edit' : 'Add'} Customer
          </Title>
        }
        padding="xl"
        size="xl"
      >
        <Customer.CreateOrUpdate
          id={selectedId}
          onSuccess={toggleOpenAddEditDrawer}
        />
      </Drawer>
    </>
  )
}
