import { InjectionKey } from 'vue'
import { RestApiConfig } from './PluginOptions'

const RestApiAppKey: InjectionKey<RestApiConfig> = Symbol.for('SanctumDefaultApp')

export {
  RestApiAppKey,
}
