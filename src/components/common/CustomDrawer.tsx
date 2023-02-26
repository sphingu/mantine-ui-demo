import {
  Button,
  Drawer,
  Title,
  ButtonProps,
  ActionIcon,
  ActionIconProps,
} from '@mantine/core'
import { IconUserPlus } from '@tabler/icons'
import { useState } from 'react'

interface Props {
  title: string
  actionButtonChildren: React.ReactNode
  children: React.ReactElement
  buttonProps?: ButtonProps
  iconButtonProps?: ActionIconProps
}

export const CustomDrawerWithTarget = ({
  title,
  buttonProps,
  iconButtonProps,
  actionButtonChildren,
  children,
}: Props) => {
  const [isOpened, setIsOpened] = useState(false)

  const toggleOpened = () => setIsOpened((state) => !state)

  return (
    <>
      {iconButtonProps ? (
        <ActionIcon {...iconButtonProps} onClick={toggleOpened}>
          {actionButtonChildren}
        </ActionIcon>
      ) : (
        <Button {...buttonProps} onClick={toggleOpened}>
          {actionButtonChildren}
        </Button>
      )}
      <Drawer
        opened={isOpened}
        onClose={toggleOpened}
        title={
          <Title order={1} style={{ margin: 0 }}>
            {title}
          </Title>
        }
        padding="xl"
        size="xl"
      >
        {children}
      </Drawer>
    </>
  )
}
