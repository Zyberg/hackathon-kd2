import PluginOptions from './types/PluginOptions'
import { RestApiAppKey } from './types/symbols'
import deepmerge from 'deepmerge'
import defaultConfig from './defaultConfig'
import { App } from 'vue'
import makeApiRequester from './implementations/makeApiRequester'

export const RestApiPlugin = {
  install: (vueApp: App, options: PluginOptions = {}) => {
    options = deepmerge(defaultConfig(), options)
    vueApp.provide(RestApiAppKey, options)

    options.makeRequester = makeApiRequester
  },
}

export default RestApiPlugin
