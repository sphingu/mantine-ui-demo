import { Button, Drawer, Title } from '@mantine/core'
import { useState } from 'react'

interface Props {
  title: string
  buttonText: string
  children: React.ReactElement
}

export const CustomDrawerWithTarget = ({
  title,
  buttonText,
  children,
}: Props) => {
  const [isOpened, setIsOpened] = useState(false)

  const toggleOpened = () => setIsOpened((state) => !state)

  return (
    <>
      <Button size="md" onClick={toggleOpened}>
        {buttonText}
      </Button>
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
