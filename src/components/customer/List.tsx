import {
  Button,
  Center,
  createStyles,
  Loader,
  ScrollArea,
  Text,
} from '@mantine/core'
import { IconUserExclamation, IconUserPlus } from '@tabler/icons-react'
import { useCustomerListQuery } from '../../services'
import { ListItem } from './ListItem'

const useStyles = createStyles((theme) => ({
  noRecordFound: {
    flexDirection: 'column',
  },
}))

interface Props {
  onAddClick: () => void
}

export const CustomerList = ({ onAddClick }: Props) => {
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
          size="md"
          onClick={onAddClick}
        >
          Add Customer
        </Button>
      </Center>
    )
  }

  return (
    <ScrollArea mt="md">
      {customers.map((item) => (
        <ListItem key={item.id} customer={item} />
      ))}
    </ScrollArea>
  )
}
