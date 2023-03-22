import { inject } from 'vue'
import { RestApiAppKey } from './types/symbols'

export const getRestApiConfig = () => {
  const config = inject(RestApiAppKey)
  if (!config) {
    throw new Error(`Could not resolve ${RestApiAppKey.toString()}. Have you installed the plugin?`)
  }
  return config
}

export default getRestApiConfig
