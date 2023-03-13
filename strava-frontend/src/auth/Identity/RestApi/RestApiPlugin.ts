import PluginOptions from './types/PluginOptions'
import { RestApiAppKey } from './types/symbols'
import deepmerge from 'deepmerge'
import defaultConfig from './defaultConfig'
import { makeFetchRequester } from './implementations/makeFetchRequester'
import { App } from 'vue'

export const RestApiPlugin = {
  install: (vueApp: App, options: PluginOptions = {}) => {
    options = deepmerge(defaultConfig(), options)
    vueApp.provide(RestApiAppKey, options)
    if (!options.makeRequester) {
      options.makeRequester = makeFetchRequester
    }
  },
}

export default RestApiPlugin
