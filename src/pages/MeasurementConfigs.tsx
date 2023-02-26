import { ActionIcon, createStyles, Drawer, Title } from '@mantine/core'
import { IconRuler, IconUserPlus } from '@tabler/icons'
import { MeasurementConfig } from '../components'
import { usePageTitle } from '../hooks'
import { useMeasurementConfigStore } from '../stores'

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.sm,
  },
}))

export const MeasurementConfigsPage = () => {
  usePageTitle('Measurement Configs')
  const { classes } = useStyles()
  const { selectedId, isDrawerOpen, toggleOpenDrawer } =
    useMeasurementConfigStore()
  const toggleOpenAddEditDrawer = () => toggleOpenDrawer()

  return (
    <>
      <header className={classes.header}>
        <Title>Measurement Configs</Title>
        <ActionIcon
          variant="filled"
          color="blue"
          size="xl"
          onClick={toggleOpenAddEditDrawer}
        >
          <IconRuler size={24} />
        </ActionIcon>
      </header>
      <MeasurementConfig.List onAddClick={toggleOpenAddEditDrawer} />
      <Drawer
        opened={isDrawerOpen}
        onClose={toggleOpenAddEditDrawer}
        title={
          <Title order={1} style={{ margin: 0 }}>
            {selectedId ? 'Edit' : 'Add'} MeasurementConfig
          </Title>
        }
        padding="xl"
        size="xl"
      >
        <MeasurementConfig.CreateOrUpdate
          id={selectedId}
          onSuccess={toggleOpenAddEditDrawer}
          onCancel={toggleOpenAddEditDrawer}
        />
      </Drawer>
    </>
  )
}
