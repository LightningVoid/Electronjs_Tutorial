import { contextBridge, ipcRenderer } from "electron";
// const contextBridge = require("electron/renderer");


contextBridge.exposeInMainWorld("versions", {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping')
});


console.log("Hello from preload!");