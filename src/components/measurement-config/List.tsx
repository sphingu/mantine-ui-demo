import {
  Button,
  Center,
  createStyles,
  Loader,
  ScrollArea,
  Text,
} from '@mantine/core'
import { IconRuler, IconUserExclamation } from '@tabler/icons-react'
import { useMeasurementConfigListQuery } from '../../services'
import { ListItem } from './ListItem'

const useStyles = createStyles((theme) => ({
  noRecordFound: {
    flexDirection: 'column',
  },
}))

interface Props {
  onAddClick: () => void
}

export const MeasurementList = ({ onAddClick }: Props) => {
  const { classes } = useStyles()
  const { data: measurementConfigs = [], isLoading } =
    useMeasurementConfigListQuery()
  if (isLoading && !measurementConfigs.length) {
    return (
      <Center p="lg">
        <Loader />
        <Text ml="sm" color="dimmed">
          Loading measurement configs...
        </Text>
      </Center>
    )
  }
  if (!measurementConfigs.length) {
    return (
      <Center p="lg" className={classes.noRecordFound}>
        <IconUserExclamation color="lightgray" size={50} />
        <Text c="dimmed"> No measurement configs found</Text>
        <Button
          leftIcon={<IconRuler />}
          variant="filled"
          mt="md"
          size="md"
          onClick={onAddClick}
        >
          Add Measurement Config
        </Button>
      </Center>
    )
  }

  return (
    <ScrollArea mt="md">
      {measurementConfigs.map((item) => (
        <ListItem key={item.id} data={item} />
      ))}
    </ScrollArea>
  )
}
