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
import { IMeasurementConfigForm } from '../../types'
import { isEmpty } from 'lodash-es'
import {
  useMeasurementConfigMutate,
  useMeasurementConfigQuery,
} from '../../services'

const yupSchema: yup.Schema<IMeasurementConfigForm> = yup.object().shape({
  name: yup.string().required().min(5),
  fields: yup.string().required(),
})

interface Props {
  id?: number
  onSuccess: () => void
  onCancel: () => void
}

export const CreateOrUpdate = ({ id, onSuccess, onCancel }: Props) => {
  const isCreate = !id
  const form = useForm<IMeasurementConfigForm>({
    initialValues: {
      name: '',
      fields: '',
    },
    validate: yupResolver(yupSchema),
    validateInputOnBlur: true,
  })
  const { data, isLoading } = useMeasurementConfigQuery(id)
  const { mutate: createOrUpdateMeasurementConfig, isLoading: isMutating } =
    useMeasurementConfigMutate({
      isCreate,
      onSuccess,
    })

  useEffect(() => {
    form.setValues({
      name: data?.name ?? '',
      fields: data?.fields ?? '',
    })
  }, [data])

  const handleSubmit = (values: IMeasurementConfigForm) => {
    createOrUpdateMeasurementConfig({ id, measurementConfig: values })
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
    return <Text>Error : no measurement config information found </Text>
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
        <Button size="md" variant="default" type="button" onClick={onCancel}>
          Cancel
        </Button>
      </Group>
    </form>
  )
}
