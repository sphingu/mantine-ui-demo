import { sleep } from '../../helpers'
import { IMeasurementConfig, IMeasurementConfigForm } from '../../types'

let measurementConfigs: IMeasurementConfig[] = []

let count = 1

export const measurementAPI = {
  list: async (): Promise<IMeasurementConfig[]> => {
    await sleep()
    return measurementConfigs
  },
  single: async (id?: number): Promise<IMeasurementConfig | undefined> => {
    await sleep()
    return measurementConfigs.find((measurement) => measurement.id === id)
  },
  createOrUpdate: async ({
    id,
    measurementConfig,
  }: {
    measurementConfig: IMeasurementConfigForm
    id?: number
  }): Promise<void> => {
    await sleep()
    if (id) {
      measurementConfigs = measurementConfigs.map((item) =>
        id === item.id
          ? { ...item, ...measurementConfig, updatedAt: new Date().toJSON() }
          : item
      )
    } else {
      measurementConfigs.push({
        id: count++,
        ...measurementConfig,
        createdAt: new Date().toJSON(),
        status: 'active',
      })
    }
  },
  remove: async (id: number): Promise<void> => {
    await sleep()
    measurementConfigs = measurementConfigs.filter((item) => item.id !== id)
  },
}
