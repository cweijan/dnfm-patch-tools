import { BrowserWindow, dialog, ipcMain, shell } from 'electron'
import { blockNpk, skipCheck } from './handler/skipCheck';

function send(event: string, data?: any) {
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
        win.webContents.send('event', { event, data });
    }
}

export function initIPCHandler() {
    ipcMain.on('event', (_event, { event, data }) => {
        switch (event) {
            case 'open':
                shell.openExternal(data)
                break;
            case 'chooseFile':
                dialog.showOpenDialog({ properties: ['openFile'] }).then(function (response) {
                    if (response.canceled) return;
                    const filePath = response.filePaths[0]
                    send('file', { ...data, path: filePath });
                });
                break;
            case 'skipCheck':
                const message = skipCheck(data);
                send('notice', message);
                break;
            case 'blockNpk':
                send('notice', blockNpk(data));
                break;
        }
    })
}