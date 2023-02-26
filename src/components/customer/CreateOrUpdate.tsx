import * as yup from 'yup'
import { useEffect } from 'react'
import {
  TextInput,
  Group,
  Button,
  Textarea,
  Text,
  Loader,
  Center,
  LoadingOverlay,
} from '@mantine/core'
import { FormErrors, useForm, yupResolver } from '@mantine/form'
import { ICustomerForm } from '../../types'
import { isEmpty } from 'lodash-es'
import { useCustomerMutate, useCustomerQuery } from '../../services/customer'

const yupSchema: yup.SchemaOf<ICustomerForm> = yup.object().shape({
  name: yup.string().required().min(5),
  mobile: yup.string().max(10),
  address: yup.string(),
  notes: yup.string(),
})

interface Props {
  id?: number
  onSuccess: () => void
}

export const CreateOrUpdate = ({ id, onSuccess }: Props) => {
  const isCreate = !id
  const form = useForm<ICustomerForm>({
    initialValues: {
      name: '',
      address: '',
      mobile: '',
      notes: '',
    },
    validate: yupResolver(yupSchema),
    validateInputOnBlur: true,
  })
  const { data, isLoading } = useCustomerQuery(id)
  const { mutate: createOrUpdateCustomer, isLoading: isMutating } =
    useCustomerMutate({
      isCreate,
      onSuccess,
    })

  useEffect(() => {
    form.setValues({
      name: data?.name ?? '',
      address: data?.address ?? '',
      mobile: data?.mobile ?? '',
      notes: data?.notes ?? '',
    })
  }, [data])

  const handleSubmit = (values: ICustomerForm) => {
    createOrUpdateCustomer({ id, customer: values })
  }

  const handleError = (errors: FormErrors) => {
    console.error('validation error', errors)
  }
  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    )
  }

  if (!isCreate && isEmpty(data)) {
    return <Text>Error : no customer information found </Text>
  }

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit, handleError)}
      onReset={form.onReset}
    >
      <LoadingOverlay visible={isMutating} overlayBlur={1} />
      <TextInput
        size="md"
        withAsterisk
        label="Name"
        {...form.getInputProps('name')}
      />
      <TextInput size="md" label="Mobile" {...form.getInputProps('mobile')} />
      <Textarea size="md" label="Address" {...form.getInputProps('address')} />
      <Textarea size="md" label="Notes" {...form.getInputProps('notes')} />
      <Group position="right" mt="xl">
        <Button size="md" type="submit" disabled={!form.isDirty()}>
          {isCreate ? 'Create' : 'Update'}
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
