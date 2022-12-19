import * as Yup from 'yup'
import { useForm, yupResolver } from '@mantine/form'
import { TextInput, Button, Box, Group } from '@mantine/core'

const schema = Yup.object().shape({
  name: Yup.string().min(2, 'Name should have at least 2 letters'),
})

export function Form() {
  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      name: '',
    },
  })

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="John Doe"
          mt="sm"
          {...form.getInputProps('name')}
        />

        <Group position="right" mt="xl">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  )
}
