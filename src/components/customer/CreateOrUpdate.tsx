interface Props {
  id?: string
}
export const CreateOrUpdate = ({ id }: Props) => {
  const isCreate = !id

  return <h1>{isCreate ? 'Create' : 'Update'} Customer</h1>
}
