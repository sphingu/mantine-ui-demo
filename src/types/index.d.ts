import { Immutable } from 'immer'

type CRUDStore<T> = Immutable<{
  list: Record<string, T>
  create: (data: T) => void
  update: (data: T) => void
  delete: (id: string) => void
}>

type IRequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
type EntityStatus = 'active' | 'inactive'

interface IRequest {
  id: string
  name: string
  method: IRequestMethod
  url: string
  body?: string
}

type IRequestStore = CRUDStore<IRequest>

interface ITodo {
  id: number
  name: string
  completed: boolean
}

interface IAudit {
  createdAt: string
  updatedAt?: string
  status: EntityStatus
}

interface ICustomer extends IAudit {
  id: number
  name: string
  mobile: string
  address?: string
  notes?: string
}
