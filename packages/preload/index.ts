import { contextBridge } from 'electron'
import { domReady } from './utils'
import { useLoading } from './loading'
import { api } from '../main/bridge';

const { appendLoading, removeLoading } = useLoading()

;(async () => {
  await domReady()

  appendLoading()
})()

contextBridge.exposeInMainWorld('removeLoading', removeLoading)
contextBridge.exposeInMainWorld('Main', api)
