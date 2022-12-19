import * as Yup from 'yup'
import { useForm, UseFormReturnType, yupResolver } from '@mantine/form'
import {
  TextInput,
  Button,
  Box,
  Group,
  Checkbox,
  NumberInput,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'

const schema = Yup.object().shape({
  name: Yup.string().min(2, 'Name should have at least 2 letters').required(),
})

interface FormValues {
  name: string
  age: number
  agree: boolean
  fullName?: string
}

function NameInput({ form }: { form: UseFormReturnType<FormValues> }) {
  return (
    <TextInput
      withAsterisk
      label="Name"
      placeholder="Sumit Hingu"
      mt="sm"
      {...form.getInputProps('name')}
    />
  )
}

export function Form() {
  const form = useForm<FormValues>({
    validate: yupResolver(schema),
    initialValues: {
      name: '',
      agree: false,
      age: 18,
    },
    transformValues(values) {
      return { ...values, fullName: `${values.name} ${values.agree}` }
    },
  })

  const handleError = (errors: typeof form.errors) => {
    showNotification({
      message: 'Form is invalid, please refill',
      color: 'red',
    })
  }

  const handleSubmit = (values: typeof form.values) => {
    showNotification({
      message: <pre>{JSON.stringify(values, undefined, 2)}</pre>,
      color: 'green',
    })
  }

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <pre>{JSON.stringify(form.values, undefined, 2)}</pre>
      <form
        onSubmit={form.onSubmit(handleSubmit, handleError)}
        onReset={form.onReset}
      >
        <NameInput form={form} />
        <NumberInput
          withAsterisk
          label="Age"
          mt="sm"
          {...form.getInputProps('age')}
        />

        <Checkbox
          mt="md"
          label="I agree to sell my privacy"
          {...form.getInputProps('agree', { type: 'checkbox' })}
        />

        <Group position="right" mt="xl">
          <Button type="submit">Submit</Button>
          <Button variant="default" type="reset">
            Reset
          </Button>
        </Group>
      </form>
    </Box>
  )
}
