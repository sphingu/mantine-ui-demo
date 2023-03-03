import { v4 as uuid } from 'uuid'
import * as yup from 'yup'
import {
  Button,
  Group,
  JsonInput,
  NativeSelect,
  TextInput,
} from '@mantine/core'
import { FormErrors, useForm, yupResolver } from '@mantine/form'
import { IRequest } from '../../types'

const REQUEST_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

const requestSchema: yup.Schema<Omit<IRequest, 'method'>> = yup.object().shape({
  id: yup.string().required().uuid(),
  name: yup.string().required().min(5),
  method: yup.mixed().oneOf(REQUEST_METHODS).required(),
  url: yup.string().required(),
  body: yup.string(),
})

interface Props {
  initialValues?: IRequest
  onSubmit: (values: IRequest) => void
}

export const RequestAddEditForm = ({ initialValues, onSubmit }: Props) => {
  const isCreate = !initialValues?.id
  const form = useForm<IRequest>({
    initialValues: initialValues || {
      id: uuid(),
      method: 'GET',
      name: '',
      url: '',
    },
    validate: yupResolver(requestSchema),
  })

  const handleError = (errors: FormErrors) => {
    console.error('validation error', errors)
  }
  return (
    <form
      onSubmit={form.onSubmit(onSubmit, handleError)}
      onReset={form.onReset}
    >
      <TextInput
        size="md"
        withAsterisk
        label="Name"
        {...form.getInputProps('name')}
      />
      <NativeSelect
        size="md"
        withAsterisk
        label="Method"
        placeholder="Choose request method"
        data={REQUEST_METHODS}
        {...form.getInputProps('method')}
      />
      <TextInput
        size="md"
        withAsterisk
        label="URL"
        {...form.getInputProps('url')}
      />
      <JsonInput
        size="md"
        label="Body"
        validationError="invalid JSON"
        formatOnBlur
        autosize
        minRows={4}
        {...form.getInputProps('body')}
      />
      <Group position="right" mt="xl">
        <Button size="md" type="submit" disabled={!form.isDirty()}>
          {isCreate ? 'Create Request' : 'Update Request'}
        </Button>
        <Button
          size="md"
          variant="default"
          type="reset"
          disabled={!form.isDirty()}
        >
          Reset
        </Button>
      </Group>
    </form>
  )
}
