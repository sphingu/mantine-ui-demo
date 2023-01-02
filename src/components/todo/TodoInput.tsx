import {
  UnstyledButton,
  createStyles,
  TextInput,
  LoadingOverlay,
} from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { IconCirclePlus } from '@tabler/icons'
import { useMutation, useQueryClient } from 'react-query'
import { notifyHelper } from '../../helpers'
import { todoApi } from '../../services'
import { useSessionStore } from '../../stores'

const useStyles = createStyles((theme) => ({
  input: {
    margin: theme.spacing.xs,
    boxShadow: theme.shadows.xs,
  },
}))

export function TodoInput() {
  const { classes } = useStyles()
  const { userInfo } = useSessionStore()
  const queryClient = useQueryClient()
  const [value, onChange] = useInputState('')
  const { mutate: addTodo, isLoading: isAdding } = useMutation(
    async () => todoApi.add(value, userInfo?.id as string),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('todos')
        onChange('')
      },
      onError: () => notifyHelper.error('An error occurred while adding todo'),
    }
  )
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        addTodo()
      }}
      className="p-relative"
    >
      <LoadingOverlay visible={isAdding} />
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
