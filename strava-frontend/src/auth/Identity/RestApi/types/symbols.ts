import { InjectionKey } from 'vue'
import { RestApiConfig } from './PluginOptions'

const RestApiAppKey: InjectionKey<RestApiConfig> = Symbol.for('RestApiDefaultApp')

export {
  RestApiAppKey,
}
