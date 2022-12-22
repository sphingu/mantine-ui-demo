import { useState } from 'react'
import { Button, Group, MantineColor, Popover, Text } from '@mantine/core'

interface Props {
  buttonText: string
  buttonColor?: MantineColor
  confirmMessage: string
  onConfirm: () => void
}

export const ConfirmButton = ({
  buttonText,
  buttonColor = 'red',
  confirmMessage,
  onConfirm,
}: Props) => {
  const [opened, setOpened] = useState(false)
  const toggleOpen = () => {
    setOpened((open) => !open)
  }
  const handleConfirm = () => {
    onConfirm()
    toggleOpen()
  }
  return (
    <Popover trapFocus withArrow opened={opened} onChange={setOpened}>
      <Popover.Target>
        <Button color={buttonColor} onClick={toggleOpen}>
          {buttonText}
        </Button>
      </Popover.Target>

      <Popover.Dropdown>
        <Text p="md">{confirmMessage}</Text>
        <Group position="center" mt="md">
          <Button variant="default" onClick={toggleOpen}>
            Cancel
          </Button>
          <Button color={buttonColor} onClick={handleConfirm}>
            Confirm
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}
