import { Table, Group, ActionIcon, ScrollArea } from '@mantine/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { IRequest } from '../../types'

interface Props {
  requests: IRequest[]
  onEdit: (request: IRequest) => void
  onDelete: (requestId: string) => void
}

export function RequestList({ requests, onEdit, onDelete }: Props) {
  const rows = requests.map((item) => (
    <tr key={item.name}>
      <td>{item.name}</td>
      <td>{item.method}</td>
      <td>{item.url}</td>
      <td>{item.body}</td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon onClick={() => onEdit(item)}>
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon color="red" onClick={() => onDelete(item.id)}>
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ))

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Method</th>
            <th>Url</th>
            <th>Body</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
}
