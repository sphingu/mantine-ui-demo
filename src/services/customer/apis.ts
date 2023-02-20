import { ICustomer } from '../../types'

let customers: ICustomer[] = []
const sleep = (seconds = 10) =>
  new Promise((res) => {
    setTimeout(() => {
      res(undefined)
    }, seconds * 1000)
  })

export const customerAPI = {
  list: async (): Promise<ICustomer[]> => {
    await sleep()
    return customers
  },
  add: async (customer: ICustomer): Promise<void> => {
    await sleep()
    customers.push(customer)
  },
  update: async (customer: ICustomer): Promise<void> => {
    await sleep()
    customers = customers.map((item) =>
      customer.id === item.id ? customer : item
    )
  },
  remove: async (customerId: number): Promise<void> => {
    await sleep()
    customers = customers.filter((item) => item.id !== customerId)
  },
}
