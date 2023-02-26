import {
  ActionIcon,
  Button,
  Center,
  createStyles,
  Loader,
  Text,
} from '@mantine/core'
import { IconUserExclamation, IconUserPlus } from '@tabler/icons'
import { useCustomerListQuery } from '../../services/customer'
import { CustomDrawerWithTarget } from '../common/CustomDrawer'
import { CreateOrUpdate } from './CreateOrUpdate'
import { Details } from './Details'

const useStyles = createStyles((theme) => ({
  noRecordFound: {
    flexDirection: 'column',
  },
}))

interface Props {
  onAddClick: () => void
}

export const List = ({ onAddClick }: Props) => {
  const { classes } = useStyles()
  const { data: customers = [], isLoading } = useCustomerListQuery()
  if (isLoading && !customers.length) {
    return (
      <Center p="lg">
        <Loader />
        <Text ml="sm" color="dimmed">
          Loading customers...
        </Text>
      </Center>
    )
  }
  if (!customers.length) {
    return (
      <Center p="lg" className={classes.noRecordFound}>
        <IconUserExclamation color="lightgray" size={50} />
        <Text c="dimmed"> No customers found</Text>
        <Button
          leftIcon={<IconUserPlus />}
          variant="filled"
          mt="md"
          onClick={onAddClick}
        >
          Add Customer
        </Button>
      </Center>
    )
  }
  return (
    <section>
      <header>Customer List</header>
    </section>
  )
}
