import { app, BrowserWindow, ipcMain } from "electron/main";
import * as path from "node:path";
// const { app, BrowserWindow } = require("electron/main");
// const path = require("path");


const createWindow = () =>
{
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            // sandbox: false,
            preload: path.join(import.meta.dirname, "preload.mjs")
            // preload: path.join(__dirname, "preload.mjs")
        }
    });

    win.loadFile("index.html");

    // win.webContents.openDevTools();


};

app.whenReady().then(() =>
{
    ipcMain.handle("ping", () => "pong");
    createWindow();

    // reference 0001
    if (BrowserWindow.getAllWindows().length === 0)
    {
        createWindow();
    }
});

//!!!!!!!!!!!!!!!!!!!!!!!!!
//MARK: WINDOW CONVENTIONS
//!!!!!!!!!!!!!!!!!!!!!!!!!

/**
 * Windows & Linux:
 * -->all window closed === application closed.
*/
app.on("window-all-closed", () =>
{
    if (process.platform !== "darwin")
    {
        app.quit();
    }
});

/**
 * MacOS:
 * app doesn't close when windows are closed;
 * --> when app is acviated, new windows are created.
 * !!! reference 0001
*/
