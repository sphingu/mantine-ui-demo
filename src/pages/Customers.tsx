import { ActionIcon, createStyles, Drawer, Title } from '@mantine/core'
import { IconUserPlus } from '@tabler/icons'
import { useEffect, useState } from 'react'
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
  const { selectedId, setSelectedId } = useCustomerStore()
  const [isOpened, setIsOpened] = useState(false)
  const toggleOpened = () => {
    if (isOpened && selectedId) {
      setSelectedId(undefined)
    }
    setIsOpened((state) => !state)
  }

  useEffect(() => {
    if (selectedId) {
      toggleOpened()
    }
  }, [selectedId])

  return (
    <>
      <header className={classes.header}>
        <Title>Customers </Title>
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
            {selectedId ? 'Edit' : 'Add'} Customer
          </Title>
        }
        padding="xl"
        size="xl"
      >
        <Customer.CreateOrUpdate id={selectedId} onSuccess={toggleOpened} />
      </Drawer>
    </>
  )
}
