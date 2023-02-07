import {
  UnstyledButton,
  createStyles,
  TextInput,
  LoadingOverlay,
} from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { IconCirclePlus } from '@tabler/icons'
import { useCreateTodoMutation } from '../../services'

const useStyles = createStyles((theme) => ({
  input: {
    margin: theme.spacing.xs,
    boxShadow: theme.shadows.xs,
  },
}))

export function TodoInput() {
  const { classes } = useStyles()
  const [value, onChange] = useInputState('')
  const { mutate: createTodo, isLoading: isCreating } = useCreateTodoMutation({
    onSuccess: () => onChange(''),
  })
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    createTodo(value)
  }

  return (
    <form onSubmit={submitHandler} className="p-relative">
      <LoadingOverlay visible={isCreating} />
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
