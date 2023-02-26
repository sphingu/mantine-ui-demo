import { sleep } from '../../helpers'
import { ICustomer, ICustomerForm } from '../../types'

let customers: ICustomer[] = []
let count = 1

export const customerAPI = {
  list: async (): Promise<ICustomer[]> => {
    await sleep()
    return customers
  },
  single: async (id?: number): Promise<ICustomer | undefined> => {
    await sleep()
    return customers.find((customer) => customer.id === id)
  },
  createOrUpdate: async ({
    id,
    customer,
  }: {
    customer: ICustomerForm
    id?: number
  }): Promise<void> => {
    await sleep()
    if (id) {
      customers = customers.map((item) =>
        id === item.id
          ? { ...item, ...customer, updatedAt: new Date().toJSON() }
          : item
      )
    } else {
      customers.push({
        id: count++,
        ...customer,
        createdAt: new Date().toJSON(),
        status: 'active',
      })
    }
  },
  remove: async (customerId: number): Promise<void> => {
    await sleep()
    customers = customers.filter((item) => item.id !== customerId)
  },
}
