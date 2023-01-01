import { UnstyledButton, createStyles, TextInput } from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { IconCirclePlus } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  input: {
    margin: theme.spacing.xs,
    boxShadow: theme.shadows.xs,
  },
}))

interface Props {
  value: string
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
}

export function TodoInput({ value, onChange, onSubmit }: Props) {
  const { classes } = useStyles()
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <TextInput
        value={value}
        onChange={onChange}
        size="md"
        className={classes.input}
        placeholder="New Todo..."
        rightSection={
          <UnstyledButton type="submit" h="26px">
            <IconCirclePlus color="#228be6" size="26" />
          </UnstyledButton>
        }
      />
    </form>
  )
}
