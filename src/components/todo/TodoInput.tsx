import {
  UnstyledButton,
  createStyles,
  TextInput,
  LoadingOverlay,
} from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { IconCirclePlus } from '@tabler/icons-react'
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
        disabled={isCreating}
        required={true}
        value={value}
        onChange={onChange}
        size="md"
        className={classes.input}
        placeholder="What needs to be done?"
        rightSection={
          <UnstyledButton
            disabled={isCreating}
            type="submit"
            h="26px"
            aria-label="Add todo"
          >
            <IconCirclePlus color="#228be6" size="26" />
          </UnstyledButton>
        }
      />
    </form>
  )
}
