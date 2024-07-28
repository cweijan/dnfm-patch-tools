import { BrowserWindow, dialog, ipcMain, shell } from 'electron'
import { blockNpk, skipCheck } from './handler/skipCheck';
import Store from 'electron-store';
const store = new Store<Record<string, string>>();

function send(event: string, data?: any) {
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
        win.webContents.send('event', { event, data });
    }
}

export function initIPCHandler() {
    ipcMain.on('event', async (_event, { event, data }) => {
        switch (event) {
            case 'open':
                shell.openExternal(data)
                break;
            case 'chooseFile':
                const type = data.type;
                const key = `lastPath-${type}`
                const defaultPath = store.get(key);
                dialog.showOpenDialog({ defaultPath, properties: ['openFile'] }).then(function (response) {
                    if (response.canceled) return;
                    const filePath = response.filePaths[0]
                    store.set(key, filePath);
                    send('file', { ...data, path: filePath });
                });
                break;
            case 'skipCheck':
                const message = await skipCheck(data);
                send('notice', message);
                break;
            case 'blockNpk':
                send('notice', blockNpk(data));
                break;
        }
    })
}